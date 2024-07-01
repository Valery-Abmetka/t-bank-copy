#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Функция для получения измененных директорий внутри указанной папки
get_changed_dirs() {
  local folder="$1"
  git diff --cached --name-only | awk -F'/' -v folder="$folder" '$1 == folder {print $2}' | sort -u
}

# Получаем список всех измененных директорий внутри services/ и packages/
services_changed_dirs=$(get_changed_dirs "services")
packages_changed_dirs=$(get_changed_dirs "packages")

# Для отладки: выводим список измененных директорий
echo "Changed directories in services: $services_changed_dirs"
echo "Changed directories in packages: $packages_changed_dirs"

# Функция для выполнения проверок в измененных директориях
run_checks() {
  local folder="$1"
  local changed_dirs="$2"
  for dir in $changed_dirs; do
    service_path="$folder/$dir"
    if [ -f "$service_path/package.json" ]; then  # Проверяем наличие package.json
      echo "Running checks for $dir in $folder..."
      cd "$service_path" || exit 1
      npm run format --if-present
      npm run typecheck --if-present
      npm run lint --if-present
      npm run test --if-present
      cd - || exit 1  # Возвращаемся в корневую директорию
    else
      echo "Skipping $dir in $folder; no package.json found"
    fi
  done
}

# Проходим по каждой измененной директории в services
run_checks "services" "$services_changed_dirs"

# Проходим по каждой измененной директории в packages
run_checks "packages" "$packages_changed_dirs"
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

# Получаем список всех измененных директорий внутри services/
changed_dirs=$(git diff --cached --name-only | awk -F'/' '/^services\// {print $2}' | sort -u)

# Для отладки: выводим список измененных директорий
echo "Changed directories: $changed_dirs"

# Проходим по каждой измененной директории
for dir in $changed_dirs; do
  service_path="services/$dir"
  if [ -f "$service_path/package.json" ]; then  # Проверяем наличие package.json
    echo "Running checks for $dir..."
    cd "$service_path" || exit 1
    npm run format || exit 1
    npm run typecheck || exit 1
    npm run lint || exit 1
    npm run test || exit 1
    cd - || exit 1  # Возвращаемся в корневую директорию
  else
    echo "Skipping $dir; no package.json found"
  fi
done
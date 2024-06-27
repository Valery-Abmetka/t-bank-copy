#!/bin/sh

# Проверяем, есть ли изменения в директории packages/service-1
if git diff --cached --name-only | grep -q '^packages/service-1/'; then
  cd packages/service-1
  npm run lint
fi
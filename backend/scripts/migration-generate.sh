#!/usr/bin/env bash
set -e

NAME=$1

if [ -z "$NAME" ]; then
  echo "❌ Debes pasar el nombre de la migración"
  exit 1
fi

yarn typeorm migration:generate migrations/$NAME -d typeorm.config.ts
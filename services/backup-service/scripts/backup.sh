#!/bin/sh

set -e

DATE=$(date +"%Y-%m-%d_%H-%M-%S")
FILENAME=backup_postgres_$DATE.sql
TMP_PATH=/tmp/$FILENAME

echo "📦 Generando backup PostgreSQL..."

PGPASSWORD=$DB_PASSWORD pg_dump \
  -h $DB_HOST \
  -U $DB_USER \
  -p $DB_PORT \
  $DB_NAME > $TMP_PATH

echo "📤 Enviando backup a on-premise..."

scp -o "StrictHostKeyChecking=no" \
    -o "ProxyCommand=cloudflared access ssh --hostname server.distribuidauce.org" \
    $TMP_PATH \
    distribuida@server.distribuidauce.org:/home/distribuida/Documents/distribuida1/Segundo_Tipanquiza/QA/

echo "✅ Backup enviado correctamente"

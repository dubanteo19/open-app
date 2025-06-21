#!/bin/bash
BUILD_DIR="dist"
USERNAME="dbt19"
HOST="open19.ddns.net"
DEPLOY_PATH="/var/www/dbt19.store/html"
TEMP_PATH="/home/dbt19/temp"
echo "copy files to $TEMP_PATH"
scp -r $BUILD_DIR/ "$USERNAME@$HOST:$TEMP_PATH"


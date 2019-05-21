#!/bin/bash

# RUN AS ROOT
# Registers a reverse proxy with nginx

DECLARE_DIR="$(dirname $0)/.."

# Copy site config to global
echo 'Copying $DECLARE_DIR/server/nginx/declare to /etc/nginx/sites-available/declare_server'
cp "$DECLARE_DIR/server/nginx/declare" /etc/nginx/sites-available/declare_server

# Restart nginx
echo 'Restarting nginx'
systemctl restart nginx

echo "Done!"

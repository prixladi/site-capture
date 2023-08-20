#!/bin/sh

env
cp -v /app/configs/config.js /app/public/config.js

sed -i "s~{{GRAPHQL_URL}}~$GRAPHQL_URL~" /app/public/config.js
sed -i "s~{{GRAPHQL_WS_URL}}~$GRAPHQL_WS_URL~" /app/public/config.js
sed -i "s~{{AUTH_API_URL}}~$AUTH_API_URL~" /app/public/config.js
sed -i "s~{{AUTH_API_CLIENT_ID}}~$AUTH_API_CLIENT_ID~" /app/public/config.js
sed -i "s~{{GOOGLE_CLIENT_ID}}~$GOOGLE_CLIENT_ID~" /app/public/config.js

cat /app/public/config.js

echo "Starting app"
exec "$@"
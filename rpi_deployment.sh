# TODO: work in progress
ip4=$(/sbin/ip -o -4 addr list eth0 | awk '{print $4}' | cut -d/ -f1)
echo "export const backendURL = 'http://$ip:3001'" > ../app/env.js

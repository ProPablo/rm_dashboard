#Using git for just CD (continuous dilivery)
git pull
cd server
npm i
pm2 restart rm_server
cd ..
cd client
npm i
npm run build
rm -rf /var/www/html/rm.kongroo.xyz/
cp -Rf build /var/www/html/rm.kongroo.xyz
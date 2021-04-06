#Using git for just CD (continuous dilivery)
git pull
cd server
npm i
npm run pm2
cd ..
cd client
npm i
npm run build
rm -rf /var/www/rm.kongroo.xyz/
cp -Rf build /var/www/rm.kongroo.xyz
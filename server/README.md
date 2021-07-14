# Backend Server (Codebase 1)
Uses TypeORM and JOI for entity management based database creation. 

## Instructions
* Start up docker db
* `npm i`
* `npm i -g nodemon`
* `npm run dev`

## Docker Instructions
1. Make folder containing .yml and .env
2. Delete Docker instance if exists (w/ sudo in Linux or just deleting it through Windows) `sudo rm -rf docker-data`
4. cd to the aforementioned folder 
5. Ensure that no instances of msql are taking up port 3306 
6. run command docker-compose up -d

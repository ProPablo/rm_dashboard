An administration management portal for the Redland Museum Display Information and Guidance System created with the React Admin framework. This project is created as a part of the IFB399 CAPSTONE PHASE 2 subject at Queensland University of Technology (QUT). 
Run server and client together for development and assign appropriate dotENV. Deployment occurs live by compiling every push to master using GitHub actions. RM_dashboard communicates between Codebase2_GT, the complementary react native application. 

# Notes
* Important note when deploying, the ssh key must have a trailing newline in it 
* Ensure that `chmod +X -R public/` is run on the public folder so that nginx can serve the files without any issues
* Also add the overall folder into /var/www/ to oblige with linux philosophy
* To generate an APK for Android phones run, react-native run-android --variant=release when building the React Native application
* When using Swagger authentication insert "Bearer <INSERT TOKEN\>" to ensure that all API testing functionality is usable 

# Docker Instructions
1. Make folder containing .yml and .env
2. Delete Docker instance if exists (w/ sudo in Linux or just deleting it through Windows)
3. cd to the aforementioned folder 
4. Ensure that no instances of msql are taking up port 3306
5. run command docker-compose up -d

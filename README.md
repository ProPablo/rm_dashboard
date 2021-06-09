# Redland Mueseum Display Information and Guidance System (DIGS)

An administration management portal and app for the Redland Museum Display Information and Guidance System created with the React Admin framework. This project is created as a part of the IFB399 CAPSTONE PHASE 2 subject at Queensland University of Technology (QUT). 
Run server and client together for development and assign appropriate dotENV. Deployment occurs live by compiling every push to master using GitHub actions. RM_dashboard communicates between Codebase2, the complementary React Native application. Swagger documentation can be accessed by either appending `/api/swagger` to the base `rm.kongroo.xyz` url or `/swagger` to the localhost development server. 

## Documentation and Read Up Material
### Codebase 1
- Frontend 
  * https://marmelab.com/react-admin/Readme.html

- Backend Server 
  * https://typeorm.io/#/
  * https://joi.dev/
  * https://docs.docker.com/
  * https://docs.microsoft.com/en-us/windows/wsl/install-win10

### Codebase 2
* https://reactnative.dev/
* https://reactnavigation.org/

## Notes
* Important note when deploying, the ssh key must have a trailing newline in it 
* Ensure that `chmod +X -R public/` is run on the public folder so that nginx can serve the files without any issues
* Also add the overall folder into /var/www/ to oblige with linux philosophy
* When using Swagger authentication insert "Bearer **<INSERT TOKEN\>**" to ensure that all API testing functionality is usable 

## Deployment instructions
* `sudo-apt update`
* `sudo-apt upgrade`
* `cd server && npm run pm2`

## Contributors
**Anhad Ahuja (Developer)**: 
  * Email: anhadrs@gmail.com
  * Phone Number: +61 490 779 437

**Tyrone Nolasco (Developer)**:  
  * Email: tyronewessnolasco@gmail.com
  * Phone Number: +61 401 687 774

**Fatima Kamila (Tutor)**

**Russell Dinte (Project Manager)**
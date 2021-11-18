# App (Codebase 2)
Mobile Frontend Developed by QUT Capstone Project team Green Tigers.
Developed in React Native, here are some common issues/ instructions on how to setup the Codebase.

Also Migrated to Typescript, see: https://reactnative.dev/docs/typescript

## Run 
* For a dev environment, ensure you have a file in the root of this directory called env.js that exports `backendURL` which is ip:port of server
* To run development server for android run ```npx react-native run-android```. If this ddoesnt work try running ```npx react-native run-android --variant=debug```

* To generate an APK for Android phones run, ```npx react-native run-android --variant=release``` when building the React Native application


## Best Practices: 
* Attempt to fit all code in lowest stack
* Fit all interfaces in one file

## Bluetooth beacon functionality:
* Ensure that both bluetooth and location services are enabled 
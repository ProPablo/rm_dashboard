# Codebase2_GT
Mobile Frontend Developed by QUT Capstone Project team Green Tigers.
Developed in React Native, here are some common issues/ instructions on how to setup the Codebase.

Also Migrated to Typescript, see: https://reactnative.dev/docs/typescript

## CodeBase 1 run instructions
* Run Proxy (In powershell)
```
npx iisexpress-proxy 8181 to 9191
```

## WSL run instructions:
* On cmd:
```
adb -a nodaemon server start
```
* On wsl: 
    - ```npx react-native run-android --variant=debug --deviceId dc9c8da6 --verbose```

* On admin powershell:
```
iex "netsh interface portproxy delete v4tov4 listenport=8081 listenaddress=127.0.0.1" | out-null;
$WSL_CLIENT = bash.exe -c "ifconfig eth0 | grep 'inet '";
$WSL_CLIENT -match '\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}';
$WSL_CLIENT = $matches[0];
iex "netsh interface portproxy add v4tov4 listenport=8081 listenaddress=127.0.0.1 connectport=8081 connectaddress=$WSL_CLIENT"
```
## Code-First Development with Entity Framework Create Migration
* delete database SQL server manager 
* disable auto migration 
* update-database 
* add-migration enable auto migration

## Best Practices: 
* Attempt to fit all code in lowest stack
* Fit all interfaces in one file
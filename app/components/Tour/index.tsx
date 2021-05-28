import React, {createContext, useEffect} from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View,
  LogBox,
  ToastAndroid
} from 'react-native';
import RNAndroidLocationEnabler from 'react-native-android-location-enabler';
// const allPerms = [PermissionsAndroid.PERMISSIONS.BLUETOOTH, PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];


export interface TourContext {
  beaconMAC: string | null,
  isBLEnabled: boolean,
}

const TourContext = createContext<TourContext>({ beaconMAC: null, isBLEnabled: false });
TourContext.displayName = "BeaconContext";


const requestLocationPermission = async () => {
  console.log("asking for perms"); 

  try {
    const granted = await PermissionsAndroid.request(

      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'Redland Museum app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("GOT PERMS");
      return true;
    } else {
      // permission denied
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};

export const isLocationEnabled = () => {
    const showPermsToast = () => {
        ToastAndroid.show("Location services not turned on successfully", ToastAndroid.SHORT);
      };
      
  RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
    interval: 10000,
    fastInterval: 5000,
  })
    .then((data) => {
    })
    .catch((err) => {
      console.log("location services not turned on successfully");
      showPermsToast();

    });  
}

const Tour = () => {

}

export default Tour;
import React, { createContext, useEffect, useRef, useState } from 'react';
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
import { BleManager } from 'react-native-ble-plx';
// const allPerms = [PermissionsAndroid.PERMISSIONS.BLUETOOTH, PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];


export interface TourContextValue {
  beaconMAC: string | null,
  isBLEnabled: boolean,
}

const TourContext = createContext<TourContextValue>({ beaconMAC: null, isBLEnabled: false });
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

const Tour: React.FC = ({ children }) => {
  const manager = useRef<BleManager | null>(null);
  // TODO handle islocation
  const [tourState, setTour] = useState<TourContextValue>({ beaconMAC: null, isBLEnabled: true });
  const scanAndConnect = () => {
    manager.current?.startDeviceScan(null, null, (error, device) => {
      // console.log("inside", { device });
      if (device) {
        setTour({ ...tourState, beaconMAC: device.id });
      }
    });
  }

  useEffect(() => {
    requestLocationPermission()
      .then(() => {
        manager.current = new BleManager();
        manager.current?.startDeviceScan(null, null, (error, device) => {
          // TODO display error
          // console.log({ device, error });
          if (device) {
            setTour({ ...tourState, beaconMAC: device.id });
          }
        });

        const subscription = manager.current.onStateChange((state => {
          console.log("BLE Manager online");
          if (state === 'PoweredOn') {
            console.log("Starting scanning");
            scanAndConnect();
            subscription.remove();
          }
        }));
      })
    return () => {
      // manager.current?.stopDeviceScan();
      // manager.current?.destroy();
    }
  }, [])
  

  return (
    <TourContext.Provider value={tourState}>
      {children}
    </TourContext.Provider>
  )
}

export default Tour;

export { TourContext };
import { Beacon } from '@shared/types';
import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import { useCallback } from 'react';
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
import { BleManager, Device } from 'react-native-ble-plx';
import { BeaconsContext } from '../../store';
// const allPerms = [PermissionsAndroid.PERMISSIONS.BLUETOOTH, PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];


export interface TourContextValue {
  beaconList: Beacon[],
  beaconMAC: string | null,
  isBLEnabled: boolean,
}


// const TourContext = createContext<TourContextValue>({ beaconList: [], beaconMAC: null, isBLEnabled: false });
const TourContext = createContext<Beacon[]>([]);
TourContext.displayName = "TourContext";


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
  // const [tourState, setTour] = useState<TourContextValue>({ beaconList: [], beaconMAC: null, isBLEnabled: true });
  const [beaconsList, setBeacons] = useState<Beacon[]>([]);
  const [foundBeacon, setBeacon] = useState<Device | null>(null);
  const beacons = useContext(BeaconsContext);

  useEffect(() => {
    if (!foundBeacon) return;

    const beacon = beacons.find((b) => b.macAddress === foundBeacon.id);
    if (beacon) {
      // null assertion says object will not be null
      beacon.rssi = foundBeacon.rssi!;
      setBeacons((oldList) => {
        const newList = [...oldList];
        
        const existing = oldList.findIndex(b => b.id === beacon.id)
        // console.log({ existing, newList, oldList })
        if (existing != -1) {
          newList.splice(existing, 1, beacon);
        }
        else {
          newList.push(beacon);
        }
        
        newList.sort((a, b) => a.rssi! - b.rssi!);
        // console.log(newList, { foundBeacon })
        return newList;
      })

      // setTour({ ...tourState, beaconMAC: foundBeacon.id});
    }

  }, [foundBeacon]);

  // const scanAndConnect = () => {
  //   manager.current?.startDeviceScan(null, null, (error, device) => {
  //     console.log("inside", { device });
  //     if (device) {
  //       setTour({ ...tourState, beaconMAC: device.id });
  //     }
  //   });
  // }
  const onBeaconDetect = (device: Device) => {
    console.log("new device", beacons);


  }

  const memoBeacon = useCallback(onBeaconDetect, [beacons]);

  useEffect(() => {
    console.log("Starting beacon functionality");
    requestLocationPermission()
      .then(() => {
        manager.current = new BleManager();
        manager.current?.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log(error);
            return;
          }
          // TODO display error
          // console.log({ device, error });
          if (!device) return;
          setBeacon(device);
          // setTour({ ...tourState, beaconMAC: device.id });
        });

        // const subscription = manager.current.onStateChange((state => {
        //   console.log("BLE Manager online");
        //   if (state === 'PoweredOn') {
        //     console.log("Starting scanning");
        //     // scanAndConnect();
        //     subscription.remove();
        //   }
        // }));
      })
    return () => {
      // manager.current?.stopDeviceScan();
      // manager.current?.destroy();
    }
  }, [])


  return (
    <TourContext.Provider value={beaconsList}>
      {children}
    </TourContext.Provider>
  )
}

export default Tour;

export { TourContext };
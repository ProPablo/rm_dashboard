import { Beacon } from '@shared/types';
import React, { createContext, Dispatch, useContext, useEffect, useRef, useState } from 'react';
import { useMemo } from 'react';
import { useReducer } from 'react';
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
import { BleError, BleManager, Device } from 'react-native-ble-plx';
import { BeaconsContext, GlobalActionContext } from '../../store';
// const allPerms = [PermissionsAndroid.PERMISSIONS.BLUETOOTH, PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];


//Best practice so that we can rename anytime
export enum TourActionName {
  FORWARD = "forward",
  VISIT = "visit",
  GOBACK = "backward",
  VISITEXACT = "visitExact"
}
export interface TourState {
  hasVisited: boolean,
  maxZoneIndex: number,
  currGuideZoneIndex: number,
}

const initialTourState: TourState = {
  hasVisited: false,
  currGuideZoneIndex: 0,
  maxZoneIndex: 0
}

type TourAction =
  { type: TourActionName.FORWARD } |
  { type: TourActionName.VISIT } |
  { type: TourActionName.GOBACK } |
  { type: TourActionName.VISITEXACT, index: number };

const TourReducer = (state: TourState, action: TourAction): TourState => {
  console.log({ state, action });
  switch (action.type) {

    case 'forward':
      const newZone = state.currGuideZoneIndex + 1;
      if (newZone > state.maxZoneIndex) return { ...state, currGuideZoneIndex: newZone, maxZoneIndex: newZone, hasVisited: false };
      return { ...state, currGuideZoneIndex: newZone, }
    case 'backward':
      return { ...state, currGuideZoneIndex: state.currGuideZoneIndex - 1 };
    case 'visit':
      return { ...state, hasVisited: true }
    default:
      return state;
  }
}

const TourStateContext = createContext<[TourState, Dispatch<TourAction>]>([initialTourState, () => null]);
TourStateContext.displayName = "TourStateContext";

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
      // isLocationEnabled();
      await RNAndroidLocationEnabler.promptForEnableLocationIfNeeded({
        interval: 10000,
        fastInterval: 5000,
      });

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
      console.log("Done with bullshit")
    })
    .catch((err) => {
      console.log("location services not turned on successfully");
      showPermsToast();

    });
}

export const manager = new BleManager();

const BEACON_TIMEOUT = 10 * 1000; //TEN SECONDS
const BEACON_AUTO_EXPIRE = 20 * 1000;

const Tour: React.FC = ({ children }) => {
  const [nearbyBeacons, setBeacons] = useState<Beacon[]>([]);
  const beacons = useContext(BeaconsContext);
  const { setBLEnabled } = useContext(GlobalActionContext);
  const reducerVal = useReducer(TourReducer, initialTourState);

  const onBeacon = useCallback((error: BleError | null, device: Device | null) => {
    if (error) {
      if (error.message == "BluetoothLE is powered off") {
        console.log(error);
        setBLEnabled(false);
      }
      return;
    }
    if (!device) return;
    const serverBeacon = beacons.find((b) => b.macAddress === device.id);
    if (!serverBeacon) return;
    serverBeacon.rssi = device.rssi!;

    const currentDate = (new Date()).getTime();
    serverBeacon.lastVisited = currentDate;

    setBeacons((oldList) => {
      const newList = oldList.filter(b => b.lastVisited! + BEACON_TIMEOUT < currentDate);
      const existing = newList.findIndex(b => b.id === serverBeacon.id);
      if (existing != -1) {
        newList.splice(existing, 1, serverBeacon);
      }
      else {
        newList.push(serverBeacon);
      }
      console.log({ serverBeacon, newList, oldList });
      return newList;
    })
  }, [beacons, setBeacons])


  useEffect(() => {
    const initProcess = async () => {
      await requestLocationPermission();
      // await manager.enable(); //awaiting doesnt actually wait cringe
      manager.enable();
      manager.startDeviceScan(null, null, onBeacon);
      console.log("diggers")
    }
    initProcess();

    const beaconTimeoutTimer = setInterval(() => {
      const currentDate = (new Date()).getTime();
      console.log("autoTimeout");
      setBeacons(prevList => prevList.filter(b => b.lastVisited! + BEACON_TIMEOUT < currentDate));
    })

    //TODO; fix subscriber
    const subscription = manager.onStateChange((state => {
      console.log("BLE Manager online");
      if (state === 'PoweredOn') {
        console.log("Starting scanning");
        manager.startDeviceScan(null, null, onBeacon);
        subscription.remove();
      }
      else {
        console.log("Not online");
      }
    }));

    // })
    return () => {
      manager.stopDeviceScan();
      // manager.destroy();
      clearInterval(beaconTimeoutTimer);
    }
  }, [beacons])


  return (
    <TourContext.Provider value={nearbyBeacons}>
      <TourStateContext.Provider value={reducerVal}>
        {children}
      </TourStateContext.Provider>
    </TourContext.Provider>
  )
}

export default Tour;

export { TourContext, TourStateContext };
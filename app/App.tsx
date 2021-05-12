/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import React, { createContext, useEffect, useRef, useState } from 'react';
import {
  PermissionsAndroid,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,

  useColorScheme,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';
import { BleManager } from 'react-native-ble-plx';
import { ArtefactStack } from './components/Artefacts/ArtefactStack';
import { ExhibitionStack } from './components/Exhibitions/ExhibitionStack';
import { HomeStack } from './components/Home/HomeStack';
import { StoreStack } from './components/Store/StoreStack';
import { GlobalStore } from './store';

const icons: Record<string, string> = {
  Home: "home",
  Artefacts: "bank",
  Exhibitions: "info-circle",
  Store: "shopping-cart"
}

const sizes: Record<string, number> = {
  Home: 25,
  Artefacts: 20,
  Exhibitions: 25,
  Store: 25,
}

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          return (
            <Icon name={icons[route.name]} size={sizes[route.name]} color={color} />
          );
        },
      })}
      tabBarOptions={{
        activeTintColor: "#A20C02",
      }}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Artefacts" component={ArtefactStack} />
      <Tab.Screen name="Exhibitions" component={ExhibitionStack} />
      <Tab.Screen name="Store" component={StoreStack} />

    </Tab.Navigator>
  );
}

// const allPerms = [PermissionsAndroid.PERMISSIONS.BLUETOOTH, PermissionsAndroid.PERMISSIONS.BLUETOOTH_ADMIN, PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION];
const requestLocationPermission = async () => {
  console.log("asking for perms");
  try {
    const granted = await PermissionsAndroid.request(

      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      {
        title: 'Location Permission',
        message:
          'This example app needs to access your location in order to use bluetooth beacons.',
        buttonNeutral: 'Ask Me Later',
        buttonNegative: 'Cancel',
        buttonPositive: 'OK',
      },
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("GOT PERMS")
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

export interface BeaconContextValue {
  beaconMAC: string | null
}

const BeaconContext = createContext<BeaconContextValue>({ beaconMAC: null });
BeaconContext.displayName = "BeaconContext";


const App = () => {
  const manager = useRef<BleManager | null>(null);

  const scanAndConnect = () => {
    manager.current?.startDeviceScan(null, null, (error, device) => {
      console.log("inside", { device });
    });
  }

  const isDarkMode = useColorScheme() === 'dark';

  const [beaconState, setfoundBeacon] = useState<BeaconContextValue>({ beaconMAC: null });

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };
  //TODO create Hook for BT updates
  useEffect(() => {
    requestLocationPermission()
      .then(() => {
        manager.current = new BleManager();
        manager.current?.startDeviceScan(null, null, (error, device) => {
          // TODO display error
          // console.log({ device, error });
          if (device) {
            setfoundBeacon({ beaconMAC: device.id });
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
    <NavigationContainer theme={NavigationTheme}>
      <BeaconContext.Provider value={beaconState}>
        <GlobalStore>
          <Tabs />
        </GlobalStore>
      </BeaconContext.Provider>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});



export const NavigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: '#A20C02',
    card: '#F2E3A6',
    text: '#000'
  },
};


export default App;

export { BeaconContext };
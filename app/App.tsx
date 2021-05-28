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
  View,
  LogBox
} from 'react-native';
LogBox.ignoreLogs(['Reanimated 2']);
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';
import { BleManager } from 'react-native-ble-plx';
import { ArtefactStack } from './components/Artefacts/ArtefactStack';
import { TourStack } from './components/Tour/TourStack'; 
import { ExhibitionStack } from './components/Exhibitions/ExhibitionStack';
import { HomeStack } from './components/Home/HomeStack';
import { StoreStack } from './components/Store/StoreStack';
import { GlobalStore } from './store';


const icons: Record<string, string> = {
  Home: "home",
  Artefacts: "bank",
  Tour: "map-marker",
  Exhibitions: "info-circle",
  Store: "shopping-cart"
}

const sizes: Record<string, number> = {
  Home: 25,
  Artefacts: 20,
  Tour: 20,
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
      <Tab.Screen name="Tour" component={TourStack} />
      <Tab.Screen name="Exhibitions" component={ExhibitionStack} />
      <Tab.Screen name="Store" component={StoreStack} />

    </Tab.Navigator>
  );
}




const App = () => {
  const manager = useRef<BleManager | null>(null);

  const isDarkMode = useColorScheme() === 'dark';

  const [tourState, setTour] = useState<BeaconContextValue>({ beaconMAC: null, isBLEnabled: false});

  const scanAndConnect = () => {
    manager.current?.startDeviceScan(null, null, (error, device) => {
      // console.log("inside", { device });
      if (device) {
        setTour({ ...tourState, beaconMAC: device.id});
      }
    });
  }

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
    <NavigationContainer theme={NavigationTheme}>
      <TourContext.Provider value={tourState}>
        <GlobalStore>
          <Tabs />
        </GlobalStore>
      </TourContext.Provider>
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

export { TourContext};
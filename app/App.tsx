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
import React from 'react';
import {
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
import { ArtefactStack } from './components/Artefacts/ArtefactStack';
import { ExhibitionStack } from './components/Exhibitions/ExhibitionStack';
import { HomeStack } from './components/Home/HomeStack';
import { StoreStack } from './components/Store/StoreStack';
import { GlobalStore } from './store';

const icons: Record<string, string> = {
  Home: "home",
  Artefacts: "bank",
  Events: "info-circle",
  Store: "shopping-cart"
}

const sizes: Record<string, number> = {
  Home: 25,
  Artefacts: 20,
  Events: 25,
  Store: 25,
}

const Tab = createBottomTabNavigator();
function Tabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          console.log(route.name);
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
      <Tab.Screen name="Exhibitions" component={ExhibitionStack}/>
      <Tab.Screen name="Store" component={StoreStack}/>

    </Tab.Navigator>
  );
}

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer theme={NavigationTheme}>
      <GlobalStore>
        <Tabs />
      </GlobalStore>
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

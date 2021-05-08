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
import { HomeStack } from './components/Home/HomeStack';
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
      {/* <Tab.Screen name="Events" component={EventStack}/>
      <Tab.Screen name="Store" component={StoreStack}/> */}

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

        {/* <SafeAreaView style={backgroundStyle}>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={backgroundStyle}>
          <Header />
          <View
            style={{
              backgroundColor: isDarkMode ? Colors.black : Colors.white,
            }}> */}
        {/* <Button
            onPress={() => setstate(state + 1)}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          /> */}
        {/* <Section title="Step One">
             Edit <Text style={styles.highlight}>App.js</Text> to change this
             screen and then come back to see your edits.
           </Section>
           <Section title="See Your Changes">
             <ReloadInstructions />
           </Section>
           <Section title="Debug">
             <DebugInstructions />
           </Section>
           <Section title="Learn More">
             Read the docs to discover what to do next:
           </Section> */}

        {/* </View>
        </ScrollView>
      </SafeAreaView> */}
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

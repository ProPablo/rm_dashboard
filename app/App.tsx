/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import {
  Button,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import { Artefact } from '@shared/types';
import { request, baseURL } from './lib/controllers';
import { GlobalStore } from './stores';

//  const Section: React.FC<{
//    title: string;
//  }> = ({children, title}) => {
//    const isDarkMode = useColorScheme() === 'dark';
//    return (
//      <View style={styles.sectionContainer}>
//        <Text
//          style={[
//            styles.sectionTitle,
//            {
//              color: isDarkMode ? Colors.white : Colors.black,
//            },
//          ]}>
//          {title}
//        </Text>
//        <Text
//          style={[
//            styles.sectionDescription,
//            {
//              color: isDarkMode ? Colors.light : Colors.dark,
//            },
//          ]}>
//          {children}
//        </Text>
//      </View>
//    );
//  };

const App = () => {
  const isDarkMode = useColorScheme() === 'dark';
  // Handle in separate component that also exposes a button to refresh all data
  // Refresh context (useRefresh exposed as context and usememo)
  const [state, setstate] = useState(0);

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView
        contentInsetAdjustmentBehavior="automatic"
        style={backgroundStyle}>
        <Header />
        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
          }}>
          <GlobalStore>
            <Text>{state}</Text>
          </GlobalStore>
          <Button
            onPress={()=> setstate(state+1)}
            title="Learn More"
            color="#841584"
            accessibilityLabel="Learn more about this purple button"
          />
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

        </View>
      </ScrollView>
    </SafeAreaView>
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

export default App;

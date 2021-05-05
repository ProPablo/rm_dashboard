import React, { useState, useEffect, useContext } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';

import {
  ScrollView,
  TextInput,
  Switch,
  View,
  Text,
  TouchableWithoutFeedback,
  FlatList,
  StyleSheet, Pressable, Button
} from 'react-native';
import { ArtefactStackParams } from './ArtefactStack';
import { IArtefact } from '../../lib/Interfaces';
import { artefactsURL } from '../../lib/urls';
import ArtefactListView from './ArtefactListView';
import ArtefactsContext, { artefactsContextValue } from './ArtefactsContext';
import { Card, Icon } from 'react-native-elements';


type NavigationProp = StackNavigationProp<ArtefactStackParams>

// Refactor to create own Searchable List component

interface Props {
  navigation: NavigationProp
}

const ArtefactsScreen: React.FC<Props> = ({ navigation }) => {

  const [searchTerm, setsearchTerm] = useState("");
  // const [searchAttribute, setsearchAttribute] = useState("");
  const {artefacts, loadArtefacts} = useContext(ArtefactsContext);
  const [filtered, setfiltered] = useState(artefacts);

  function actionOnRow(item: number) {
    navigation.navigate("ArtefactDetails", {
      artefactId: item
    })
  };

  function filterData() {
    console.log("Filteering data");
    const reg = RegExp(searchTerm, 'gi' );
    setfiltered(artefacts?.filter((item)=> (item.ArtefactCategory?.Name || "" + item.AdditionalComments + item.Description + item.Name).match(reg)));
  }

  useEffect(()=> {
    filterData();
  }, [artefacts, searchTerm]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
          <View style={styles.searchInputs}>
            <TextInput
              style={styles.search}
              placeholder={`Search ${artefacts?.length} Artefacts`}
              onChangeText={searchTerm => setsearchTerm(searchTerm)}
            />
          </View>

          <FlatList
            data={filtered}
            renderItem={({ item, index }) => (
              <Pressable onPress={() => actionOnRow(item.Id)}>
                <ArtefactListView artefact={item}/>
                {/* <Text style={styles.listItem}>{item.Name}</Text> */}
              </Pressable>
            )}
            keyExtractor={(item)=>item.Id.toString()}
          ></FlatList>
      </View>
    </View>
  );
}


const styles = StyleSheet.create({
  pageContainer: {
      padding: 10,
      flex: 1,
      backgroundColor: '#F7EECA',
  },
  searchInputs: {
      flexDirection: "row"
  },
  search: {
      flex: 8,
      marginBottom: 20,
      borderColor: "#ffa616",
      borderBottomWidth: 3,
      padding: 10
  },
  switch: {
      flex: 2
  },
  info: {
      padding: 10,
      marginTop: 20,
      borderColor: "#f4cfce",
      borderWidth: 1
  },
  row: {
      flexDirection: "row",
      backgroundColor: "#f4cfce"
  },
  row1: {
      flexDirection: "row"
  },
  prop: {
      flex: 1,
      padding: 10
  },
  val: {
      alignSelf: "center",
      flex: 1
  }
});

export default ArtefactsScreen;
import React, { useState, useEffect, useContext } from 'react';

import { StackNavigationProp } from '@react-navigation/stack';
//import { SearchableFlatList } from "react-native-searchable-list";

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
import { ExhibitionStackParams } from './ExhibitionStack';
import ExhibitionListView from './ExhibitionListView';
import { ExhibitionsContext } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome';


type NavigationProp = StackNavigationProp<ExhibitionStackParams>

// Refactor to create own Searchable List component

interface Props {
  navigation: NavigationProp
}

const ExhibitionsScreen: React.FC<Props> = ({ navigation }) => {

  const [searchTerm, setsearchTerm] = useState("");
  const [searchAttribute, setsearchAttribute] = useState("");
  const [ignoreCase, setignoreCase] = useState(true);
  const exhibitions = useContext(ExhibitionsContext);
  const [filtered, setfiltered] = useState(exhibitions);


  function actionOnRow(item: number) {
    navigation.navigate("ExhibitionDetailScreen", {
      exhibitionId: item
    })
  };
  
  useEffect(() => {
    const reg = RegExp(searchTerm, 'gi');
    setfiltered(exhibitions?.filter((item) => (item.name + item.organiser + item.description).match(reg)));
  }, [exhibitions, searchTerm]);


  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
        <View style={styles.searchInputs}>
          <TextInput
            style={styles.search}
            value={searchTerm}
            placeholder={`Search ${exhibitions?.length} Exhibitions`}
            placeholderTextColor={"#000000"}
            onChangeText={searchTerm => setsearchTerm(searchTerm)}
          />
          <Pressable style={styles.clear} onPress={() => setsearchTerm("")}>
            <Icon name="ban" size={30} color="#7A0600" />
          </Pressable>
        </View>

        <FlatList
          data={filtered}
          renderItem={({ item }) => (
            <Pressable onPress={() => actionOnRow(item.id)}>
              <ExhibitionListView exhibition={item} />
              {/* <Text style={styles.listItem}>{item.Name}</Text> */}
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
        ></FlatList>


      </View>
    </View>
  );
}


export default ExhibitionsScreen;

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
    color: "#000000",
    marginBottom: 20,
    borderColor: "#ffa616",
    borderBottomWidth: 3,
    padding: 10
  },
  clear: {
    color: "#000000",
    marginBottom: 20,
    borderColor: "#ffa616",
    borderBottomWidth: 3,
    padding: 10,
  },
});
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
import { StoreStackParams } from './StoreStack';
import StoreListView from './StoreListView';
import { StoreItemsContext } from '../../store';
import Icon from 'react-native-vector-icons/FontAwesome';


type NavigationProp = StackNavigationProp<StoreStackParams>

// Refactor to create own Searchable List component

interface Props {
  navigation: NavigationProp
}

const StoreScreen: React.FC<Props> = ({ navigation }) => {

  const [searchTerm, setsearchTerm] = useState("");
  const [searchAttribute, setsearchAttribute] = useState("");
  const [ignoreCase, setignoreCase] = useState(true);
  const storeItems = useContext(StoreItemsContext);
  const [filtered, setfiltered] = useState(storeItems);



  function actionOnRow(item: number) {
    navigation.navigate("StoreDetailScreen", {
      storeId: item
    })
  };
  
  useEffect(() => {
    const reg = RegExp(searchTerm, 'gi');
    setfiltered(storeItems?.filter((item) => (item.name + item.description + item.cost).match(reg)));
  }, [storeItems, searchTerm]);

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.pageContainer}>
        <View style={styles.searchInputs}>
          <TextInput
            style={styles.search}
            value={searchTerm}
            placeholder={`Search ${storeItems?.length} Store Items`}
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
              <StoreListView store={item} />
              {/* <Text style={styles.listItem}>{item.Name}</Text> */}
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()}
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
    color: "#000000",
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
  },
  clear: {
    color: "#000000",
    marginBottom: 20,
    borderColor: "#ffa616",
    borderBottomWidth: 3,
    padding: 10,
  },
});

export default StoreScreen;
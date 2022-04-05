import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
    FlatList, Pressable, StyleSheet, TextInput, View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { MemoizedContext, ZonesContext } from '../../store';
import { ZoneStackParams } from './ZoneStack';
import ZoneListView from './ZoneListView';

type NavigationProp = StackNavigationProp<ZoneStackParams>

// Refactor to create own Searchable List component

interface Props {
    navigation: NavigationProp
}

const ZonesScreen: React.FC<Props> = ({ navigation }) => {
    const [searchTerm, setsearchTerm] = useState("");
    const zones = useContext(ZonesContext);
    const { artefacts } = useContext(MemoizedContext);
    
    const [filtered, setfiltered] = useState(zones);

    function actionOnRow(item: number) {
        navigation.navigate("ZoneDetails", {
            zoneId: item
        })
    };

    
    useEffect(() => {
        const reg = RegExp(searchTerm, 'gi');
        // setfiltered(zones?.filter((z) => (z.name || "" + z.description).match(reg)));
        setfiltered(zones?.filter((z) => (z.name + z.description + z.Artefacts.map((a) => artefacts[a].name + artefacts[a].description).join()).match(reg)));
    }, [artefacts, zones, searchTerm]);

    return (
        
        <View style={{ flex: 1 }}>
            <View style={styles.pageContainer}>
                <View style={styles.searchInputs}>
                    <TextInput
                        style={styles.search}
                        value={searchTerm}
                        placeholder={`Search ${zones?.length} Zones`}
                        placeholderTextColor={"#000000"}
                        onChangeText={searchTerm => setsearchTerm(searchTerm)}
                    />
                    <Pressable style={styles.clear} onPress={() => setsearchTerm("")}>
                        <Icon name="ban" size={30} color="#7A0600" />
                    </Pressable>
                </View>

                <FlatList
                    data={filtered}
                    renderItem={({ item, index }) => (
                        <Pressable onPress={() => actionOnRow(item.id)}>
                            <ZoneListView zone={item} />
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

    clear: {
        color: "#000000",
        marginBottom: 20,
        borderColor: "#ffa616",
        borderBottomWidth: 3,
        padding: 10,
    },
});

export default ZonesScreen;
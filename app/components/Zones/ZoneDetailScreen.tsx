import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Artefact, ZoneConsumable } from '@shared/types';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions, FlatList, Pressable,
    StyleSheet, Text, View
} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { globalStyle } from '../../lib/styles';
import { MemoizedContext } from '../../store';
import { ZoneStackParams } from './ZoneStack';

type ZoneStackRoute = RouteProp<ZoneStackParams, 'ZoneDetails'>
type NavigationProp = StackNavigationProp<ZoneStackParams>

interface Props {
    route: ZoneStackRoute,
    navigation: NavigationProp,
}

interface ArtefactProps {
    artefactId: number,
}

const ZoneArtefactsListView = ({ artefactId }: ArtefactProps) => {
    const { artefacts } = useContext(MemoizedContext);
    const [artefact, setArtefact] = useState<Artefact | undefined>(undefined);
    useEffect(() => {
        if (!artefacts) return;
        setArtefact(artefacts[artefactId]);
    })

    return (
        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{artefact?.name}</Card.Title>
                <Text style={[globalStyle.text, styles.cardDescr]}>{artefact?.description}</Text>
                <Card.Image source={{
                    uri: artefact?.thumbnail, 
                }}/>
            </Card>
        </View>
    )
}

export const ZoneDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { zoneId } = route.params;
    const { zones } = useContext(MemoizedContext);

    const [zone, setZone] = useState<ZoneConsumable | undefined>(undefined);

    function actionOnRow(item: number) {
        navigation.push("ArtefactDetails", {
          artefactId: item
        })
    };
    useEffect(() => {
        if (!zones) return;
        setZone(zones[+zoneId]);
    }, [zones]);
   
    return (
        <View style={styles.pageContainer}>
            {zone &&
                <View style={[styles.viewDescr]}>
                    <Text selectable style={styles.textName}> {zone.name}</Text>
                    <Text style={styles.textDescr}>{zone.description}</Text>
                </View>
            }
            <FlatList
                data={zone?.Artefacts}
                renderItem={({ item }) => (
                    <Pressable onPress={() => actionOnRow(item)}>
                        <ZoneArtefactsListView artefactId={item} />
                    </Pressable>
                )}
                keyExtractor={(item) => item.toString()}
            />
        </View>
    )
}

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: 'center',
        padding: 10,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    image: {
        flex: 1,
        width: Math.round(dimensions.width * 15 / 16),
        borderRadius: 10,
        marginBottom: 10,
    },

    video: {
        height: 450,
        borderRadius: 10,
    },

    textName: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },

    textDescr: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },

    cardDescr: {
        paddingBottom: 10,
    },

    viewDescr: {
        backgroundColor: '#F7EECA',
        borderRadius: 5,
        padding: 10,
    }
});

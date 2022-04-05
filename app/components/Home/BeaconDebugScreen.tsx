import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect } from 'react';
import { HomeStackParams } from './HomeStack';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { BeaconsContext } from '../../store';
import { TourContext } from '../Tour';


type NavigationProp = StackNavigationProp<HomeStackParams>

interface Props {
    navigation: NavigationProp
}
const BeaconDebugScreen: React.FC<Props> = () => {
    const beaconList = useContext(TourContext);
    useEffect(() => {
        console.log(beaconList)
    }, [beaconList])

    return (
        <ScrollView style={styles.pageContainer}>
            <View>
                <Text style={styles.beaconText}>
                    {beaconList.map((beacon) => (
                        <>
                            <Text>{beacon.macAddress}</Text>
                        </>
                    ))}
                </Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: "center",
        padding: 10,
        flex: 1,
        backgroundColor: '#F7EECA',
    },
    beaconText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Roboto'
    }
})
export default BeaconDebugScreen;

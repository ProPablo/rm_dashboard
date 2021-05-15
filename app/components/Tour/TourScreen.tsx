import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button,
    Image, StyleSheet, View
} from 'react-native';
import { Text } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { ZonesContext, BeaconsContext, ArtefactsContext } from '../../store';
import { TourStackParams } from './TourStack';
import Transform from './Transform';
import VideoComponent from '../Home/VideoComponent';

import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall } from "@shared/types";
import { BeaconContext } from '../../App';
import { MEDIA_URL } from '../../lib/controllers';

type NavigationProp = StackNavigationProp<TourStackParams>


interface Props {
    navigation: NavigationProp
}

export const BeaconVideo = () => {
    const beaconcontext = useContext(BeaconContext);

    const zones = useContext(ZonesContext);
    const beacons = useContext(BeaconsContext);
    const artefacts = useContext(ArtefactsContext);
    const [media, setmedia] = useState<ArtefactMediaSmall | undefined>(undefined);
    // Wrap in memoised function and return false and early and gay if null
    let foundMedia: ArtefactMediaSmall | undefined;

    useEffect(() => {
        const beacon = beacons.find((b) => b.macAddress === beaconcontext.beaconMAC);
        console.log("beacon", beacon);
        if (beacon && !media) {
            let foundZone = zones.find((z) => z.id === beacon.zoneId);
            if (foundZone) {
                const artefactNumber = foundZone.Artefacts[0];
                console.log({ beacon, foundZone, artefactNumber })
                if (artefactNumber) {
                    foundMedia = artefacts.find((a) => a.id === artefactNumber)?.Media;
                    console.log("found media", foundMedia);
                    setmedia(foundMedia);
                }
            }
        }

    }, [beaconcontext]);

    return (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 600
            }}
        >
            {
                media &&
                <VideoComponent height={450} src={`${MEDIA_URL}/${media.src}`} />
            }
        </View>
    );
}

const TourScreen: React.FC<Props> = ({ navigation }) => {


    // const renderContent = () => (
    //     <View
    //         style={{
    //             backgroundColor: 'white',
    //             padding: 16,
    //             height: 450,
    //         }}
    //     >
    //         {beaconcontext.beaconMAC &&
    //             <View>
    //                 <Text>Beacon: {beaconcontext.beaconMAC}</Text>
    //                 {
    //                     media &&
    //                     <VideoComponent src={`${MEDIA_URL}/${media.src}`} />
    //                 }
    //             </View>
    //         }

    //     </View>
    // );
    const renderContent = ()=> (
        <View >
            <BeaconVideo />
        </View>
    )

    const sheetRef = useRef(null);
    return (
        <View style={styles.containerStyle}>
            {/* @ts-ignore */}
            {/* <Button title="Open POGGUM Sheet" onPress={() => sheetRef.current?.snapTo(0)} /> */}
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
            <Transform><Image source={require('./floorplan.jpg')} /></Transform>

        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 2,
        margin: 2,
    },

    image: {
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    containerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    wrapperStyle: {

    }
});

export default TourScreen;

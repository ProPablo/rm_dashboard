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
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';


import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall } from "@shared/types";
import { TourContext } from '../../App';
import { MEDIA_URL } from '../../lib/controllers';
type NavigationProp = StackNavigationProp<TourStackParams>


interface Props {
    navigation: NavigationProp
}

export const BeaconVideo = () => {
    const tourContext = useContext(TourContext);
    

    const zones = useContext(ZonesContext);
    const beacons = useContext(BeaconsContext);
    const artefacts = useContext(ArtefactsContext);
    const [media, setmedia] = useState<ArtefactMediaSmall | undefined>(undefined);

    useEffect(() => {
        const {beaconMAC, isBLEnabled} = tourContext;
        if (!isBLEnabled || !beaconMAC) return;
        const beacon = beacons.find((b) => b.macAddress === beaconMAC);
        console.log("beacon", beacon);
        if (beacon && !media) {
            let foundZone = zones.find((z) => z.id === beacon.zoneId);
            if (foundZone) {
                let artefactIndex = 0;
                let foundMedia: ArtefactMediaSmall | undefined;
                while (artefactIndex < foundZone.Artefacts.length) {
                    const artefactId = foundZone.Artefacts[artefactIndex];
                    foundMedia = artefacts.find((a) => a.id === artefactId)?.Media;
                    if (foundMedia) break;
                    artefactIndex++;
                }
                if (foundMedia) {
                    setmedia(foundMedia);
                }
            }
        }

    }, [tourContext, zones, beacons, artefacts]);


    return (
        <View style={styles.videoBottomSheetStyle}>
            { media &&
                <VideoComponent height={450} src={`${MEDIA_URL}/${media.src}`} />
                // <VideoPlayer src={`${MEDIA_URL}/${media.src}`} />
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
    const renderContent = () => (
        <View style={styles.bottomSheetStyle}>
            <BeaconVideo />
        </View>
    )

    const handlePopUp = () => {
        // @ts-ignore
        sheetRef.current?.snapTo(0);
    }

    const sheetRef = useRef(null);
    return (
        <View style={styles.containerStyle}>
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={20}
                renderContent={renderContent}
            />
            <Transform><Image source={require('./floorplan.jpg')} /></Transform>
            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="chevron-up" size={23} color="white" />} />

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
        justifyContent: "center",
        backgroundColor: "#FDF3BF",
    },

    videoBottomSheetStyle: {
        backgroundColor: '#F3E1C7',
        padding: 16,
        height: 600
    },

    bottomSheetStyle: {
        backgroundColor: "#F3E1C7",
        padding: 16,
        height: 450,
    },

    wrapperStyle: {

    }
});

export default TourScreen;

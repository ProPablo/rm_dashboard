import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button,
    Image, StyleSheet, View
} from 'react-native';
import { Text } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { ZonesContext, BeaconsContext, ArtefactsContext, MemoizedContext, GlobalActionContext } from '../../store';
import { TourStackParams } from './TourStack';
import { ArtefactStackParams } from '../Artefacts/ArtefactStack'
import Transform from './Transform';
import VideoComponent from '../Home/VideoComponent';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TourContext } from '.';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall } from "@shared/types";
import { MEDIA_URL } from '../../lib/controllers';
import { globalStyle } from '../../lib/styles';
type NavigationProp = StackNavigationProp<TourStackParams>;


interface TourScreenProps {
    navigation: NavigationProp
}

interface TourContentProps {
    navigation: NavigationProp,
}

export const TourContent = ({ navigation }: TourContentProps) => {

    const tourContext = useContext(TourContext);

    const zones = useContext(ZonesContext);
    const beacons = useContext(BeaconsContext);
    const artefacts = useContext(ArtefactsContext);
    const memo = useContext(MemoizedContext);
    const globalActionContext = useContext(GlobalActionContext);
    const [currentArtefact, setArtefact] = useState<Artefact | undefined>(undefined);
    const [currentZone, setZone] = useState<ZoneConsumable | undefined>(undefined);

    const [paused, setPaused] = useState(true);

    function handlePause() {
        setPaused(true);
        console.log("bruh pause")
    }

    function handlePlay() {
        setPaused(false);
        console.log("bruh play")
    }

    function findArtefact(zone: ZoneConsumable): Artefact | undefined {
        let artefactIndex = 0;
        let foundArtefact: Artefact | undefined;
        // if (!zone) return;
        while (artefactIndex < zone.Artefacts.length) {
            const artefactId = zone.Artefacts[artefactIndex];
            // const artefact = artefacts.find((a) => a.id === artefactId);
            const artefact = memo.artefacts[artefactId];
            if (artefact?.Media) {
                foundArtefact = artefact;
                break;
            }
            artefactIndex++;
        }
        return foundArtefact;
    }

    useEffect(() => {

        const { beaconMAC, isBLEnabled } = tourContext;
        const { isLoading } = globalActionContext;
        if (!isBLEnabled || !beaconMAC || isLoading) return;
        // console.log(beaconMAC);
        const beacon = beacons.find((b) => b.macAddress === beaconMAC);

        if (beacon) {
            console.log("beacon", beacon);
            const newZone = zones.find((z) => z.id === beacon.zoneId)

            if (newZone && newZone.id != currentZone?.id) {
                setZone(newZone);
                const foundArtefact = findArtefact(newZone);
                console.log(memo.artefacts)
                if (foundArtefact) {
                    console.log("foundArtefact");
                    if (currentArtefact) {
                        // display notification

                    }
                    else {
                        setArtefact(foundArtefact);
                    }

                }
            }
        }
    }, [tourContext, zones, beacons, artefacts]);

    function tourActionOnPress() {
        if (!currentArtefact) return;
        navigation.navigate("Artefacts", {
            screen: "ArtefactDetails",
            params: {
                artefactId: currentArtefact.id
            }
        });
    }
    function handleVideoEnd() {
        console.log("videoEnd");
        if (currentZone) findArtefact(currentZone);
    }
    return (
        <View style={styles.videoBottomSheetStyle}>
            <Text style={styles.textName}> {currentZone?.name} </Text>
            {currentArtefact &&
                <View style={styles.video}>
                    <VideoPlayer
                        source={{ uri: `${MEDIA_URL}/${currentArtefact.Media.src}` }}
                        disableFullScreen={true}
                        disableBack={true}
                        disableVolume={true}
                        tapAnywhereToPause={true}
                        paused={paused}
                        onPause={handlePause}
                        onPlay={handlePlay}
                        onEnd={handleVideoEnd}
                    />
                    <Button onPress={tourActionOnPress} title="Go to Artefact" color="#7A0600" />
                </View>
            }
            <Text style={styles.textDescr}> {currentZone?.description} </Text>
        </View>
    );
}

const TourScreen = (props: { navigation: NavigationProp }) => {
    const renderContent = () => (
        <View style={styles.bottomSheetStyle}>
            <TourContent {...props} />
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
                snapPoints={[550, 300, 0]}
                borderRadius={20}
                renderContent={renderContent}
            />
            <Transform><Image source={require('./floorplan.jpg')} /></Transform>
            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="chevron-up" size={23} color="white" />} />

        </View>
    );
}

const styles = StyleSheet.create({
    textName: {
        fontSize: 27,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    textDescr: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto'
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
        height: "100%"
    },

    video: {
        height: 400,
    },

    bottomSheetStyle: {
        backgroundColor: "#F3E1C7",
        padding: 16,
        height: 550,
    },

    wrapperStyle: {

    }
});

export default TourScreen;

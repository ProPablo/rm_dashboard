import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Button,
    Image, Pressable, StyleSheet, ToastAndroid, View
} from 'react-native';
import { Card, Text } from 'react-native-elements';
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
import { useMemo } from 'react';
type NavigationProp = StackNavigationProp<TourStackParams>;


interface TourScreenProps {
    navigation: NavigationProp
}

interface TourContentProps {
    navigation: NavigationProp,
    zone?: ZoneConsumable
}

export const TourContent = ({ navigation, zone }: TourContentProps) => {
    const memo = useContext(MemoizedContext);

    const globalActionContext = useContext(GlobalActionContext);
    // const [currentArtefact, setArtefact] = useState<Artefact | undefined>(undefined);
    const beacons = useContext(BeaconsContext);
    const [hasPlayed, setHasPlayed] = useState(false);

    useEffect(() => {
        setHasPlayed(false);
    }, [zone]);

    const [paused, setPaused] = useState(true);

    function handlePause() {
        setPaused(true);
        console.log("bruh pause")
    }

    function handlePlay() {
        setPaused(false);
        console.log("bruh play")
    }

    const currentArtefact: Artefact | undefined = useMemo(() => {
        let artefactIndex = 0;
        let foundArtefact: Artefact | undefined;
        if (!zone) return;
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
    }, [memo])
    // function tourActionOnPress() {
    //     if (!currentArtefact) return;
    //     navigation.navigate("Artefacts", {
    //         screen: "ArtefactDetails",
    //         params: {
    //             artefactId: currentArtefact.id
    //         }
    //     });
    // }
    function handleVideoEnd() {
        console.log("videoEnd");
        // if (currentZone) findArtefact(currentZone);
    }
    return (
        <View style={styles.videoBottomSheetStyle}>

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
                    {/* <Button onPress={tourActionOnPress} title="Go to Artefact" color="#7A0600" /> */}
                </View>
            }
        </View>
    );
}

const TourScreen = (props: { navigation: NavigationProp }) => {
    const beaconList = useContext(TourContext);
    const memo = useContext(MemoizedContext);
    const transfromRef = useRef<Transform>(null);
    const currentZone = useMemo(() => {
        const { zones } = memo;
        // console.log(beaconList);
        if (beaconList.length) {
            // React unsorts in intermediate stages such as passing thrrough props
            beaconList.sort((a, b) => b.rssi! - a.rssi!);
            const beacon = beaconList[0];
            const foundZone = zones[beacon.zoneId];
            return foundZone;
        }
    }, [memo, beaconList])
    const renderContent = () => (
        <View style={styles.bottomSheetStyle}>
            <TourContent zone={currentZone} {...props} />
        </View>
    )

    const handlePopUp = () => {
        // @ts-ignore
        sheetRef.current?.snapTo(0);
    }

    // const handlreReset

    function zoneTitleOnPress() {
        if (!currentZone) return;
        console.log(currentZone.id)
        props.navigation.navigate("Zones", {
            screen: "ZoneDetails",
            params: {
                zoneId: currentZone.id
            }
        });
    }
    const sheetRef = useRef(null);
    return (
        <View style={styles.containerStyle}>
            {/* <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{artefact.name}</Card.Title>
                <Text style={globalStyle.text}>{artefact.description}</Text>

            </Card> */}

            <Pressable onPress={zoneTitleOnPress}>
                <View style={globalStyle.zoneContainer}>
                    <Text style={styles.textName}> {currentZone ? currentZone.name : "No Zone Found / Entered"}</Text>
                </View>
            </Pressable>
            
            <BottomSheet
                ref={sheetRef}
                snapPoints={[550, 300, 0]}
                borderRadius={20}
                renderContent={renderContent}
            />
            <Transform style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform>
            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="chevron-up" size={23} color="white" />} />
            <FAB color="#7A0600" onPress={()=> transfromRef.current?.resetTransform()} placement="left" icon={<Icon name="map" size={23} color="white" />} />

        </View>
       
    );
}

const styles = StyleSheet.create({
    textName: {
        fontSize: 27,
        color: "#FFFFFF",
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    textDescr: {
        fontSize: 15,
        color: "#FFFFFF",
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
    transformView: {
        flex: 1,
        // paddingTop: "80%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#00FF00"
    },

    
});

export default TourScreen;

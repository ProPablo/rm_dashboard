import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions, CommonActions, Route } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Image, Pressable, StyleSheet, ToastAndroid, View
} from 'react-native';
import { Text, Button } from 'react-native-elements';
import BottomSheet from 'reanimated-bottom-sheet';
import { ZonesContext, BeaconsContext, ArtefactsContext, MemoizedContext, GlobalActionContext } from '../../store';
import { TourStackParams } from './TourStack';
import { ZoneStackParams } from '../Zones/ZoneStack'
import Transform from './Transform';
import VideoComponent from '../Home/VideoComponent';
import { FAB } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { TourContext, TourStateContext } from '.';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall } from "@shared/types";
import { MEDIA_URL } from '../../lib/controllers';
import { globalStyle } from '../../lib/styles';
import { useMemo } from 'react';
import { useCallback } from 'react';
import Carousel from 'react-native-snap-carousel';


type NavigationProp = StackNavigationProp<TourStackParams>;


interface TourScreenProps {
    navigation: NavigationProp
}

interface TourGuideProps {
    navigation: NavigationProp,
    zone?: ZoneConsumable,
}

export const TourGuide = ({ navigation, zone }: TourGuideProps) => {
    const memo = useContext(MemoizedContext);
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);

    const globalActionContext = useContext(GlobalActionContext);


    // const [currentArtefact, setArtefact] = useState<Artefact | undefined>(undefined);
    const beacons = useContext(BeaconsContext);
    const [hasPlayed, setHasPlayed] = useState(false);
    const [paused, setPaused] = useState(false);

    useEffect(() => {
        console.log({ zone })
        setHasPlayed(false);
    }, [zone]);


    function handlePause() {
        setPaused(true);
        console.log("bruh pause")
    }

    function handlePlay() {
        setPaused(false);
        console.log("bruh play")
    }

    const currentTourZone = useMemo(() => {
        if (zones.length != 0) {
            return zones[tourState.currGuideZoneIndex];
        }
    }, [tourState.currGuideZoneIndex, zones]);

    const currentArtefact: Artefact | undefined = useMemo(() => {
        let artefactIndex = 0;
        let foundArtefact: Artefact | undefined;

        if (!currentTourZone) return;
        
        while (artefactIndex < currentTourZone.Artefacts.length) {
            const artefactId = currentTourZone.Artefacts[artefactIndex];
            // const artefact = artefacts.find((a) => a.id === artefactId);
            const artefact = memo.artefacts[artefactId];
            if (artefact?.Media) {
                foundArtefact = artefact;
                break;
            }
            artefactIndex++;
        }
        delete foundArtefact?.thumbnail;
        console.log({ foundArtefact })
        return foundArtefact;
    }, [memo, currentTourZone])

    function handleVideoEnd() {
        console.log("videoEnd");
        // if (currentZone) findArtefact(currentZone);
    }


    function handleSkip() {
        console.log("Forward");
        // ToastAndroid.show("Skipping", ToastAndroid.SHORT);
        tourDispatch({ type: 'forward' })
        // gravity is for location
        // ToastAndroid.showWithGravity(
        //     "All Your Base Are Belong To Us",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );
    }

    function handleBack() {
        console.log("GOing back");
        // ToastAndroid.show("Backing", ToastAndroid.SHORT);
        tourDispatch({ type: 'backward' })
    }
    return (
        <View style={styles.videoBottomSheetStyle}>
            <View style={styles.videoContainer}>
                {currentArtefact && (
                    (currentArtefact.Media.type === 1) ?
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
                        </View>
                        :
                            <Image
                                style={[styles.image]}
                                source={{
                                    uri: `${MEDIA_URL}/${currentArtefact.Media.src}`,
                                }} />
                )}
            </View>

            <View style={styles.controlsContainer}>
                <Button
                    buttonStyle={{ flex: 1, backgroundColor: "#7A0600", marginRight: 10, padding: 10 }}
                    icon={<Icon
                        name="chevron-left"
                        size={20}
                        color="white" />}
                    onPress={handleBack}
                    disabled={!(tourState.currGuideZoneIndex > 0)}
                />
                {/* <Button title={zone?.name} buttonStyle={{ flex: 3, backgroundColor: "#CAA868", padding: "30%", margin: 0 }}/> */}
                <Pressable>
                    <View style={styles.tourContainer}>
                        <Text style={styles.tourName}> {currentTourZone?.name}</Text>
                    </View>
                </Pressable>
                <Button
                    buttonStyle={{ flex: 1, backgroundColor: "#7A0600", marginLeft: 10, padding: 10 }}
                    icon={<Icon
                        name="chevron-right"
                        size={20}
                        color="white" />}
                    onPress={handleSkip}
                    disabled={!((tourState.hasVisited || tourState.currGuideZoneIndex < tourState.maxZoneIndex) && tourState.currGuideZoneIndex < zones.length)}
                />
            </View>
        </View>
    );
}

const TourScreen = (props: { navigation: NavigationProp }) => {
    const beaconList = useContext(TourContext);
    const memo = useContext(MemoizedContext);
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);
    const transfromRef = useRef<Transform>(null);
    const sheetRef = useRef<BottomSheet>(null);
    // const zoneGuideIndex = useState(0);


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
    }, [memo, beaconList]);

    useEffect(() => {
        // if (zones.length < maxZoneIndex + 1) return;
        // if (maxZoneIndex == -1) {
        //     if (currentZone?.name == "Starting zone") {
        //         setHasVisited(true);
        //     }
        //     return;
        // }
        if (zones.length < 1) return;

        if (currentZone?.id == zones[tourState.maxZoneIndex].id) {
            tourDispatch({ type: 'visit' });
            console.log("visited", zones[tourState.maxZoneIndex]);
        }
    }, [currentZone, zones])

    const renderContent = () => (
        <View style={styles.bottomSheetStyle}>
            <TourGuide zone={currentZone} {...props} />
        </View>
    )

    const handlePopUp = () => {
        sheetRef.current?.snapTo(0);
    }


    const zoneTitleOnPress = () => {
        if (!currentZone) return;
        console.log("bruh", { currentZone });

        props.navigation.push("ZoneDetails", { zoneId: currentZone.id })


        // props.navigation.dispatch((state) => {
        //     return CommonActions.reset({
        //         // ...state,
        //         index: 1,
        //         routes: [
        //             {
        //                 name: "Tour"
        //             },
        //             {
        //                 name: "Zones"
        //             },
        //             {
        //                 name: "Zones",
        //                 screen: "ZoneDetails",
        //                 params: {
        //                     zoneId: currentZone.id
        //                 }
        //             }
        //         ]
        //     })
        // })

        // props.navigation.push("Zones", {
        //     screen: "ZoneDetails",
        //     params: {
        //         zoneId: currentZone.id
        //     }
        // });

        // props.navigation.navigate("Zones", {
        //     screen: "ZoneDetails",
        //     params: {
        //         zoneId: currentZone.id
        //     }
        // });
    };

    return (
        <View style={styles.containerStyle}>
            {/* <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{artefact.name}</Card.Title>
                <Text style={globalStyle.text}>{artefact.description}</Text>

            </Card> */}

            <Pressable onPress={zoneTitleOnPress}>
                <View style={styles.zoneContainer}>
                    <Text style={styles.textName}> {currentZone ? currentZone.name : "No Zone Found / Entered"}</Text>
                </View>
            </Pressable>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[550, 300, 0]}
                borderRadius={20}
                renderContent={renderContent}
            />
            <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform>
            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="map-signs" size={23} color="white" />} />
            <FAB color="#7A0600" onPress={() => transfromRef.current?.resetTransform()} placement="left" icon={<Icon name="map" size={23} color="white" />} />

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
        padding: 10,
        height: "100%"
    },

    video: {
        height: 450,
        borderRadius: 10,
        borderWidth: 10,
        borderColor: 'black'
    },

    image: {
        flex: 1,
        height: 450,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 10,
        borderColor: 'black'
    },

    videoContainer: {
        minHeight: 450,
    },

    bottomSheetStyle: {
        backgroundColor: "#F3E1C7",
        padding: 10,
        height: 550,
    },

    transformView: {
        zIndex: -20,
        flex: 1,
        // paddingTop: "80%",
        justifyContent: "center",
        alignItems: "center",
        // backgroundColor:"#00FF00"
    },

    zoneContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#A20C02'
    },

    tourContainer: {
        flex: 3,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
        paddingLeft: "20%",
        paddingRight: "20%",
        backgroundColor: '#2A2F3C'
    },

    tourName: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    controlsContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "flex-end"
    },


});

export default TourScreen;

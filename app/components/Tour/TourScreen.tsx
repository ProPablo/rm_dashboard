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
import Carousel, { } from 'react-native-snap-carousel';
import { ZoneMediaRender } from '../Zones/ZoneDetailScreen';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';


type NavigationProp = StackNavigationProp<TourStackParams>;

type CarouselRenderItemProps = {
    item: Artefact,
    index: number
}

interface TourScreenProps {
    navigation: NavigationProp
}

interface TourGuideProps {
    navigation: NavigationProp,
    zone?: ZoneConsumable,
}

export const TourGuide = ({ navigation }: TourGuideProps) => {
    const memo = useContext(MemoizedContext);
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);

    // useEffect(() => {
    //     console.log({ zone })
    //     setHasPlayed(false);
    // }, [zone]);



    const currentTourZone = useMemo(() => {
        if (zones.length != 0) {
            return zones[tourState.currGuideZoneIndex];
        }
    }, [tourState.currGuideZoneIndex, zones]);

    const currentArtefactList: Artefact[] = useMemo(() => {
        if (!currentTourZone) return [];
        return currentTourZone.Artefacts.filter((artefactId) => memo.artefacts[artefactId].Media).map((artefactId) => memo.artefacts[artefactId]);
    }, [memo, currentTourZone])

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
        <View style={styles.bottomSheetContainer}>
            <View style={styles.carouselContainer}>
                <NativeViewGestureHandler disallowInterruption >

                    <Carousel
                        // layout={'stack'}
                        data={currentArtefactList}
                        renderItem={ZoneMediaRender}
                        sliderWidth={320}
                        itemWidth={320}
                    />
                </NativeViewGestureHandler>
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
        if (zones.length < 1) return;
        if (currentZone?.id == zones[tourState.maxZoneIndex].id) {
            tourDispatch({ type: 'visit' });
            console.log("visited", zones[tourState.maxZoneIndex]);
        }
    }, [currentZone, zones])

    const renderContent = () => (
        <TourGuide zone={currentZone} {...props} />
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
        <View style={styles.pageContainer}>
            <Pressable onPress={zoneTitleOnPress}>
                <View style={globalStyle.pressableContainer}>
                    <Text style={styles.textName}> {currentZone ? currentZone.name : "No Zone Found / Entered"}</Text>
                </View>
            </Pressable>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[550, 300, 0]}
                borderRadius={20}
                // @ts-ignore
                renderContent={renderContent}
            />
            <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform>
            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="map-signs" size={23} color="white" />} />
            <FAB color="#7A0600" onPress={() => transfromRef.current?.resetTransform()} placement="left" icon={<Icon name="map" size={23} color="white" />} />

        </View>

    );
}

const styles = StyleSheet.create({
    pageContainer: {
        flex: 1,
        backgroundColor: "#FDF3BF",
    },
    
    bottomSheetContainer: {
        backgroundColor: "#F3E1C7",
        // paddingLeft: 100,
        height: 550,
    },
    
    carouselContainer: {
        flex: 11,
        // minHeight: 450,
        alignItems: 'center',
        paddingTop: 20,
    },
    


    textName: {
        fontSize: 27,
        color: "#FFFFFF",
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    transformView: {
        zIndex: -20,
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
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
        // maxHeight: 100,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "flex-end"
    },


});

export default TourScreen;

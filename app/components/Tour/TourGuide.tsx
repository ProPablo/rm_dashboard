import { StackNavigationProp } from '@react-navigation/stack';
import { StackActions, CommonActions, Route } from '@react-navigation/native';
import React, { useContext, useEffect, useRef, useState } from 'react';
import {
    Image, Pressable, StyleSheet, ToastAndroid, View,
    Animated
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
import { TourActionName, TourContext, TourStateContext } from '.';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import { Artefact, ZoneConsumable, Beacon, ArtefactMediaSmall } from "@shared/types";
import { MEDIA_URL } from '../../lib/controllers';
import { globalStyle } from '../../lib/styles';
import { useMemo } from 'react';
import { useCallback } from 'react';
// import Animated, {useSharedValue, useAnimatedStyle, withRepeat, withTiming} from 'react-native-reanimated';
import Carousel, { } from 'react-native-snap-carousel';
// import { TourMediaRender, PureZoneMediaRender } from '../Zones/ZoneDetailScreen';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';
import { NavigationProp } from './TourScreen';
import Video from 'react-native-video';
// import VideoEmbedFullscreen from './VideoEmbedFullscreen'

interface TourGuideProps {
    navigation: NavigationProp,
    zone?: ZoneConsumable,
    snapMapSheet: () => void,
    bottomSheetRef: React.RefObject<BottomSheet>
}
type TourMediaRenderProps = {
    item: Artefact,
    index: number
}

// (property) resizeMode?: "contain" | "stretch" | "none" | "cover" | undefined
enum ResizeMode {
    contain = "contain",
    stretch = "stretch",
    none = "none",
    cover = "cover"
}
export const TourGuide = ({ navigation, snapMapSheet, bottomSheetRef }: TourGuideProps) => {
    const memo = useContext(MemoizedContext);
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);
    const carouselRef = useRef<Carousel<Artefact> | null>(null);

    const currentTourZone = useMemo(() => {
        if (zones.length != 0) {
            return zones[tourState.currGuideZoneIndex];
        }
    }, [tourState.currGuideZoneIndex, zones]);

    // const mainArtefact: Artefact = useMemo(() => {
    //     return item.Artefacts.filter((artefactId) => memo.artefacts[artefactId].Media).map((artefactId) => memo.artefacts[artefactId])[0];
    // }, [memo, item])

    const mediaArtefactList = useMemo(() => {
        if (zones.length == 0) return [];
        return zones.filter(z => z.Artefacts.length > 0).map(z => memo.artefacts[z.Artefacts[0]]);
    }, [memo, zones])


    useEffect(() => {
        carouselRef.current?.snapToItem(tourState.currGuideZoneIndex);
    }, [tourState.currGuideZoneIndex])

    function handleSkip() {
        console.log("Forward");
        // ToastAndroid.show("Skipping", ToastAndroid.SHORT);
        tourDispatch({ type: TourActionName.FORWARD })
        // gravity is for location
        // ToastAndroid.showWithGravity(
        //     "All Your Base Are Belong To Us",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );
    }

    function handleBack() {
        // ToastAndroid.show("Backing", ToastAndroid.SHORT);
        tourDispatch({ type: TourActionName.GOBACK })
    }
    const zoneTourTitleOnPress = () => {
        if (!currentTourZone) return;
        navigation.push("ZoneDetails", { zoneId: currentTourZone.id })
    }
    const [resize, setResize] = useState<string | undefined>(ResizeMode.cover.toString());
        
    function toggleFullscreen() { 
        const resizeMode: ResizeMode = (resize == ResizeMode.cover.toString() ? ResizeMode.contain : ResizeMode.cover);
        setResize(resizeMode.toString());
    }
    const TourMediaRender = ({ item, index }: TourMediaRenderProps) => {
        // This crashes the app (maybe cuz carousel is class)
        // const memo = useContext(MemoizedContext);

        if (!item.Media) return (<></>);
        // delete mainArtefact.thumbnail;

        function handleVideoEnd() {
            console.log("videoEnd");
            if (!(tourState.currGuideZoneIndex < tourState.maxZoneIndex)) {
                snapMapSheet();
                return;
            }
            tourDispatch({ type: TourActionName.FORWARD })
        }



        if (item.Media.type === 1) {
            return (
                <View style={styles.video}>
                    {/* <VideoPlayer
                        // TODO: fullscreen toggle mode customizable
                        source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
                        disableFullScreen={false}
                        disableBack={true}
                        disableVolume={true}
                        tapAnywhereToPause={true}
                        paused={false} //use only for initial pause state
                        // onPause={handlePause}
                        // onPlay={handlePlay}
                        onEnd={handleVideoEnd}
                        fullscreen={true}
                        toggleResizeModeOnFullscreen={false}
                        resizeMode="cover"
                        disableFullscreen
                    /> */}
                    <Video
                        source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
                        style={{flex: 1}}
                        controls={tourState.currGuideZoneIndex == index}
                        paused={tourState.currGuideZoneIndex != index}
                        // @ts-ignore
                        resizeMode={resize}
                        fullscreen={false}
                        onEnd={handleVideoEnd}
                    />
                </View>
            )
        }
        else return (
            <View style={styles.video}>
                <Image
                    style={styles.image}
                    source={{
                        uri: `${MEDIA_URL}/${item.Media.src}`,
                    }} />
                <Text style={styles.textDescr}>{item.description}</Text>
            </View>
        )
    }
    // const PureZoneMediaRender = React.memo(TourMediaRender);


    return (
        <View style={styles.bottomSheetContainer}>
            <Button 
                buttonStyle={{ flex: 1, backgroundColor: "#7A0600", marginRight: 10, padding: 10 }}
                icon={<Icon
                    name="chevron-left"
                    size={20}
                    color="white" />}
                onPress={toggleFullscreen}
            />
            <View style={styles.carouselContainer}>
                {/* <PureZoneMediaRender item={currentArtefactList[0]} index={0} /> */}

                <Carousel
                    data={mediaArtefactList}
                    renderItem={TourMediaRender}
                    // renderItem={ (props: TourMediaRenderProps) => <PureZoneMediaRender {...props}/>}
                    // renderItem={ (props: TourMediaRenderProps) => <><TourMediaRender {...props}/></> }
                    sliderWidth={320}
                    itemWidth={320}
                    scrollEnabled={false}
                    ref={carouselRef}
                />
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
                <Pressable onPress={zoneTourTitleOnPress}>
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
                    disabled={!(tourState.currGuideZoneIndex < tourState.maxZoneIndex)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    controlsContainer: {
        flex: 1,
        padding: 10,
        justifyContent: "center",
        flexDirection: "row",
        alignContent: "stretch",
        alignItems: "flex-end"
    },

    bottomSheetContainer: {
        backgroundColor: "#F3E1C7",
        height: 675,
    },

    carouselContainer: {
        flex: 11,
        alignItems: 'center',
        paddingTop: 20,
    },

    tourContainer: {
        flex: 3,
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 5,
        paddingLeft: "20%",
        paddingRight: "20%",
        backgroundColor: '#A20C02'
    },

    tourName: {
        fontSize: 20,
        color: "#FFFFFF",
        textAlign: 'center',
        fontFamily: 'Roboto'
    },
    textDescr: {
        fontSize: 15,
        paddingBottom: 15,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },

    image: {
        flex: 1,
        height: 450,
        alignItems: 'center',
        borderRadius: 10,
        borderWidth: 10,
    },

    video: {
        flex: 1,
        borderRadius: 10,
        borderWidth: 10,
        // borderColor: '',
    },
})
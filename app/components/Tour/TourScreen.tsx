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
import { ZoneMediaRender, PureZoneMediaRender } from '../Zones/ZoneDetailScreen';
import { NativeViewGestureHandler } from 'react-native-gesture-handler';
import { Easing } from 'react-native-reanimated';


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


const TestRender = ({ item, index }: any) => {
    console.log({ item, index });

    const bigarr = new Array(10).fill(" Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae quod porro hic libero quas sunt dignissimos! Unde perspiciatis, totam distinctio ipsum numquam sapiente rerum cum ab quas autem? Odio, officia.")
    return (
        <>
            <Text >
                {bigarr.map(v => v)}
            </Text>
        </>
    )
}

export const TourGuide = ({ navigation }: TourGuideProps) => {
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
        tourDispatch({ type: TourActionName.FORWARD})
        // gravity is for location
        // ToastAndroid.showWithGravity(
        //     "All Your Base Are Belong To Us",
        //     ToastAndroid.SHORT,
        //     ToastAndroid.CENTER
        // );
    }

    function handleBack() {
        // ToastAndroid.show("Backing", ToastAndroid.SHORT);
        tourDispatch({ type: TourActionName.GOBACK})
    }

    return (
        <View style={styles.bottomSheetContainer}>
            <View style={styles.carouselContainer}>
                {/* <PureZoneMediaRender item={currentArtefactList[0]} index={0} /> */}

                <Carousel
                    data={mediaArtefactList}
                    renderItem={ZoneMediaRender}
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
                    disabled={!((tourState.hasVisited || tourState.currGuideZoneIndex < tourState.maxZoneIndex) && tourState.currGuideZoneIndex < zones.length - 1)}
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
            tourDispatch({ type: TourActionName.VISIT});
            console.log("visited", zones[tourState.maxZoneIndex]);
        }
    }, [currentZone, zones])

    const renderContent = () => (
        <TourGuide
            // zone={currentZone}
            {...props}
        />
    )

    const handlePopUp = () => {
        sheetRef.current?.snapTo(0);
    }

    const zoneTitleOnPress = () => {
        if (!currentZone) return;
        console.log("bruh", { currentZone });

        props.navigation.push("ZoneDetails", { zoneId: currentZone.id })
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
            <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Map currentZone={currentZone} /></Transform>
            {/* <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform> */}
            {/* <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform> */}

            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="map-signs" size={23} color="white" />} />
            <FAB color="#7A0600" onPress={() => transfromRef.current?.resetTransform()} placement="left" icon={<Icon name="map" size={23} color="white" />} />

        </View>

    );
}
export interface MapProps {
    currentZone: ZoneConsumable | undefined,
}

const maxValue = 10;
const minValue = -10;

const Map = (props: MapProps) => {
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);
    // const pulseValue = useRef(new Animated.Value(0));


    // useEffect(() => {
    //     animatedLoop.current.start();
    // }, [zones]);

    return (
        <View>
            {/* {zones.map(z => <View key={z.id} style={[styles.zoneIndicator,
            { width: z.width, height: z.height, left: z.coordX, top: z.coordY },
            { transform: [{ translateX: -(z.width / 2) }, { translateY: -(z.height / 2) }] }
            ]} />)} */}
            {zones.map(z =>
                <ZoneIndicator key={z.id} zone={z} isCurrentZone={false} />
            )}
            <Image onLayout={(e) => console.log(e.nativeEvent.layout)} source={require('./floorplan2.jpg')} />
        </View>
    )
}

export interface ZoneIndicatorProps {
    zone: ZoneConsumable,
    isCurrentZone: boolean
}

export class ZoneIndicator extends React.Component<ZoneIndicatorProps> {
    pulseValue: Animated.Value;
    constructor(props: ZoneIndicatorProps) {
        super(props);
        this.pulseValue = new Animated.Value(0);
        Animated.loop(
            Animated.sequence([
                Animated.timing(this.pulseValue, {
                    toValue: maxValue,
                    duration: 300,
                    useNativeDriver: true,
                    easing: Easing.elastic(1)
                }),
                Animated.timing(this.pulseValue, {
                    toValue: minValue,
                    duration: 300,
                    useNativeDriver: true,
                    easing: Easing.elastic(1)
                }),
                // Animated.timing(this.pulseValue, {
                //     toValue: maxValue,
                //     duration: 100,
                //     useNativeDriver: true
                // }),
                // Animated.timing(this.pulseValue, {
                //     toValue: minValue,
                //     duration: 2000,
                //     useNativeDriver: true
                // })
            ])
        ).start()

    }

    render() {
        return (
            <Animated.View key={this.props.zone.id}
                style={[styles.zoneIndicator,
                { width: this.props.zone.width, height: this.props.zone.height, left: this.props.zone.coordX, top: this.props.zone.coordY },
                // { transform: [{ translateY: -this.props.zone.height / 2 }, { translateX: -(this.props.zone.width / 2) }] }
                { transform: [{ translateY: (Animated.add(-this.props.zone.height / 2, this.pulseValue)) }, { translateX: -(this.props.zone.width / 2) }] }
                ]} />
        )
    }
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

    zoneIndicator: {
        // backgroundColor: "#F3E1C7DD",
        position: 'absolute',
        zIndex: 100,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#7A0600",
    }

});

export default TourScreen;

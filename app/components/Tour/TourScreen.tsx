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
import { TourGuide } from './TourGuide';


export type NavigationProp = StackNavigationProp<TourStackParams>;

type CarouselRenderItemProps = {
    item: Artefact,
    index: number
}

interface TourScreenProps {
    navigation: NavigationProp
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


const TourScreen = (props: { navigation: NavigationProp }) => {
    const beaconList = useContext(TourContext);
    const memo = useContext(MemoizedContext);
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);
    const transfromRef = useRef<Transform>(null);
    const sheetRef = useRef<BottomSheet>(null);

    const currentZone = useMemo(() => {
        const { zones } = memo;
        if (beaconList.length > 0) {
            // React unsorts in intermediate stages such as passing thrrough props
            beaconList.sort((a, b) => b.rssi! - a.rssi!);
            const beacon = beaconList[0];
            const foundZone = zones[beacon.zoneId];
            return foundZone;
        }
        else return null;
    }, [memo, beaconList]);

    useEffect(() => {
        if (zones.length == 0) return;
        const nextZoneIndex = tourState.maxZoneIndex + 1;
        if (nextZoneIndex == zones.length) return;
        if (currentZone?.id == zones[nextZoneIndex].id) {
            tourDispatch({ type: TourActionName.VISIT });
            // Indicate and animate that youve visited the next zone and your video is ready
            ToastAndroid.showWithGravity(
                "Next Media Ready!",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM
            );
            console.log("visited", zones[nextZoneIndex]);
        }
    }, [currentZone, zones])

    const snapMapSheet = () => {
        sheetRef?.current?.snapTo(1);
        transfromRef?.current?.resetTransform();
    }

    const renderContent = () => (
        <TourGuide
            snapMapSheet={snapMapSheet}
            {...props}
        />
    )

    const handlePopUp = () => {
        sheetRef.current?.snapTo(0);
    }

    const zoneTitleOnPress = () => {
        if (!currentZone) return;
        props.navigation.push("ZoneDetails", { zoneId: currentZone.id })
    };

    return (
        <View style={styles.pageContainer}>
            <Pressable onPress={zoneTitleOnPress}>
                <View style={globalStyle.pressableContainer}>
                    <Text style={styles.textName}> {currentZone != null ? currentZone.name : "No Zone Found / Entered"}</Text>
                </View>
            </Pressable>

            <BottomSheet
                ref={sheetRef}
                snapPoints={[675, 450, 0]}
                borderRadius={20}
                // @ts-ignore
                renderContent={renderContent}
            />
            <Transform initialZoom={0.2} initialPos={{ x: 0, y: -240 }} style={styles.transformView} ref={transfromRef}><Map currentZone={currentZone} /></Transform>
            {/* <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform> */}
            {/* <Transform initialZoom={0.3} initialPos={{ x: -150, y: 0 }} style={styles.transformView} ref={transfromRef}><Image source={require('./floorplan.jpg')} /></Transform> */}

            <FAB color="#7A0600" onPress={handlePopUp} placement="right" icon={<Icon name="map-signs" size={23} color="white" />} />
            <FAB color="#7A0600" onPress={() => transfromRef.current?.resetTransform()} placement="left" icon={<Icon name="map" size={23} color="white" />} />

        </View>

    );
}
export interface MapProps {
    currentZone: ZoneConsumable | null,
}

const maxValue = 10;
const minValue = -10;

const Map = (props: MapProps) => {
    const zones = useContext(ZonesContext);
    const [tourState, tourDispatch] = useContext(TourStateContext);
    const canVisitNext = tourState.maxZoneIndex + 1 < zones.length;
    // console.log({ canVisitNext, tourState });

    return (
        <View>
            {zones.map((z, i) =>
                <ZoneIndicator
                    key={z.id}
                    zone={z}
                    isCurrentZone={z.id === props.currentZone?.id}
                    toBeVisited={canVisitNext && tourState.maxZoneIndex + 1 === i}
                />
            )}
            <Image onLayout={(e) => console.log(e.nativeEvent.layout)} source={require('./floorplan2.jpg')} />
        </View>
    )
}

export interface ZoneIndicatorProps {
    zone: ZoneConsumable,
    isCurrentZone: boolean,
    toBeVisited: boolean
}

export class ZoneIndicator extends React.Component<ZoneIndicatorProps> {
    pulseValue: Animated.Value;
    animationComposite: Animated.CompositeAnimation

    constructor(props: ZoneIndicatorProps) {
        super(props);
        this.pulseValue = new Animated.Value(0);

        this.animationComposite = Animated.loop(
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
        );

    }

    componentDidMount() {
        if (this.props.toBeVisited)
            this.animationComposite.start()
    }

    componentDidUpdate(prevProps: ZoneIndicatorProps) {
        if (prevProps.toBeVisited === this.props.toBeVisited) return;

        if (this.props.toBeVisited) {
            this.animationComposite.start();
            console.log("starting tobevisitanim");
        }
        else
            this.animationComposite.stop();
    }

    render() {
        if (!(this.props.isCurrentZone || this.props.toBeVisited)) return <></>
        return (
            <Animated.View key={this.props.zone.id}
                style={[styles.zoneIndicator,
                this.props.isCurrentZone && { borderColor: "green" },
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

    zoneIndicator: {
        // backgroundColor: "#F3E1C7DD",
        position: 'absolute',
        zIndex: 100,
        borderRadius: 10,
        borderWidth: 5,
        borderColor: "#7A0600",
    },
    currentZoneIndicator: {
        borderColor: "blue",

    },

    viewDescr: {
        backgroundColor: '#F7EECA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },
});

export default TourScreen;

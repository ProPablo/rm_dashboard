import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { Artefact, ZoneConsumable } from '@shared/types';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
    Dimensions, FlatList, Image, Pressable,
    StyleSheet, Text, View
} from 'react-native';
import { Card } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import Carousel from 'react-native-snap-carousel';
import { globalStyle } from '../../lib/styles';
import { MemoizedContext } from '../../store';
import { ZoneStackParams } from './ZoneStack';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import { MEDIA_URL } from '../../lib/controllers';
import Video from 'react-native-video';
import { TourActionName, TourStateContext } from '../Tour';

type ZoneStackRoute = RouteProp<ZoneStackParams, 'ZoneDetails'>
type NavigationProp = StackNavigationProp<ZoneStackParams>

interface Props {
    route: ZoneStackRoute,
    navigation: NavigationProp,
}

interface ArtefactProps {
    artefactId: number,
}




const ZoneArtefactsListView = ({ artefactId }: ArtefactProps) => {
    const { artefacts } = useContext(MemoizedContext);
    const [artefact, setArtefact] = useState<Artefact | undefined>(undefined);
    useEffect(() => {
        if (!artefacts) return;
        setArtefact(artefacts[artefactId]);
    })

    return (
        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{artefact?.name}</Card.Title>
                <Text style={[globalStyle.text, globalStyle.cardDescr]}>{artefact?.description}</Text>
                <Card.Image source={{
                    uri: artefact?.thumbnail,
                }} />
            </Card>
        </View>
    )
}

// export const TourMediaRender = ({ item, index }: TourMediaRenderProps) => {
//     // This crashes the app (maybe cuz carousel is class)
//     // const memo = useContext(MemoizedContext);
//     const [tourState, tourDispatch] = useContext(TourStateContext);

//     if (!item.Media) return (<></>);
//     // delete mainArtefact.thumbnail;

//     function handleVideoEnd() {
//         console.log("videoEnd");
//         tourDispatch({ type: TourActionName.FORWARD })

//     }
//     if (item.Media.type === 1) {
//         return (
//             <View style={styles.video}>
//                 <VideoPlayer
//                 // TODO: fullscreen toggle mode customizable
//                     source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
//                     disableFullScreen={false}
//                     disableBack={true}
//                     disableVolume={true}
//                     tapAnywhereToPause={true}
//                     paused={false} //use only for initial pause state
//                     // onPause={handlePause}
//                     // onPlay={handlePlay}
//                     onEnd={handleVideoEnd}
//                     fullscreen={true}
//                     toggleResizeModeOnFullscreen={false}
//                     resizeMode="cover"
//                     disableFullscreen
//                 />
//                 {/* <Video
//                     source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
//                     style={{flex: 1}}
//                     controls={true}
//                 /> */}
//             </View>
//         )
//     }
//     else return (
//         <View style={styles.video}>
//             <Image
//                 style={styles.image}
//                 source={{
//                     uri: `${MEDIA_URL}/${item.Media.src}`,
//                 }} />
//             <Text style={styles.textDescr}>{item.description}</Text>
//         </View>   
//     )
// }
// export const PureZoneMediaRender = React.memo(TourMediaRender);

export const ZoneDetailScreen: React.FC<Props> = ({ route, navigation }) => {
    const { zoneId } = route.params;
    const memo = useContext(MemoizedContext);


    const [zone, setZone] = useState<ZoneConsumable | undefined>(undefined);

    function actionOnRow(item: number) {
        navigation.push("ArtefactDetails", {
            artefactId: item
        })
    };
    useEffect(() => {
        if (!memo.zones) return;
        setZone(memo.zones[+zoneId]);
    }, [memo]);
    
    return (
        <View style={styles.pageContainer}>
            {zone &&
                <FlatList
                    ListHeaderComponent={<View style={styles.viewDescr}>
                        <Text selectable style={styles.textName}> {zone.name}</Text>
                        <Text style={styles.textDescr}>{zone.description}</Text>
                    </View>}
                    data={zone?.Artefacts}
                    renderItem={({ item }) => (
                        <Pressable onPress={() => actionOnRow(item)}>
                            <ZoneArtefactsListView artefactId={item} />
                        </Pressable>
                    )}
                    keyExtractor={(item) => item.toString()}
                />
            }
        </View>
    )
}

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: 'center',
        justifyContent: 'center',
        padding: 10,
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    viewDescr: {
        backgroundColor: '#F7EECA',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
    },

    textDescr: {
        fontSize: 15,
        paddingBottom: 15,
        textAlign: 'center',
        fontFamily: 'Roboto',
    },

    textName: {
        fontSize: 30,
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
        borderColor: 'black',
    },

});

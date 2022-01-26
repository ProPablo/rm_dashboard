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

type ZoneStackRoute = RouteProp<ZoneStackParams, 'ZoneDetails'>
type NavigationProp = StackNavigationProp<ZoneStackParams>

interface Props {
    route: ZoneStackRoute,
    navigation: NavigationProp,
}

interface ArtefactProps {
    artefactId: number,
}

type CarouselRenderItemProps = {
    item: Artefact,
    index: number
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
                <Text style={[globalStyle.text, styles.cardDescr]}>{artefact?.description}</Text>
                <Card.Image source={{
                    uri: artefact?.thumbnail,
                }} />
            </Card>
        </View>
    )
}

export const ZoneMediaRender = ({ item, index }: CarouselRenderItemProps) => {
    if (!item.Media) return (<></>);
    delete item.thumbnail;
    console.log({ item });

    function handleVideoEnd() {
        console.log("videoEnd");
        // if (currentZone) findArtefact(currentZone);
    }


    if (item.Media.type === 1) {
        return (
            <View style={styles.video}>
                <VideoPlayer
                    source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
                    // disableFullScreen={true}
                    disableBack={true}
                    disableVolume={true}
                    tapAnywhereToPause={true}
                    paused={true}
                    // onPause={handlePause}
                    // onPlay={handlePlay}
                    onEnd={handleVideoEnd}
                />
                {/* <Video
                    source={{ uri: `${MEDIA_URL}/${item.Media.src}` }}
                    style={{flex: 1}}
                    controls={true}
                /> */}

            </View>
        )
    }
    else return (
        <Image
            style={styles.image}
            source={{
                uri: `${MEDIA_URL}/${item.Media.src}`,
            }} />
    )
}

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

    const currentArtefactList: Artefact[] = useMemo(() => {
        if (!zone) return [];
        return zone.Artefacts.filter((artefactId) => memo.artefacts[artefactId].Media).map((artefactId) => memo.artefacts[artefactId]);
    }, [memo, zone])

    return (
        <View style={styles.pageContainer}>
            {zone &&
                <FlatList
                    ListHeaderComponent={<View style={styles.viewDescr}>
                        <Text selectable style={styles.textName}> {zone.name}</Text>
                        <Text style={styles.textDescr}>{zone.description}</Text>
                        <Carousel
                            // layout={'stack'}
                            data={currentArtefactList}
                            renderItem={ZoneMediaRender}
                            sliderWidth={320}
                            itemWidth={320}
                        // Use for passing down which video should currently play
                        // extraData={}
                        />
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

    cardDescr: {
        paddingBottom: 10,
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
        flex:1,
        borderRadius: 10,
        borderWidth: 10,
        borderColor: 'black',
    },

});

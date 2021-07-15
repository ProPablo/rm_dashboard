import { RouteProp } from '@react-navigation/native';
import React, { useContext, useEffect, useState } from 'react';
import {
    Dimensions, Image,
    StyleSheet, Text, View
} from 'react-native';
import { globalStyle } from '../../lib/styles';
import { MEDIA_URL } from '../../lib/controllers';
import { ArtefactsContext } from '../../store';
import { ZonesContext } from '../../store';
// import CustomCarousel from './ArtefactDetailCarousel';
// import ArtefactsContext from './ArtefactsContext';
import { ZoneStackParams } from './ZoneStack';
import Icon from 'react-native-vector-icons/FontAwesome';
//import VideoPlayer from '../Home/VideoComponent';
// @ts-ignore
import VideoPlayer from 'react-native-video-controls';
import { Artefact, ArtefactMediaSmall, ZoneConsumable } from '@shared/types';
import { ScrollView } from 'react-native-gesture-handler';


// import VideoTest from '../Home/VideoTest';


type ArtefactStackRoute = RouteProp<ZoneStackParams, 'ArtefactDetails'>

interface Props {
    route: ArtefactStackRoute
}


export const ConditionalMediaRender = (props: { artefactMedia: ArtefactMediaSmall }) => {

    switch (+props.artefactMedia.type) {
        case 0:
            return (
                <View >
                    <Image source={{
                        uri: `${MEDIA_URL}/${props.artefactMedia.src}`,
                    }} style={[styles.image]} />
                </View>
            )
        case 1:
            return (
                <View style={styles.video}>
                    <VideoPlayer
                        source={{ uri: `${MEDIA_URL}/${props.artefactMedia.src}` }}
                        disableFullScreen={true}
                        disableBack={true}
                        disableVolume={true}
                        tapAnywhereToPause={true}
                    />
                </View>
            )
        default:
            return (
                <View><Text>Unknown Type</Text></View>
            )
    }
}

const ArtefactDetailScreen: React.FC<Props> = ({ route }) => {
    const { artefactId } = route.params;
    const artefacts = useContext(ArtefactsContext);
    const zones = useContext(ZonesContext);

    const [imageDimens, setimageDimens] = useState({ width: 0, height: 0 });

    const [artefact, setArtefact] = useState<Artefact | undefined>(undefined);
    const [zone, setZone] = useState<ZoneConsumable | undefined>(undefined);
    useEffect(() => {
        const artefact = artefacts?.find((item) => item.id === artefactId);
        if (artefact) {
            if (artefact.thumbnail) {
                Image.getSize(artefact?.thumbnail, (width, height) => {
                    const newWidth = Math.round(dimensions.width * 5/8);
                    setimageDimens({ width: newWidth, height: height * (newWidth / width) });
                });
            }
        }
        setZone(zones.find((z) => z.id === artefact?.zoneId));
        setArtefact(artefact);

    }, [artefacts, zones]);
   
    return (
        <View style={styles.pageContainer}>

            {artefact &&
                <ScrollView>
                    {artefact.thumbnail &&
                        <View style={[globalStyle.imageShadow]}>
                            <Image source={{
                                uri: artefact.thumbnail,
                            }} style={[imageDimens, styles.image]} />
                        </View>
                    }
                    <View style={[styles.viewDescr]}>
                        <Text selectable style={styles.textName}> {artefact.name}</Text>
                        <Text style={styles.textDescr}>{artefact.description}</Text>
                        <Text style={styles.textDescr}>{artefact.name} is located in {zone?.name} and was acquired on {new Date(artefact?.acquisitionDate).toDateString()}</Text>
                    </View>
                    {artefact.Media &&
                        <ConditionalMediaRender artefactMedia={artefact.Media} />
                    }
                </ScrollView>
            }
        </View>
    )
}

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: 'center',
        padding: 10,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    image: {
        flex: 1,
        width: Math.round(dimensions.width * 15 / 16),
        borderRadius: 10,
        marginBottom: 10,
    },

    video: {
        height: 450,
        borderRadius: 10,
        borderWidth: 10, 
        borderColor: 'black'
    },

    textName: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    textDescr: {
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    viewDescr: {
        backgroundColor: '#FDF3BF',
        paddingTop: 15,
    }
});

export default ArtefactDetailScreen;
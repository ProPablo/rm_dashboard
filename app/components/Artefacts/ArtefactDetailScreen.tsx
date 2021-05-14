import { RouteProp } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    Dimensions, Image,
    StyleSheet, Text, View
} from 'react-native';
import { globalStyle } from '../../lib/styles';
import { MEDIA_URL } from '../../lib/controllers';
import { ArtefactsContext } from '../../store';
// import CustomCarousel from './ArtefactDetailCarousel';
// import ArtefactsContext from './ArtefactsContext';
import { ArtefactStackParams } from './ArtefactStack';
import Icon from 'react-native-vector-icons/FontAwesome';
import VideoPlayer from '../Home/VideoComponent';
import { ArtefactMediaSmall } from '@shared/types';
import { ScrollView } from 'react-native-gesture-handler';
// import VideoTest from '../Home/VideoTest';


type ArtefactStackRoute = RouteProp<ArtefactStackParams, 'ArtefactDetails'>

interface Props {
    route: ArtefactStackRoute
}


export const ConditionalMediaRender = (props: { artefactMedia: ArtefactMediaSmall }) => {
    // if (!props) return (
    //     <Text>Does not exist</Text>
    // )

    switch (+props.artefactMedia.type) {
        case 0:
            return (
                <View >
                    <Image source={{
                        uri: `${MEDIA_URL}/${props.artefactMedia.src}`,
                    }} style={[styles.image]} />
                </View>
            )// http://192.168.0.130:3001/public\beast-1620568996607.mp4
        case 1:
            return (
                <View style={styles.video}>
                    {/* <VideoPlayer src={`http://192.168.0.130:3001/public/beast-1620568996607.mp4`} /> */}
                    <VideoPlayer src={`${MEDIA_URL}/${props.artefactMedia.src}`} />
                </View>
            )
        default:
            return (
                <div>Unknown Type</div>
            )
    }
}

const ArtefactDetailScreen: React.FC<Props> = ({ route }) => {
    const { artefactId } = route.params;
    const artefacts = useContext(ArtefactsContext);

    //console.log("artefacts from deatil scrren", artefacts);
    const artefact = artefacts?.find((item) => item.id === artefactId);
    return (
        <View style={styles.pageContainer}>

            {artefact &&
                <ScrollView>
                    <View style={[globalStyle.imageShadow, globalStyle.shadow]}>
                        <Image source={{
                            uri: artefact.thumbnail,
                        }} style={[styles.image]} />
                    </View>

                    <Text style={styles.textName}> {artefact.name}</Text>
                    <Text style={styles.textDescr}>{artefact.description}</Text>
                    <Text style={styles.textDescr}>{artefact.acquisitionDate}</Text>
                    <Text style={styles.textDescr}>{artefact.zoneid}</Text>
                    <ConditionalMediaRender artefactMedia={artefact.Media} />
                </ScrollView>
            }
            {/* <CustomCarousel
                artefactInfos={artefact?.Infos}
                artefactName={artefact?.Name}
            /> */}
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
        width: Math.round(dimensions.width * 15 / 16),
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    video: {
        height: 450,
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
});

export default ArtefactDetailScreen;
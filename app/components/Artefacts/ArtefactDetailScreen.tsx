import { RouteProp } from '@react-navigation/native';
import React, { useContext } from 'react';
import {
    Dimensions, Image,
    StyleSheet, Text, View
} from 'react-native';
import { globalStyle } from '../../lib/Styles';
import { ArtefactsContext } from '../../stores';
// import CustomCarousel from './ArtefactDetailCarousel';
// import ArtefactsContext from './ArtefactsContext';
import { ArtefactStackParams } from './ArtefactStack';


type ArtefactStackRoute = RouteProp<ArtefactStackParams, 'ArtefactDetails'>

interface Props {
    route: ArtefactStackRoute
}

const ArtefactDetailScreen: React.FC<Props> = ({ route }) => {
    const { artefactId } = route.params;
    const artefacts = useContext(ArtefactsContext);

    //console.log("artefacts from deatil scrren", artefacts);
    const artefact = artefacts?.find((item) => item.id === artefactId);
    return (
        <View style={styles.pageContainer}>

            {artefact &&
                <View>
                    <View style={[globalStyle.imageShadow, globalStyle.shadow]}>
                        <Image source={{
                            uri: artefact.thumbnail,
                        }} style={[styles.image]} />
                    </View>

                    <Text style={styles.textName}> {artefact.name}</Text>
                    <Text style={styles.textDescr}>{artefact.description}</Text>
                    <Text style={styles.textDescr}>{artefact.acquisitionDate}</Text>
                    <Text style={styles.textDescr}>{artefact.zoneid}</Text>
                </View>
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
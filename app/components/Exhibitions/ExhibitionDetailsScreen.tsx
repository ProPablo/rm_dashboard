import React, { useContext, useEffect, useState } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ExhibitionStackParams } from './ExhibitionStack';
import { ExhibitionsContext } from '../../store';
import { globalStyle } from '../../lib/styles';
import { Exhibition } from '@shared/types';

type ExhibitionStackRoute = RouteProp<ExhibitionStackParams, 'ExhibitionDetailScreen'>

interface Props {
    route: ExhibitionStackRoute
}


const ExhibitionDetailScreen: React.FC<Props> = ({ route }) => {
    const { exhibitionId } = route.params;
    const exhibitions = useContext(ExhibitionsContext);

    const [imageDimens, setimageDimens] = useState({ width: 0, height: 0 });
    const [exhibition, setExhibition] = useState<Exhibition | undefined>(undefined);

    useEffect(() => {
        const exhibition = exhibitions?.find((item) => item.id === exhibitionId);
        if (exhibition) {
            if (exhibition.thumbnail) {
                Image.getSize(exhibition?.thumbnail, (width, height) => {
                    const newWidth = Math.round(dimensions.width * 5/8);
                    setimageDimens({ width: newWidth, height: height * (newWidth / width) });
                });
            }
        }
        setExhibition(exhibition);

    }, [exhibitions]);

    return (
        <View style={styles.pageContainer}>

            {exhibition &&
                <ScrollView>
                    
                    <View style={[styles.viewDescr]}>
                        <Text selectable style={styles.textName}> {exhibition.name}</Text>
                            {exhibition.thumbnail &&
                                <View style={[globalStyle.imageShadow]}>
                                    <Image source={{
                                        uri: exhibition.thumbnail,
                                    }} style={[imageDimens, styles.image]} />
                                </View>
                            }
                        <Text selectable style={styles.textDescr}>{exhibition.description}</Text>
                        <Text selectable style={styles.textDescr}>The {exhibition.name} ran from {new Date(exhibition?.startDate).toDateString()} to {new Date(exhibition?.finishDate).toDateString()}</Text>
                    </View>
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
        paddingBottom: 0,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    viewDescr: {
        paddingTop: 15,
    },

    textName: {
        fontSize: 27,
        marginBottom: 15,
        padding: 7,  
        textAlign: 'center',
        fontFamily: 'Roboto',
        borderRadius: 5,
        backgroundColor: '#E2C9A2',
    },

    textDescr: {
        padding: 10,
        fontSize: 15,
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    image: {
        flex: 1,
        width: Math.round(dimensions.width * 15 / 16),
        borderRadius: 10,
        marginBottom: 10,
    },
});

export default ExhibitionDetailScreen;
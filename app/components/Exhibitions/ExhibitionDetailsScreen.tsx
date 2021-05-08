import React, { useContext } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { ExhibitionStackParams } from './ExhibitionStack';
import { ExhibitionsContext } from '../../store';

type ExhibitionStackRoute = RouteProp<ExhibitionStackParams, 'ExhibitionDetailScreen'>

interface Props {
    route: ExhibitionStackRoute
}


const ExhibitionDetailScreen: React.FC<Props> = ({ route }) => {

    const { exhibitionId } = route.params;
    const exhibitions = useContext(ExhibitionsContext);
    const exhibition = exhibitions?.find((item) => item.id === exhibitionId);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Exhibition Details!</Text>
            <Text>This is id: {exhibitionId}</Text>
            {exhibition &&
                <View>
                    <Text> {exhibition.name}</Text>
                    <Image source={{
                        uri: exhibition.thumbnail, 
                    }} style={styles.image} />
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    image: {
        width: 50,
        height: 50
    }
});

export default ExhibitionDetailScreen;
import React, { useContext } from 'react';

import {
    View,
    Text,
    Image,
    StyleSheet
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StoreStackParams } from './StoreStack';
import { StoreItemsContext } from '../../store';

type StoreStackRoute = RouteProp<StoreStackParams, 'StoreDetailScreen'>

interface Props {
    route: StoreStackRoute
}


const StoreDetailScreen: React.FC<Props> = ({ route }) => {

    const { storeId } = route.params;
    const storeItems = useContext(StoreItemsContext);
    const storeItem = storeItems.find((item) => item.id === storeId);
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>Store Details!</Text>
            <Text>This is id: {storeId}</Text>
            {storeItem &&
                <View>
                    <Text> {storeItem.name}</Text>
                    <Image source={{
                        uri: storeItem.thumbnail, 
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

export default StoreDetailScreen;
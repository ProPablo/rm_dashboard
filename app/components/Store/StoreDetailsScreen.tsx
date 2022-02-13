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
import { StoreStackParams } from './StoreStack';
import { StoreItemsContext } from '../../store';
import { StoreItem } from '@shared/types';
import { globalStyle } from '../../lib/styles';

type StoreStackRoute = RouteProp<StoreStackParams, 'StoreDetailScreen'>

interface Props {
    route: StoreStackRoute
}


const StoreDetailScreen: React.FC<Props> = ({ route }) => {

    const { storeId } = route.params;
    const storeItems = useContext(StoreItemsContext);
    const [imageDimens, setimageDimens] = useState({ width: 0, height: 0 });
    const [storeItem, setStoreItem] = useState<StoreItem | undefined>(undefined);

    useEffect(() => {
        const storeItem = storeItems?.find((item) => item.id === storeId);
        if (storeItem) {
            if (storeItem.thumbnail) {
                Image.getSize(storeItem?.thumbnail, (width, height) => {
                    const newWidth = Math.round(dimensions.width * 5/8);
                    setimageDimens({ width: newWidth, height: height * (newWidth / width) });
                });
            }
        }
        setStoreItem(storeItem);

    }, [storeItems]);

    return (
        <View style={styles.pageContainer}>

            {storeItem &&
                <ScrollView>
                    
                    <View style={[styles.viewDescr]}>
                        <Text selectable style={styles.textName}> {storeItem.name}</Text>
                            {storeItem.thumbnail &&
                                <View style={[globalStyle.imageShadow]}>
                                    <Image source={{
                                        uri: storeItem.thumbnail,
                                    }} style={[imageDimens, styles.image]} />
                                </View>
                            }
                        <Text selectable style={styles.textDescr}>{storeItem.description}</Text>
                        <Text selectable style={styles.textDescr}>{storeItem.name} costs ${storeItem.cost} and is currently {storeItem.inStock ? 'in stock' : 'not in stock'}</Text>
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

export default StoreDetailScreen;
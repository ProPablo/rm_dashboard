import { StoreItem } from '@shared/types';
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { globalStyle } from '../../lib/styles';
import { StoreItemsContext } from '../../store';


interface Props {
    store: StoreItem,
}

const StoreListView = ({ store }: Props) => {
    const storeItems = useContext(StoreItemsContext);
    // console.log("Logging store", storeItems);
    return (

        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{store.name}</Card.Title>
                <Text style={[globalStyle.text, globalStyle.cardDescr]}>{store.description}</Text>
                <Card.Image style={globalStyle.image} source={{
                    uri: store.thumbnail,
                }}/>
            </Card>

        </View>
    )
}

export default StoreListView;


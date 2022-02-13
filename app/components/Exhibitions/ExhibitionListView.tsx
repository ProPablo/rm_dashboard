import { Exhibition } from '@shared/types';
import React, { useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { event } from 'react-native-reanimated';
import { globalStyle } from '../../lib/styles';


interface Props {
    exhibition: Exhibition,
}

const ExhibitionListView = ({ exhibition }: Props) => {
    return (
        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{exhibition.name}</Card.Title>
                <Text style={[globalStyle.text, globalStyle.cardDescr]}>{exhibition.description}</Text>
                <Card.Image style={globalStyle.image} source={{
                    uri: exhibition.thumbnail,
                }}/>
            </Card>
        </View>
    )
}

export default ExhibitionListView;

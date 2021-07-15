import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { globalStyle } from '../../lib/styles';
import { ZoneConsumable } from '@shared/types';

interface Props {
    zone: ZoneConsumable
}

const ZoneListView = ({ zone }: Props) => {
    return (
        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{zone.name}</Card.Title>
                <Text style={globalStyle.text}>{zone.description}</Text>
            </Card>
        </View>
    )
}


export default ZoneListView;

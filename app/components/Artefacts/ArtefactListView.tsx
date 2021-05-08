import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements';
import { globalStyle } from '../../lib/styles';
import { Artefact } from '@shared/types';

interface Props {
    artefact: Artefact
}

const ArtefactListView = ({ artefact }: Props) => {
    return (
        
        <View style={globalStyle.listItem}>
            <Card containerStyle={globalStyle.containerStyle} wrapperStyle={globalStyle.wrapperStyle}>
                <Card.Title style={globalStyle.text}>{artefact.name}</Card.Title>
                <Text style={globalStyle.text}>{artefact.description}</Text>
                <Card.Divider />
                <Card.Image source={{
                    uri: artefact.thumbnail, 
                }}/>

            </Card>

        </View>
    )
}


export default ArtefactListView;

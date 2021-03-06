import React from 'react'
import { StyleSheet } from 'react-native';
import { Image } from "react-native"

export function HeaderIcon() {
    return (
        <Image
            source={{ uri: 'https://www.redlandmuseum.org.au/wp-content/uploads/2012/10/redland-museum-logo-wide.png' }}
            style={{ width: 300, height: 50, marginLeft: 15 }} />
    );
}
export const globalStyle = StyleSheet.create({
    shadow: {
        // this is for iOS
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        // this is for Android
        elevation: 4,
    },

    image: {
        borderRadius: 10,
    },

    video: {
        height: 450,
        borderRadius: 10,
        borderWidth: 10, 
        borderColor: 'black'
    },

    imageShadow: {
        borderColor: '#000'
    },

    listItem: {
        padding: 2,
        margin: 2,
    },

    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto',
    },

    containerStyle: {
        borderRadius: 7,
        backgroundColor: '#A20C02',
        borderColor: '#A20C02',
    },

    pressableContainer: {
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#555C77'
    },

    cardDescr: {
        paddingBottom: 10,
    },

    wrapperStyle: {

    }
})


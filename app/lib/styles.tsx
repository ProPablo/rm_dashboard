
import React from 'react'
import { StyleSheet } from 'react-native';
import { Image } from "react-native"

export function ActionBarIcon() {
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

    imageShadow: {
        borderColor: '#000',
        borderRadius: 20,
    },

    listItem: {
        padding: 2,
        margin: 2,
    },

    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    containerStyle: {
        borderRadius: 10,
        backgroundColor: '#A20C02',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 5,
        elevation: 4,
    },

    wrapperStyle: {

    }
})


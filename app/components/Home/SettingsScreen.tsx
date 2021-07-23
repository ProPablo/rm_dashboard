import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Dimensions, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HomeStackParams } from './HomeStack';
import { globalStyle } from '../../lib/styles'
import { GlobalActionContext } from '../../store';
import { Switch } from 'react-native-gesture-handler';

type NavigationProp = StackNavigationProp<HomeStackParams>

interface Props {
    navigation: NavigationProp
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    function handleTourEnable() {
        console.log("Enabling tour functionality, starting bluetooth");
    }
    return (
        <ScrollView
            style={styles.pageContainer}>
            <View>
                <Card.Title style={styles.cardTitleText}>{"Settings"}</Card.Title>
                <View style={styles.settingsContainer}>
                    <Text style={styles.titleText}>Toggle Zone Autoplay</Text>
                    <Switch style={styles.switch}></Switch>
                </View>
                <View style={styles.settingsContainer}>
                    <Text style={styles.titleText}>Enable Touring Permissions Access</Text>
                    <Switch style={styles.switch}></Switch>
                </View>
                <Pressable onPress={handleTourEnable}>
                    <View style={globalStyle.zoneContainer}>
                        <Text style={styles.settingsText}>Refresh</Text>
                    </View>
                </Pressable>
                <Pressable onPress={handleTourEnable}>
                    <View style={globalStyle.zoneContainer}>
                        <Text style={styles.settingsText}>Restart Tour</Text>
                    </View>
                </Pressable>

            </View>
            <Card containerStyle={styles.aboutContainer}>
                <Card.Title style={styles.cardTitleText}>{"About"}</Card.Title>
                <Text style={styles.titleText}>Developer Contact Details</Text>
                <View style={styles.textContainer}>
                    <Text style={styles.subTitleText}>Anhad Ahuja</Text>
                    <Text style={styles.bodyText}>anhadrs@gmail.com</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text style={styles.subTitleText}>Tyrone Nolasco</Text>
                    <Text style={styles.bodyText}>tyronewessnolasco@gmail.com</Text>
                </View>
            </Card>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: "center",
        padding: 10,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    textContainer: {
        padding: 10
    },

    switch: {
        flex: 1,
        flexDirection: 'row'
    },

    settingsContainer: {
        flex: 1,
        flexDirection: 'row',
        padding: 10
    },

    settingsText: {
        fontSize: 20,
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    cardTitleText: {
        paddingTop: 10,
        fontSize: 27,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
        // fontStyle: 'italic',
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    subTitleText: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    bodyText: {
        fontSize: 17,
        color: '#000',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    aboutContainer: {
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#D5B986',
    },
});

export default HomeScreen;

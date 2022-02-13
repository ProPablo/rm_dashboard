import { StackNavigationProp } from '@react-navigation/stack';
import React, { useContext } from 'react';
import { Button, Dimensions, Image, Pressable, RefreshControl, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Card } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import { HomeStackParams } from './HomeStack';
import { globalStyle } from '../../lib/styles'
import { GlobalActionContext } from '../../store';

type NavigationProp = StackNavigationProp<HomeStackParams>

interface Props {
    navigation: NavigationProp
}

const wait = (timeout: number) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

const HomeScreen: React.FC<Props> = ({ navigation }) => {
    const global = useContext(GlobalActionContext);
    const onRefresh = React.useCallback(() => {
        global.reload();
    }, []);

    function tourActionOnPress() {
        navigation.navigate('Tour', { screen: 'TourScreen' });
    }

    return (
        <>
            <ScrollView
                style={styles.pageContainer}
                refreshControl={
                    <RefreshControl
                        // @ts-ignore
                        refreshing={global.isLoading}
                        onRefresh={onRefresh} />
                }>
                <Card.Title style={styles.titleText}>{"Display Information \nand Guidance System"}</Card.Title>

                {/* <Card containerStyle={[styles.eventContainerStyle, globalStyle.shadow]} wrapperStyle={styles.wrapperStyle}>
                    <Card.Title style={styles.text}>{"EVENT_NAME"}</Card.Title>
                    <Text style={styles.text}>{"EVENT_DESCRIPTION"}</Text>
                    <Button title="Learn More" onPress={actionOnPress} color="#A20C02" />
                </Card> */}
                <Image
                    source={require('../../lib/homeimg.jpg')}
                    style={styles.image} />
                <Pressable onPress={tourActionOnPress}>
                    <Card containerStyle={[styles.tourStartContainer, globalStyle.shadow]} wrapperStyle={styles.wrapperStyle}>
                        <Card.Title style={styles.text}>{"Start Tour"}</Card.Title>
                        <Icon style={{ alignSelf: "center" }} name="play" size={50} color="white" />
                    </Card>
                </Pressable>
            </ScrollView>
        </>
    );
}

const dimensions = Dimensions.get('window');

const styles = StyleSheet.create({
    pageContainer: {
        alignContent: "center",
        padding: 10,
        flex: 1,
        backgroundColor: '#F7EECA',
    },

    image: {
        width: Math.round(dimensions.width * 15 / 16),
        height: Math.round(dimensions.height * 15 / 30),
        borderRadius: 10
    },

    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    titleText: {
        paddingTop: 10,
        fontSize: 27,
        color: '#262F40',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    eventContainer: {
        borderRadius: 10,
        backgroundColor: '#A20C02',
    },

    tourStartContainer: {
        alignItems: "center",
        borderRadius: 10,
        backgroundColor: '#79C062',
    },

    wrapperStyle: {

    }
});

export default HomeScreen;

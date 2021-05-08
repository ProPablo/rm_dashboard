import { StackNavigationProp } from '@react-navigation/stack';
import React, { useRef } from 'react';
import {
    Button,
    Image, StyleSheet, View
} from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import { HomeStackParams } from './HomeStack';
import Transform from './Transform';
// import VideoComponent from './VideoComponent';

type NavigationProp = StackNavigationProp<HomeStackParams>


interface Props {
    navigation: NavigationProp
}

const TourScreen: React.FC<Props> = ({ navigation }) => {

    const renderContent = () => (
        <View
            style={{
                backgroundColor: 'white',
                padding: 16,
                height: 450,
            }}
        >
            {/* <VideoComponent /> */}
        </View>
    );

    const sheetRef = useRef(null);
    return (
        <View style={styles.containerStyle}>
            {/* <Button title="Open POGGUM Sheet" onPress={() => sheetRef.current?.snapTo(0)} /> */}
            <BottomSheet
                ref={sheetRef}
                snapPoints={[450, 300, 0]}
                borderRadius={10}
                renderContent={renderContent}
            />
            <Transform><Image source={require('./floorplan.jpg')}/></Transform>
            
        </View>
    );
}

const styles = StyleSheet.create({
    listItem: {
        padding: 2,
        margin: 2,
    },

    image: {
    },
    text: {
        color: '#fff',
        textAlign: 'center',
        fontFamily: 'Roboto'
    },

    containerStyle: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },

    wrapperStyle: {

    }
});

export default TourScreen;

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import TourScreen, { BeaconVideo } from "./TourScreen";
import { ActionBarIcon } from '../../lib/styles';

export type HomeStackParams = {
    HomeScreen: undefined;
    TourScreen: undefined;
}

const Stack = createStackNavigator<HomeStackParams>();

export const HomeStack: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            {/* @ts-ignore */}
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerLeft: props => <ActionBarIcon />
                }} />
            {/* @ts-ignore */}
            <Stack.Screen name="TourScreen" component={BeaconVideo} />
        </Stack.Navigator>
    )
}

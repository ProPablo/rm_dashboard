import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import TourScreen from "../Tour/TourScreen";
import { HeaderIcon } from '../../lib/styles';

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
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerLeft: props => <HeaderIcon />
                }} />
            <Stack.Screen name="TourScreen" component={TourScreen} />
        </Stack.Navigator>
    )
}

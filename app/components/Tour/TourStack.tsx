import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TourScreen from './TourScreen';

import { HeaderIcon } from '../../lib/styles';
import { ZoneDetailScreen } from '../Zones/ZoneDetailScreen';
import ArtefactDetailScreen from '../Zones/ArtefactDetailScreen';
import { Button } from 'react-native';

export type TourStackParams = {
    // Artefacts: {screen: string, params: {artefactId: number | string} },
    ArtefactDetails: { artefactId: number | string },
    ZoneDetails: { zoneId: number | string },
    // Zones: { screen: string, params: { zoneId: number | string } },
    TourScreen: undefined,
}

const Stack = createStackNavigator<TourStackParams>();

export const TourStack: React.FC = () => {
    // Detatch makes it so that other screen is rendered in the background
    return (
        <Stack.Navigator screenOptions={{}}>
            <Stack.Screen options={{ headerShown: false,  }} name="TourScreen" component={TourScreen} />
            <Stack.Screen options={{ detachPreviousScreen: false, headerTitle: "" }} name="ZoneDetails" component={ZoneDetailScreen} />
            <Stack.Screen 
                options={{ 
                    headerTitle: "", 
                    // headerRight: () => (
                    //     <Button
                    //       onPress={() => console.log("swag")}
                    //       title="Info"
                    //       color="#fff"
                    //     />
                    // ),
                }} 
                name="ArtefactDetails" component={ArtefactDetailScreen} />
        </Stack.Navigator>
    )
}

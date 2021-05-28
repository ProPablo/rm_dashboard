import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TourScreen from './TourScreen';

import { HeaderIcon } from '../../lib/styles';
import ArtefactDetailScreen from '../Artefacts/ArtefactDetailScreen';

export type TourStackParams = {
    TourScreen: undefined,
    ArtefactDetails: { artefactId: number | string },
}

const Stack = createStackNavigator<TourStackParams>();

export const TourStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}>
            <Stack.Screen name="TourScreen" component={TourScreen} />
            <Stack.Screen name="ArtefactDetails" component={ArtefactDetailScreen} />
        </Stack.Navigator>
    )
}

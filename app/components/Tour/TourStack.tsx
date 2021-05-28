import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import TourScreen from './TourScreen';

import { HeaderIcon } from '../../lib/styles';
import ArtefactDetailScreen from '../Artefacts/ArtefactDetailScreen';

export type TourStackParams = {
    Artefacts: {screen: string, params: {artefactId: number | string} },
    // ArtefactDetails: { artefactId: number | string },
    TourScreen: undefined,
}

const Stack = createStackNavigator<TourStackParams>();

export const TourStack: React.FC = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen options={{headerShown: false}} name="TourScreen" component={TourScreen} />
            {/* <Stack.Screen name="ArtefactDetails" component={ArtefactDetailScreen} /> */}
        </Stack.Navigator>
    )
}

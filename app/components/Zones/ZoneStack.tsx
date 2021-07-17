import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ArtefactDetailsScreen from "./ArtefactDetailScreen";
import ZonesScreen from './ZonesScreen';
import { Image } from 'react-native-elements';
import { HeaderIcon } from '../../lib/styles';
import { ZoneDetailScreen } from './ZoneDetailScreen';

export type ZoneStackParams = {
    ZonesScreen: undefined;
    ZoneDetails: { zoneId: number | string };
    ArtefactDetails: { artefactId: number | string };
}

const Stack = createStackNavigator<ZoneStackParams>();

export const ZoneStack: React.FC = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            <Stack.Screen name="ZonesScreen" component={ZonesScreen}
                options={{
                    headerLeft: props => <HeaderIcon />
                }} />
            <Stack.Screen name="ZoneDetails" component={ZoneDetailScreen} />
            <Stack.Screen name="ArtefactDetails" component={ArtefactDetailsScreen} />
        </Stack.Navigator>
    )
}

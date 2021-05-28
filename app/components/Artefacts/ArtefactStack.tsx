import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ArtefactDetailsScreen from "./ArtefactDetailScreen";
import ArtefactsScreen from './ArtefactsScreen';
import { Image } from 'react-native-elements';
import { HeaderIcon } from '../../lib/styles';

export type ArtefactStackParams = {
    ArtefactsScreen: undefined;
    ArtefactDetails: { artefactId: number | string };
}

const Stack = createStackNavigator<ArtefactStackParams>();

export const ArtefactStack: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            <Stack.Screen name="ArtefactsScreen" component={ArtefactsScreen}
                options={{
                    headerLeft: props => <HeaderIcon/>
                }} />
            <Stack.Screen name="ArtefactDetails" component={ArtefactDetailsScreen}/>
        </Stack.Navigator>
    )
}

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import ExhibitionDetailScreen from "./ExhibitionDetailsScreen";
import ExhibitionScreen from './ExhibitionScreen';
import { HeaderIcon } from '../../lib/styles';

export type ExhibitionStackParams = {
    ExhibitionScreen: undefined;
    ExhibitionDetailScreen: { exhibitionId: number | string };
}


const Stack = createStackNavigator<ExhibitionStackParams>();

export const ExhibitionStack: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            <Stack.Screen name="ExhibitionScreen" component={ExhibitionScreen}
                options={{
                    headerLeft: props => <HeaderIcon/>
                }} />
            <Stack.Screen name="ExhibitionDetailScreen" component={ExhibitionDetailScreen} />
        </Stack.Navigator>
    )
}

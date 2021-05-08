import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import StoreDetailScreen from "./StoreDetailsScreen";
import StoreScreen from './StoreScreen';
import { ActionBarIcon } from '../../lib/styles';
export type StoreStackParams = {
    StoreScreen: undefined;
    StoreDetailScreen: { storeId: number | string };
}


const Stack = createStackNavigator<StoreStackParams>();

export const StoreStack: React.FC = () => {
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            <Stack.Screen name="StoreScreen" component={StoreScreen}
                options={{
                    headerLeft: props => <ActionBarIcon />
                }} />
            <Stack.Screen name="StoreDetailScreen" component={StoreDetailScreen} />
        </Stack.Navigator>
    )
}

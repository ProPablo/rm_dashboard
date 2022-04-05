import React from 'react'
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import HomeScreen from './HomeScreen';
import TourScreen from "../Tour/TourScreen";
import { HeaderIcon } from '../../lib/styles';
import { FAB } from 'react-native-elements/dist/buttons/FAB';
import { Icon } from 'react-native-elements';
import SettingsScreen from './SettingsScreen';
import BeaconDebugScreen from './BeaconDebugScreen';

export type HomeStackParams = {
    Tour: {screen: string},
    Settings: {screen: string},
    HomeScreen: undefined,
    BeaconDebug: {screen: string},
}

type NavigationProp = StackNavigationProp<HomeStackParams>

interface Props {
    navigation: NavigationProp,
}

const Stack = createStackNavigator<HomeStackParams>();

export const HomeStack: React.FC<Props> = (props) => {
    function actionOnPress () {
        props.navigation.navigate('Settings', { screen: 'SettingsScreen' });

    }
    return (
        <Stack.Navigator 
            screenOptions={{
                headerTitle: ""
            }}>
            {/* TODO: make back button that navigates back to  */}
            <Stack.Screen name="HomeScreen" component={HomeScreen}
                options={{
                    headerLeft: props => <HeaderIcon />,
                    headerRight: () => (
                        <FAB size='small' color="#7A0600" onPress={actionOnPress} style={{padding: 20}} icon={<Icon name="info" size={24} color="white" />}/>
                    ) 
                }} />
            <Stack.Screen name="Settings" component={SettingsScreen}/>
            <Stack.Screen name="BeaconDebug" component={BeaconDebugScreen}/>


        </Stack.Navigator>
    )
}

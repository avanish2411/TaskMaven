import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import Calendar from '../Screens/Calendar';
import Profile from '../Screens/Profile';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Tasks from 'react-native-vector-icons/FontAwesome5';
import Dates from 'react-native-vector-icons/AntDesign';
import User from 'react-native-vector-icons/MaterialCommunityIcons';
import Register from '../Authentication/Register';
import Login from '../Authentication/Login';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const Main = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name='Home' component={HomeScreen} options={{
                tabBarLabel: "Home",
                tabBarLabelStyle: { color: "#7CB9E8" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Tasks name='tasks' color='#7CB9E8' size={24} />
                    ) : (
                        <Tasks name='tasks' color='black' size={24} />
                    )
            }} />
            <Tab.Screen name='Calendar' component={Calendar} options={{
                tabBarLabel: "Calendar",
                tabBarLabelStyle: { color: "#7CB9E8" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <Dates name='calendar' color='#7CB9E8' size={24} />
                    ) : (
                        <Dates name='calendar' color='black' size={24} />
                    )
            }} />
            <Tab.Screen name='Profile' component={Profile} options={{
                tabBarLabel: "Profile",
                tabBarLabelStyle: { color: "#7CB9E8" },
                headerShown: false,
                tabBarIcon: ({ focused }) =>
                    focused ? (
                        <User name='account-details' color='#7CB9E8' size={24} />
                    ) : (
                        <User name='account-details' color='black' size={24} />
                    )
            }} />
        </Tab.Navigator>
    )
}

const AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Register' component={Register} />
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen name='Main' component={Main} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation;

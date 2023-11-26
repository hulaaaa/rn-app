import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';  // Змінено імпорт
import {createNativeStackNavigator} from "@react-navigation/native-stack"
import { NavigationContainer, useNavigation, useRoute } from "@react-navigation/native";
import MainScreen from "./Main";
import Profile from "./Profile";
import Login from './Login';
import Welcome from './Welcome';

const Stack = createNativeStackNavigator();

export const Navigation = () => {
    return(
        <NavigationContainer>
            <Stack.Navigator screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={Welcome}/>
                <Stack.Screen name="Login" component={Login}/>
                <Stack.Screen name="Main" component={MainScreen}/>
                <Stack.Screen name="Profile" component={Profile}/>
            </Stack.Navigator>
        </NavigationContainer>
    )
}
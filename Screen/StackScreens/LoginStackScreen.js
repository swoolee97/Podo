import React, { useState, useEffect } from "react"
import { Button } from "react-native"

import HomeScreen from "../HomeScreen"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import RegisterGifticon from "../../RegisterGifticon"
import LoginScreen from "../AuthStackScreens/LoginScreen"
import RegisterScreen from "../AuthStackScreens/RegisterScreen"
const Stack = createStackNavigator()

const LoginStackScreen = ({ navigation, route }) => {
    // React.useLayoutEffect(() => {
    //     const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen'
    //     if (routeName != 'HomeScreen') {
    //         navigation.setOptions({ tabBarStyle: { display: 'none' } })
    //     } else {
    //         navigation.setOptions({ tabBarStyle: { display: undefined } })
    //     }
    // }, [navigation, route])
    return (
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name='LoginScreen' component={LoginScreen} ></Stack.Screen>
            <Stack.Screen name='RegisterScreen' component={RegisterScreen} ></Stack.Screen>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{}}></Stack.Screen>
        </Stack.Navigator>
    )
}

export default LoginStackScreen;
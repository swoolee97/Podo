import { createStackNavigator } from "@react-navigation/stack"
import React, { useState } from "react"
import LoginScreen from "../AuthStackScreens/LoginScreen"
import RegisterScreen from "../AuthStackScreens/RegisterScreen"

const AuthStackScreen = ({}) => {
    const Stack = createStackNavigator()

    return (
        
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component = {LoginScreen} options={{ headerShown: false }}>
            </Stack.Screen>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: false }}>
            </Stack.Screen>
        </Stack.Navigator>
        
    )
}
export default AuthStackScreen
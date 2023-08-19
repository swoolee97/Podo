import { createStackNavigator } from "@react-navigation/stack"
import React, { useState } from "react"
import LoginScreen from "../AuthStackScreens/LoginScreen"
import RegisterScreen from "../AuthStackScreens/RegisterScreen"
import ForgotPasswordScreen from "../AuthStackScreens/ForgotPasswordScreen"
import PasswordResetScreen from "../AuthStackScreens/PasswordResetScreen";

const AuthStackScreen = ({}) => {
    const Stack = createStackNavigator()

    return (
        
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component = {LoginScreen} options={{ headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen name="RegisterScreen" component={RegisterScreen} options={{ headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen name="ForgotPasswordScreen" component={ForgotPasswordScreen} options={{ headerShown: true }}>
            </Stack.Screen>
            <Stack.Screen name="PasswordResetScreen" component={PasswordResetScreen} options={{ headerShown: true }}>
            </Stack.Screen>
        </Stack.Navigator>
        
    )
}
export default AuthStackScreen
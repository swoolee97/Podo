import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import LoginScreen from "../AuthStackScreens/LoginScreen"
import RegisterScreen from "../AuthStackScreens/RegisterScreen"


const AuthStackScreen = ({ navigation, onClose, onLoginSuccess, onLoginFail, onRegisterFail, onRegisterSuccess }) => {
    const Stack = createStackNavigator()
    return (
        // <NavigationContainer>
        <Stack.Navigator initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" options={{ headerShown: false }}>
                {props => <LoginScreen {...props} onClose={onClose} onLoginSuccess={onLoginSuccess} onLoginFail={onLoginFail} />}
            </Stack.Screen>
            <Stack.Screen name="RegisterScreen" options={{headerShown : false}}>
                {props => <RegisterScreen {...props} onClose={onClose} onRegisterSuccess={onRegisterSuccess} onRegisterFail={onRegisterFail} />}
            </Stack.Screen>
        </Stack.Navigator>
        // </NavigationContainer>
    )
}
export default AuthStackScreen
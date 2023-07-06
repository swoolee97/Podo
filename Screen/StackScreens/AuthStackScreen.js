import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { SafeAreaView , View, Text} from "react-native"
import LoginScreen from "../AuthStackScreens/LoginScreen"
import RegisterScreen from "../AuthStackScreens/RegisterScreen"


const AuthStackScreen = () => {
    const Stack = createStackNavigator()
    return (
        // <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name = 'LoginScreen' component={LoginScreen}options = {{headerShown : false}}/>
                <Stack.Screen name = 'RegisterScreen' component={RegisterScreen} />
            </Stack.Navigator>
        // </NavigationContainer>
    )
}
export default AuthStackScreen
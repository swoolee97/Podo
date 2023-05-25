import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import React from "react"
import { SafeAreaView , View, Text} from "react-native"
import LoginScreen from "./LoginScreen"
import RegisterScreen from "./RegisterScreen"


const Auth = () => {
    const Stack = createStackNavigator()
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="LoginScreen">
                <Stack.Screen name = 'LoginScreen' component={LoginScreen}options = {{headerShown : true}}/>
                <Stack.Screen name = 'RegisterScreen' component={RegisterScreen} />
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Auth
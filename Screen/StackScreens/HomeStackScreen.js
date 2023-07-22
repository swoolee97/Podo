import React, { useState, useEffect } from "react"
import { Button } from "react-native"

import HomeScreen from "../HomeScreen"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import UploadGifticon from "../../UploadGifticon"
import LoginScreen from "../AuthStackScreens/LoginScreen"

const Stack = createStackNavigator()

const HomeScreenStack = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen'
        if (routeName != 'HomeScreen') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
        } else {
            navigation.setOptions({ tabBarStyle: { display: undefined } })
        }
    }, [navigation, route])
    return (
        <Stack.Navigator initialRouteName="HomeScreen">
            <Stack.Screen name='LoginScreen' component={LoginScreen} ></Stack.Screen>
            <Stack.Screen name='HomeScreen' component={HomeScreen} options={{
                headerRight: () => (
                    <Button title='기프티콘등록' onPress={() => {
                        navigation.navigate('UploadGifticon')
                    }} />
                )
<<<<<<< HEAD
            }}/>
            <Stack.Screen name='UploadGifticon' component={UploadGifticon}/>
=======
            }}></Stack.Screen>
            <Stack.Screen name='RegisterGifticon' component={RegisterGifticon}></Stack.Screen>
>>>>>>> parent of b7a1e63 (mod_login)
        </Stack.Navigator>
    )
}

export default HomeScreenStack;
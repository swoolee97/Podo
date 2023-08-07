import React, { useState, useEffect } from "react"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import CommunityScreen from "../FeedStackScreens/CommunityScreen"

const Stack = createStackNavigator()

const FeedStackScreen = ({ navigation, route }) => {
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'CommunityScreen'
        if (routeName != 'CommunityScreen') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
        } else {
            navigation.setOptions({ tabBarStyle: { display: undefined } })
        }
    }, [navigation, route])
    return (
        <Stack.Navigator initialRouteName="CommunityScreen">
            <Stack.Screen name='CommunityScreen' component={CommunityScreen} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
export default FeedStackScreen
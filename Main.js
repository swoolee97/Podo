import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"

import HomeStackScreen from "./Screen/StackScreens/HomeStackScreen"
import SearchingStackScreen from "./Screen/StackScreens/SearchingStackScreen"
import MyPageStackScreen from "./Screen/StackScreens/MyPageStackScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Main = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="HomeStackScreen" component={HomeStackScreen} options = {{headerShown :false}} />
                <Tab.Screen name="SearchingStackScreen" component={SearchingStackScreen}options = {{headerShown :false}} />
                <Tab.Screen name="MyPageStackScreen" component={MyPageStackScreen}options = {{headerShown :false,}} />
            </Tab.Navigator>
    )
}
export default Main;
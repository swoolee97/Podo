import React from "react"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"

import HomeStackScreen from "./Screen/StackScreens/HomeStackScreen"
import SearchingStackScreen from "./Screen/StackScreens/SearchingStackScreen"
import FeedStackScreen from "./Screen/StackScreens/FeedStackScreen"
import MyPageStackScreen from "./Screen/StackScreens/MyPageStackScreen"

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Main = () => {
    return (
            <Tab.Navigator>
                <Tab.Screen name="홈" component={HomeStackScreen}options = {{headerShown :false}} />
                <Tab.Screen name="찾기" component={SearchingStackScreen}options = {{headerShown :false}} />
                <Tab.Screen name="피드" component={FeedStackScreen}options = {{headerShown :false}} />
                <Tab.Screen name="마이페이지" component={MyPageStackScreen}options = {{headerShown :false,}} />
            </Tab.Navigator>
    )
}
export default Main;
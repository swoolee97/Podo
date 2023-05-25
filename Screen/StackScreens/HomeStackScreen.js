import React from "react"
import { SafeAreaView, Text, View } from "react-native"
import SearchingStackScreen from "./SearchingStackScreen"
import MyPageScreen from "../MyPageScreen"
import HomeScreen from "../HomeScreen"
import { createStackNavigator } from "@react-navigation/stack"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()
const HomeScreenStack = () => {
    return (
        <SafeAreaView>
            <View>
                <Text></Text>
            </View>
        </SafeAreaView>
    )
}

export default HomeScreenStack;
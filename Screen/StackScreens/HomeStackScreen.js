import React, { useState, useEffect } from "react"
import { Button, Text,Dimensions,StyleSheet,TouchableOpacity,View } from "react-native"

import HomeScreen from "../MainStackScreens/HomeScreen"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import UploadGifticon from "../../UploadGifticon"
import WishListScreen from "../MainStackScreens/WishListScreen"
import MissionDetailScreen from "../MissionStackScreens/MissionDetailScreen"
import NotificationScreen from "../MainStackScreens/NotificationScreen"
import DonationHistoryScreen from "../MainStackScreens/DonationHistory"
import AuthStackScreen from "./AuthStackScreen"
import ModifyGifticonScreen from "../GifticonListScreens/ModifyGifticonScreen"
import PointHistoryScreen from "../MainStackScreens/PointHistoryScreen"


const Stack = createStackNavigator()
const { width } = Dimensions.get('window');
const imageSize = width < 400 ? 20 : 25;  // 화면 너비가 400 미만일 때와 그렇지 않을 때의 이미지 크기
const marginSize = width < 400 ? 10 : 15;

const HomeStackScreen = ({ navigation, route }) => {
    const [currentRoute, setCurrentRoute] = useState(0);
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen'
        setCurrentRoute(routeName);
        if (routeName != 'HomeScreen') {
            navigation.setOptions({ tabBarStyle: { display: 'none' } })
        } else {
            navigation.setOptions({ tabBarStyle: { display: undefined } })
        }
    }, [navigation, route])

    return (
        <View style={{ flex: 1 }}>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen 
                    name='HomeScreen' 
                    component={HomeScreen}
                    options={{headerTitle : ''}}
                ></Stack.Screen>
                <Stack.Screen component={PointHistoryScreen} name = "PointHistoryScreen"></Stack.Screen>
                <Stack.Screen component={WishListScreen} name = "WishListScreen"></Stack.Screen>
                <Stack.Screen component={DonationHistoryScreen} name = "DonationHistoryScreen"></Stack.Screen>
                <Stack.Screen component={NotificationScreen} name = "NotificationScreen"></Stack.Screen>
                <Stack.Screen component={MissionDetailScreen} name = "MissionDetailScreen"
                      options={{
                        title: '오늘의 미션',
                        headerTitleAlign: 'center',
                        headerTitleStyle: {
                          fontWeight: 'bold'
                        }
                    }}></Stack.Screen>
                
                <Stack.Screen component={MissionDetailScreen} name = "MissionScreen"></Stack.Screen>
                <Stack.Screen component={AuthStackScreen} name = "AuthStackScreen"></Stack.Screen>
                <Stack.Screen name='UploadGifticon' component={UploadGifticon}></Stack.Screen>
                <Stack.Screen name = "ModifyGifticonScreen" component = {ModifyGifticonScreen}></Stack.Screen>
            </Stack.Navigator>
            </View>
            )
}

export default HomeStackScreen;
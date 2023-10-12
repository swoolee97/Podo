import React from "react";
import { Image, Text, Keyboard } from 'react-native';
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createStackNavigator } from "@react-navigation/stack"
import HomeStackScreen from "./Screen/StackScreens/HomeStackScreen"
import SearchingStackScreen from "./Screen/StackScreens/SearchingStackScreen"
import FeedStackScreen from "./Screen/StackScreens/FeedStackScreen"
import MyPageStackScreen from "./Screen/StackScreens/MyPageStackScreen"
import styles from './Screen/Styles/Styles.js';

import homeIcon from './images/Homeicon.png';
import searchIcon from './images/Searchicon.png';
import feedIcon from './images/Imageicon.png';
import myPageIcon from './images/Profileicon.png';

const Tab = createBottomTabNavigator()
const Stack = createStackNavigator()

const Main = () => {
    return (
            <Tab.Navigator
            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarStyle: [
                    {
                        display: "flex",
                        height: 60
                    },

                    null
                ],
                tabBarItemStyle: {
                    justifyContent: 'center', // 아이콘과 라벨의 수직 정렬
                    paddingVertical: 7,       // 바닥 패딩을 줄여서 라벨을 위로 올립니다.
                }
            }}
            >
                <Tab.Screen name="홈" 
                component={HomeStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                        source={homeIcon}
                        style={{ width: 20, height: 20, tintColor: focused ? 'black' : '#BCBBBB'}} 
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.navtext,{ color: focused ? 'black' : '#BCBBBB' }]}>홈</Text>
                    ),
                  }}
                />
                <Tab.Screen name="찾기" 
                component={SearchingStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                        source={searchIcon}
                        style={{ width: 20, height: 20, tintColor: focused ? 'black' : '#BCBBBB'}} 
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.navtext,{ color: focused ? 'black' : '#BCBBBB' }]}>찾기</Text>
                    ),
                  }}
                />
                <Tab.Screen name="피드" 
                component={FeedStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                        source={feedIcon}
                        style={{ width: 20, height: 20, tintColor: focused ? 'black' : '#BCBBBB'}} 
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.navtext,{ color: focused ? 'black' : '#BCBBBB' }]}>피드</Text>
                    ),
                  }}
                />
                <Tab.Screen name="마이페이지" 
                component={MyPageStackScreen}
                options={{
                    headerShown: false,
                    tabBarIcon: ({ focused, color, size }) => (
                        <Image
                        source={myPageIcon}
                        style={{ width: 16, height: 20, tintColor: focused ? 'black' : '#BCBBBB'}} 
                        />
                    ),
                    tabBarLabel: ({ focused, color }) => (
                        <Text style={[styles.navtext,{ color: focused ? 'black' : '#BCBBBB' }]}>마이페이지</Text>
                    ),
                  }}
                />
            </Tab.Navigator>
    )
}
export default Main;
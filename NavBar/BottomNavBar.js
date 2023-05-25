import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../Screen/HomeScreen";
import SearchingScreen from "../Screen/StackScreens/SearchingStackScreen";
import CommunityScreen from "../Screen/CommunityScreen";
import MyPageScreen from '../Screen/MyPageScreen';
import { NavigationContainer } from "@react-navigation/native";
const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export default BottomNavBar = () => {
    return (
        <NavigationContainer>
            <Tab.Navigator initialRouteName='HomeScreen'>
                <Stack.Screen name="홈" component={HomeScreen} options={{ headerShown: false }} />
                <Stack.Screen name="검색" component={SearchingScreen} options={{ headerShown: false }} />
                <Stack.Screen name="커뮤니티" component={CommunityScreen} options={{ headerShown: false }} />
                <Stack.Screen name="마이페이지" component={MyPageScreen} options={{ headerShown: false }} />
            </Tab.Navigator>
        </NavigationContainer>
    )
};

// export default BottomNavBar;
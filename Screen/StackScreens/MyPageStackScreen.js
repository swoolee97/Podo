import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import MyPageScreen from "../MyPageStackScreens/MyPageScreen";
import Profile from "../MyPageStackScreens/Profile";
import MyPage1 from "../MyPageStackScreens/MyPage1";
import MyPage2 from "../MyPageStackScreens/MyPage2";
import Certification from "../MyPageStackScreens/Certification";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import MissionComplete from "../MyPageStackScreens/MissionComplete";
import PurchaseHistory from "../MyPageStackScreens/PurchaseHistory";
import CustomerService from "../MyPageStackScreens/CustomerService";

import { useEffect, useState } from "react";
import AuthStackScreen from "./AuthStackScreen";
const Stack = createStackNavigator()
const MyPageStackScreen = ({ navigation, route }) => {
    
    React.useLayoutEffect(() => {
        const routeName = getFocusedRouteNameFromRoute(route) ?? 'MyPageScreen';
        if (routeName != 'MyPageScreen') { //MyPage이외의 화면에 대해 tabBar none을 설정한다.
          navigation.setOptions({tabBarStyle: {display: 'none'}});
        } else {
          navigation.setOptions({tabBarStyle: {display: undefined}});
        }
      }, [navigation,route]);
    return (
        <Stack.Navigator initialRouteName="MyPageScreen">
            <Stack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerShown: true }} />
            <Stack.Screen name="Profile" component={Profile} options={{}} />
            <Stack.Screen name="MyPage1" component={MyPage1} options={{ headerShown: true }} />
            <Stack.Screen name="MyPage2" component={MyPage2} options={{ headerShown: true }} />
            <Stack.Screen name="Certification" component={Certification} options={{ headerShown: true }} />
            <Stack.Screen name="AuthStackScreen" component={AuthStackScreen} options={{headerShown:false}}/>
            <Stack.Screen name="MissionComplete" component={MissionComplete} options={{ headerShown: true }} />
            <Stack.Screen name="PurchaseHistory" component={PurchaseHistory} options={{ headerShown: true }} />
            <Stack.Screen name="CustomerService" component={CustomerService} options={{ headerShown: true }} />
        </Stack.Navigator>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1, //전체의 공간을 차지한다는 의미
        flexDirection: 'column',
        backgroundColor: 'white',
        paddingLeft: wp(7),
        paddingRight: wp(7),
    }
})
export default MyPageStackScreen
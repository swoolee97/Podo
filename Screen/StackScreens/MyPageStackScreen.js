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
import { SafeAreaView } from "react-native";
const Stack = createStackNavigator()
const MyPageStackScreen = ({ navigation }) => {
    return (
            <Stack.Navigator initialRouteName="MyPageScreen">
                <Stack.Screen name="MyPageScreen" component={MyPageScreen} options={{ headerShown: true }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: true }} />
                <Stack.Screen name="MyPage1" component={MyPage1} options={{ headerShown: true }} />
                <Stack.Screen name="MyPage2" component={MyPage2} options={{ headerShown: true }} />
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
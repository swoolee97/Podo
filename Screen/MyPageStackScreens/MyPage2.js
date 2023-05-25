import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const MyPage2 = () =>{
    return (
        <View>
            <Text>마이페이지 2 </Text>
        </View>
    )
}
export default MyPage2
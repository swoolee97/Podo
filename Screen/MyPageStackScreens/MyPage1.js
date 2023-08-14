import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const MyPage1 = () =>{
    return (
        <View>
            <Text>마이페이지 1</Text>
        </View>
    )
}
export default MyPage1
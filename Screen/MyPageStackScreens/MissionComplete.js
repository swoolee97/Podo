import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const MissionComplete = () =>{
    return (
        <View>
            <Text>미션 완료 리스트</Text>
        </View>
    )
}
export default MissionComplete
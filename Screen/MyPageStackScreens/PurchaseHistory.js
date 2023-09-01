import React from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator()

const PurchaseHistory = () =>{
    return (
        <View>
            <Text>구매 내역</Text>
        </View>
    )
}
export default PurchaseHistory
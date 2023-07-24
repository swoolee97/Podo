import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { preURL } from "../../PreURL/PreURL";
import { createStackNavigator } from "@react-navigation/stack";


const PurchaseScreen = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>기프티콘 구매창</Text>
            </View>
        </SafeAreaView>
    )
}
export default PurchaseScreen;
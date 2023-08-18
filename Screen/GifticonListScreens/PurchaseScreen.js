import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";

const PurchaseScreen = ({navigation,route}) => {
    const {gifticon} = route.params;
    console.log(gifticon)
    return (
        <SafeAreaView>
            <View>
                <Text>기프티콘 구매창</Text>
            </View>
        </SafeAreaView>
    )
}
export default PurchaseScreen;
import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const GifticonDetailScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <Text>기프티콘 상세(사진, 포인트, 유효기간 등)</Text>
            </View>
                <Text></Text>
                <Text></Text>
                <Text></Text>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('PurchaseScreen', { screen: 'PurchaseScreen' })
                }}><Text>구매하기</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>장바구니에 담기</Text>
            </View>
            <View>
                <Text>(공유하기)</Text>
            </View>
            <View>
                <Text>(선물하기)</Text>
            </View>
        </SafeAreaView>
    )
}
export default GifticonDetailScreen;
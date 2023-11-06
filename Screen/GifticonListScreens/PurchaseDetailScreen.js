import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import PreURL from "../../PreURL/PreURL";
import { Image } from 'react-native'
import styles from '../Styles/Styles.js';
import { Alert } from "react-native";

const PurchaseDetailScreen = ({ navigation, route }) => {
    const url = route.params.url;
    const gifticonId = route.params.gifticonId;
    const isUsed = !route.params.isValid;
    console.log(route.params)
    const readIsUsed = async () => {
        Alert.alert('구매 확인', '정말 구매하시겠어요?', [
            {
                text: '아니요',
                onPress: () => console.log('구매 취소'),
                style: 'cancel',
            },
            { text: 'OK', onPress: () => handleUsedPress() },
        ]);
    }

    const handleUsedPress = async () => {
        const body = {
            'gifticonId' : gifticonId
        }
        const response = await fetch(PreURL.preURL + '/api/gifticon/purchase/used', {
            method: 'POST',
            body : JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json();
        if(response.status == 500){
            Alert.alert(data.message)
            
        }
        Alert.alert(data.message);
        return navigation.goBack();
    }


    return (
        <SafeAreaView style={[styles.container]}>
            <View style={{ flex: 9 }}>

                <View style={{ marginTop: '0%' }}>
                    <View style={{ width: '80%', left: '00%' }}>
                        <Image
                            source={{ uri: url }}
                            style={styles.image}
                        />
                    </View>
                </View>
            </View>
            <View
                style={{ height: 1, width: "100%", backgroundColor: "#c9c9c9" }} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '1%' }}>
            </View>
            <View>
                <TouchableOpacity disabled = {isUsed} onPress={readIsUsed}><Text>사용완료</Text></TouchableOpacity>
            </View>
            <View><Text> {isUsed ? "사용한 기프티콘은 isUsed로 표시함" : ""}</Text></View>
        </SafeAreaView>
    )
}
export default PurchaseDetailScreen;
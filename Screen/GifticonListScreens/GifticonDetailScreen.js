import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PreURL from "../../PreURL/PreURL";
import { Image } from 'react-native'
import AsyncStorage from "@react-native-async-storage/async-storage";

const GifticonDetailScreen = ({ navigation, route }) => {
    const gifticonId = route.params.gifticonId;
    const [gifticon, setGifticon] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch(PreURL.preURL + `/api/gifticon/detail?id=${gifticonId}`)
            const data = await response.json();
            setGifticon(data.gifticon)
        }
        fetchData();
    })
    const handleBuyPress = async () => {
        const email = await AsyncStorage.getItem('user_email')
        const gifticonResponse = await fetch(PreURL.preURL+`/api/gifticon/buy`,{
            method : 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body : JSON.stringify({
                gifticonId,
                email
            })
        })
        const gifticonData = await gifticonResponse.json();
        const pointResponse = await fetch(PreURL.preURL+`/api/point/sum?email=${email}`)
        const pointData = await pointResponse.json();
        console.log(gifticonData.gifticon.price)
        console.log(pointData.sum)
        // if(!response.ok){
        //     return Alert.alert(gifticonData.message)
        // }
        // 여기다가 창 뜨는거
        
    }

    return (
        <SafeAreaView>
            <View>
                <Text>기프티콘 상세(사진, 포인트, 유효기간 등)</Text>
            </View>
            <View>
                {gifticon ? (
                    <View>
                        <Image 
                            source={{ uri: gifticon.url }} 
                            style={{ width: 200, height: 200 }}
                        />
                        <Text>{gifticon.gifticon_name}</Text>
                        <Text>{gifticon.price}원</Text>
                        <Text>{gifticon.company}</Text>
                        <Text>{gifticon.category}</Text>
                    </View>
                ) : (<Text>asdf</Text>)}
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    Alert.alert('구매 확인', '정말 구매하시겠어요?', [
                        {
                          text: 'Cancel',
                          onPress: () => console.log('구매 취소'),
                          style: 'cancel',
                        },
                        {text: 'OK', onPress: () => handleBuyPress()},
                      ]);
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
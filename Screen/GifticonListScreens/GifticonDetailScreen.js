import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import PreURL from "../../PreURL/PreURL";
import { Image } from 'react-native'

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
                    navigation.navigate('PurchaseScreen',{
                        gifticon
                    })
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
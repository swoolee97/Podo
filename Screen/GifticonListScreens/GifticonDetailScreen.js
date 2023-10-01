import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import PreURL from "../../PreURL/PreURL";
import { Image } from 'react-native'
import styles from '../Styles/Styles.js';
import favoriteImage from '../../images/Favorite.png';
import heartImage from '../../images/Heart2.png';
import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
const GifticonDetailScreen = ({ navigation, route }) => {
    const gifticonId = route.params.gifticonId;
    const [gifticon, setGifticon] = useState(null);
    const [liked, setLiked] = useState(false);  // 좋아요 버튼 상태 관리

    const toggleLike = () => {
        setLiked(!liked);
    };
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
        const response = await fetch(PreURL.preURL + `/api/gifticon/buy`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                gifticonId,
                email
            })
        })
        const data = await response.json();
        if(!data.buy){
            return Alert.alert(`${data.message}`)
        }else{
            return Alert.alert(`${data.message}`)
        }

    }

    return (

        <SafeAreaView style={[styles.container]}>
            <View style={{ flex: 9 }}>
                {gifticon ? (
                    <View style={{ marginTop: '10%' }}>
                        <View style={{ width: '60%', left: '20%' }}>
                            <Image
                                source={{ uri: gifticon.image_url }}
                                style={styles.image}
                            />
                        </View>
                        <TouchableOpacity style={{ margin: '5%', width: '28%', height: 27, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#c9c9c9', borderRadius: 15 }}>
                            <Text style={[styles.PretendardRegular, { fontSize: 12, color: '#000000' }]}>{gifticon.company}</Text>
                        </TouchableOpacity>
                        <Text style={{ fontFamily: 'Pretendard-Regular', marginLeft: '5%', fontSize: 16, color: '#000000' }}>{gifticon.gifticon_name}</Text>
                        <View style={{ margin: '5%', width: '90%', height: 65, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#c9c9c9', borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 18, color: '#000000' }}>
                                {gifticon.price}포인트
                            </Text>
                        </View>

                    </View>
                ) : (<Text>asd</Text>)}
            </View>
            <View
                style={{ height: 1, width: "100%", backgroundColor: "#c9c9c9" }} />
            <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '1%' }}>
                <TouchableOpacity
                    onPress={toggleLike}
                    style={{

                        aspectRatio: 1,
                        height: '70%',
                        borderColor: "#c9c9c9",
                        borderWidth: 1,
                        borderRadius: 8,
                        justifyContent: 'center',
                        alignItems: 'center',

                    }}
                >
                    <Image
                        source={liked ? heartImage : favoriteImage}
                        style={{ aspectRatio: 1, height: '60%' }}
                    />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => {
                    Alert.alert('구매 확인', '정말 구매하시겠어요?', [
                        {
                            text: 'Cancel',
                            onPress: () => console.log('구매 취소'),
                            style: 'cancel',
                        },
                        { text: 'OK', onPress: () => handleBuyPress() },
                    ]);
                }
                }
                    style={{
                        marginLeft: '4%',
                        width: '75%',
                        height: '70%',
                        backgroundColor: '#3BCDA1',
                        borderRadius: 8,
                        justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
                        alignItems: 'center',
                    }}
                >
                    <Text style={styles.buttonText}>구매하기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default GifticonDetailScreen;
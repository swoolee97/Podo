import React, { useEffect, useState } from "react";
import { SafeAreaView, View, Text, ScrollView} from "react-native";
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
            <ScrollView>
            <View>
                {gifticon ? (
                    <View style={{ marginTop: '10%' }}>
                        <View style={{ width: '60%', left: '20%' }}>
                            <Image
                                source={{ uri: gifticon.image_url }}
                                style={styles.image}
                            />
                        </View>
                        <View style={{ margin: '5%', width: '28%', height: 27, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#c9c9c9', borderRadius: 10 }}>
                            <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 12, color: '#000000' }}>
                                {gifticon.company}
                            </Text>
                        </View>
                        <Text style={{ fontFamily: 'Pretendard-Regular', marginLeft: '5%', fontSize: 16, color: '#000000' }}>{gifticon.gifticon_name}</Text>
                        <View style={{ margin: '5%', width: '90%', height: 65, justifyContent: 'center', alignItems: 'center', borderWidth: 1, borderColor: '#c9c9c9', borderRadius: 10 }}>
                            <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 18, color: '#000000' }}>
                                {gifticon.price}포인트
                            </Text>
                        </View>
                        <View>
                            <Text style = {{fontFamily: 'Pretendard-Light', fontSize: 14}}>
                                1. 본 쿠폰은 현금으로 교환되지 않습니다. {'\n'}
                                2. 특수 매장 (제주 지역 및 휴게소)은 제품 가격이 다를 수 있으며, 추가 금액이 발생할 수 있습니다.{'\n'}
                                3. 상기 이미지는 연출된 것으로 실제와 다를 수 있습니다.{'\n'}
                                4. 본 쿠폰은 해당 제품으로 교환 가능합니다.{'\n'}
                                5. 본 상품은 매장 재고 상황에 따라 동일 상품으로 교환이 불가능 할 수 있습니다.{'\n'}
                                6. 방문하실 매장에 사전 예약 또는 제품 확인 후 방문하시기 바랍니다.{'\n'}
                                7. 매장별 재고 및 판매 상황에 따라 해당 제품 구매가 불가능한 경우에는 동일 가격 이상의 다른 제품으로 교환 가능하며,차액은 추가 지불해야 합니다.{'\n'}
                                8. 매장에서 해당 제품 구매가 어려운 경우, 다른 매장을 이용하거나 모바일쿠폰 구매처를 통해서 취소 환불할 수 있습니다.{'\n'}
                                9. 본 쿠폰의 포인트 적립 및 제휴/할인 혜택 적용과 매장 내 운영하는 세트 메뉴 및 행사 상품의 교환 여부는 교환처의 정책에 따릅니다.{'\n'}
                                10. 시즌성 상품, 기업 경품(B2B), 할인 상품의 경우 유효기간이 상이할 수 있습니다.{'\n'}
                            </Text>
                        </View>

                    </View>
                ) : (<Text>loading</Text>)}
            </View>
            </ScrollView>
            <View
                style={{ height: 1, width: "100%", backgroundColor: "#c9c9c9"}} />
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', margin: '1%' }}>
                <TouchableOpacity
                    onPress={toggleLike}
                    style={{

                        aspectRatio: 1,
                        height: 45,
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
                        height: 45,
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
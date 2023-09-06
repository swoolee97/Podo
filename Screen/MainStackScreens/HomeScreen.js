import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused } from "@react-navigation/native";
const HomeScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState(null)
    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            const fetchEmail = async () => {
                const email = await AsyncStorage.getItem('user_email')
                setUserEmail(email)
            }
            fetchEmail()
        }
    }, [isFocused]);
    const logout = async () => {
        const preURL = PreURL.preURL
        const response = await fetch(preURL + '/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: userEmail
            })
        })
        if (response.status == 200) {
            const data = await response.json();
            AsyncStorage.removeItem('accessToken')
            AsyncStorage.removeItem('user_email')
            Toast.hide();
            Alert.alert(`${data.message}`)
            navigation.replace('HomeScreen')
        }

    }
    return (
        <View>
            <View style={{}}>
                <Text>{userEmail}님, 안녕하세요!</Text>
            </View>
            <View style={{}}>
                <Text></Text>
                <Text>나무 그림</Text>
                <Text></Text>
            </View>
            {userEmail && (
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PointDetailScreen')
                }}>
                    <Text>포인트 적립내역화면: {userPoints} 포인트</Text>
                </TouchableOpacity>
            </View>
        )}
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('WishListScreen')
                }}>
                    <Text>장바구니화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('NotificationScreen')
                }}>
                    <Text>알림화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DonationHistoryScreen')
                }}>
                    <Text>기부내역화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MissionScreen')
                }}>
                    <Text>미션창</Text>
                </TouchableOpacity>
            </View>
            <>{userEmail &&
                <View style={{}}>
                    <TouchableOpacity onPress={() => {
                        logout()
                    }}>
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            }</>
            <View>
                <TouchableOpacity onPress={async () => {
                    const response = await fetch(PreURL.preURL + '/api/card/fake');
                    const data = await response.json();
                    console.log(data)
                }}>
                    <Text>카드생성버튼(임시용)</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default HomeScreen
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
    const logout = () => {
        const preURL = PreURL.preURL
        fetch(preURL + '/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: userEmail
            })
        }).then((response) => {
            if (response.status == 200) {
                AsyncStorage.removeItem('accessToken')
                AsyncStorage.removeItem('user_email')
                Alert.alert('로그아웃 완료')
                navigation.replace('HomeScreen')
            }
        })
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
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PointDetailScreen')
                }}>
                    <Text>포인트 적립내역화면</Text>
                </TouchableOpacity>
            </View>
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
            </View>
        </View >
    )
}
export default HomeScreen
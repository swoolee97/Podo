import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";

const HomeScreen = ({ navigation }) => {
    // const user = await AsyncStorage.getItem('user')
    // const [name, setName] = useState(null)
    const [userEmail, setUserEmail] = useState(null)
    useEffect(() => {
        const fetchUserId = async () => {
            const userEmail = await AsyncStorage.getItem('user_email');
            setUserEmail(userEmail);
        }
        fetchUserId();
    }, []);
    return (
        <View>
            <View style = {{}}>
                <Text>{userEmail}</Text>
            </View>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('PointDetailScreen')
                }}>
                    <Text>포인트 적립내역화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('WishListScreen')
                }}>
                    <Text>장바구니화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('NotificationScreen')
                }}>
                    <Text>알림화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('DonationHistoryScreen')
                }}>
                    <Text>기부내역화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={ () => {
                    navigation.navigate('MissionScreen')
                }}>
                    <Text>미션창</Text>
                </TouchableOpacity>
            </View>
            <View style = {{}}>
                <TouchableOpacity onPress={async () => {
                    await AsyncStorage.clear()
                    navigation.replace('Auth')
                    console.log('로그아웃 완료')
                }}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    )
}
export default HomeScreen
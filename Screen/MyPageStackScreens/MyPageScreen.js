import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PreURL } from "../../PreURL/PreURL";
import axios from "axios";

const MyPageScreen = ({ navigation }) => {
    const preURL = require('../../PreURL/PreURL').preURL

    const [userEmail, setUserEmail] = useState(null)

    useEffect(() => {
        const fetchUserEmail = async () => {
            try {
                const user_email = await AsyncStorage.getItem('user_email')
                setUserEmail(user_email)
            } catch (error) {
                console.error('Error fetching userEmail : ', error)
            }
        }
        fetchUserEmail();
    }, []);

    useEffect(() => {
        const fetchMypageData = async () => {
            try {
                if (userEmail) {
                    const response = await axios.get(preURL + '/api/mypage/' + userEmail)
                }
            } catch (error) {
                console.error("Error fetching my page data:", error);
            }
        }
        fetchMypageData()
    }, [userEmail])

    return (

        <View style={styles.container}>
            <View style={styles.section}>
                {userEmail == null ? <Text>로그인 안했을 때 프로필</Text> : <Text>로그인 했을 때 프로필</Text>}
            </View>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile', { screen: 'Profile' })
                }}><Text>프로필 보기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text>{userEmail}님 안녕하세요!</Text>
                <Text>이메일 : {userEmail}</Text>
            </View>
            <View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});
export default MyPageScreen
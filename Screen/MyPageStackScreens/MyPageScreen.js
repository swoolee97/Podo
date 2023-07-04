import AsyncStorage from "@react-native-community/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { PreURL } from "../../PreURL/PreURL";
import axios from "axios";

const MyPageScreen = ({ navigation }) => {
    const preURL = require('../../PreURL/PreURL').preURL

    const [userId, setUserId] = useState(null)
    const [userEmail, setUserEmail] = useState(null)

    useEffect(() => {
        const fetchUserId = async () => {
            try {
                const user_id = await AsyncStorage.getItem('user_id')
                setUserId(user_id)
                console.log('user_id :', user_id)
            } catch (error) {
                console.error('Error fetching userId : ', error)
            }
        }
        fetchUserId();
    }, []);

    useEffect(() => {
        const fetchMypageData = async () => {
            try {
                const response = await axios.get(preURL + '/api/mypage/' + userId)
                console.log(response.data.user_email)
                console.log(response.data.message)
                setUserEmail(response.data.user_email)
            } catch (error) {
                console.error("Error fetching my page data:", error);
            }
        }
        fetchMypageData()
    }, [userId])

    return (

        <View style={styles.container}>
            <View style={styles.section}>
                {userId == null ? <Text>로그인 안했을 때 프로필</Text> : <Text>로그인 했을 때 프로필</Text>}
            </View>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile', { screen: 'Profile' })
                }}><Text>프로필 보기</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text>{userId}님 안녕하세요!</Text>
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
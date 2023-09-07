import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import PreURL from '../../PreURL/PreURL';
import { checkLoginStatus } from '../../CommonMethods/CheckLoginStatus';
import styles from '../Styles/Styles.js';
import Toast from 'react-native-toast-message';
import FocusableInput from "../Styles/FocusableInput"
const MyPageScreen = ({ navigation }) => {
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
    const handleCertificationScreen = async () =>{
        if(!userEmail){
            return Alert.alert('로그인 후 이용해주세요')
        }
        const response = await fetch(PreURL.preURL+`/api/card?email=${userEmail}`)
        const data = await response.json();
        if(response.status == 500){
            return Alert.alert(`${data.message}`)
        }else{
            return navigation.navigate('Certification')
        }
    }
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
            navigation.replace('MyPageScreen')
        }

    }
    return (

        <View style={styles.container}>
            <>{!userEmail &&
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AuthStackScreen')
                    }}><Text>로그인하기</Text>
                    </TouchableOpacity>
                </View>
            }</>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile', { screen: 'Profile' })
                }}><Text>프로필 관리</Text>
                </TouchableOpacity>
            </View>

            <View style={[styles.touchbox, {position:'relative' ,}]}>
                <TouchableOpacity onPress={() => {
                    handleCertificationScreen();
                }}><Text style = {styles.buttonText}>수혜자 인증받기</Text>
                </TouchableOpacity>
            </View>
            
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DonationHistoryScreen')
                }}>
                    <Text>기부내역</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('WishListScreen')
                }}>
                    <Text>장바구니화면</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MissionCompletedList')
                }}>
                    <Text>미션 완료 리스트</Text>
                </TouchableOpacity>
            </View>
            <Text style={[styles.lefttext, {top: '30%'}]}>기부 내역</Text>
            <Text style={[styles.lefttext, {top: '60%'}]}>교환 내역</Text>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PurchaseHistory')
                }}>
                    <Text>상품 구매 내역</Text>
                </TouchableOpacity>
            </View>
            {userEmail &&
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        logout()
                    }}>
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            }

            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CustomerService')
                }}>
                    <Text>고객 센터</Text>
                </TouchableOpacity>
            </View>

        </View>
    )
}

export default MyPageScreen
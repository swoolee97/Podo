import { SafeAreaView, Text,Image, View, TextInput, StyleSheet } from "react-native"
import { Alert } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native"
import { useState, useContext } from "react"
import { preURL } from "../../PreURL/PreURL"
import { createStackNavigator } from "@react-navigation/stack"
import RegisterScreen from "./RegisterScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, login } from '@react-native-seoul/kakao-login'
import styles from '../Styles/Styles.js';
const Stack = createStackNavigator()

const LoginScreen = ({ navigation }) => {
    const PreURL = require('../../PreURL/PreURL')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState(null)

    const loginSubmit = async () => {
        data = {
            'user_email' : userEmail,
            'user_pw' : userPassword
        }
        
        fetch(PreURL.preURL + '/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(response => response.json())
            .then(async (responseJson) => {
                if (responseJson.login) {
                    await AsyncStorage.setItem('user_email', responseJson.user_email)
                    await AsyncStorage.setItem('accessToken', responseJson.accessToken)
                    const email = await AsyncStorage.getItem('user_email');
                    Alert.alert('로그인 성공')
                    navigation.replace('Main')
                    
                } else {
                    Alert.alert('로그인 실패 : ',responseJson.message)
                }
            }).catch((error) => {
                console.error(error);
            });

    }
    const loginWithKakao = async () => {
        console.log(login)
        let result =  await login();
        console.log('result:' ,  result)
        if (result) {
            let profile = await getProfile();
            fetch(preURL + '/api/auth/kakao', {
                method: 'POST',
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json'
                },
            }).then(response => {
                return response.json()
            })
                .then(async responseJson => {
                    if (responseJson.login) {
                        await AsyncStorage.setItem('user_email', responseJson.user_email)
                        await AsyncStorage.setItem('accessToken', responseJson.accessToken)
                        const email = await AsyncStorage.getItem('user_email');
                        Alert.alert('로그인 성공')
                        navigation.replace('Main')
                    } else {
                        Alert.alert('로그인 실패')
                    }
                })
        }
    }
    
    return (
        <SafeAreaView style={styles.container}> 
                    
            <Text style={styles.podo}>
                PODO
            </Text>
            <Text style={styles.postDonation}>
                POST DONATION
            </Text>
            <Text style={[styles.lefttext, {top: 223}]}>
                이메일
            </Text>
            <TextInput style={[styles.Input, {top: 246}]}
                    onChangeText={(userEmail) => { setUserEmail(userEmail) }}
            />
            <Text style={[styles.lefttext, {top: 306}]}>
                비밀번호
            </Text>

            <TextInput style={[styles.Input, {top: 329}]}
                    onChangeText={(userPassword) => { setUserPassword(userPassword) }}
                    secureTextEntry
            />
            
            <TouchableOpacity onPress={() => { loginSubmit(); }} style={[styles.touchbox, {top:412}]}>
                <Text style={styles.buttonText}>
                    로그인
                </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')} 
                style={styles.registerText}>
                <Text style={[styles.PretendardRegular,
                    {fontSize: 16, 
                    color: '#000000'}]}>회원가입
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate('ForgotPasswordScreen')} 
                style={styles.passwordText}>
                <Text style={[styles.PretendardRegular, 
                    {fontSize: 16, 
                    color: '#000000'}]}>비밀번호 찾기
                </Text>
            </TouchableOpacity>
           

            <TouchableOpacity style={styles.kakaoButton} onPress={() => loginWithKakao()}>
                <View style={styles.innerContainer}>
                    <Image source={require('../../images/KakaoTalk_logo.png')} style={styles.kakaoIcon} />
                    <Text style={[styles.PretendardBold, 
                        {fontSize: 16, 
                        color: '#000000',}]}>카카오 로그인
                    </Text>
                </View>
            </TouchableOpacity>

        </SafeAreaView>
      );
    };
export default LoginScreen;
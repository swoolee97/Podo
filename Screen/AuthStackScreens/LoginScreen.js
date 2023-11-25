import { SafeAreaView, Text, Image, View, TextInput, StyleSheet } from "react-native"
import { Alert } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native"
import { useState, useContext } from "react"
import { preURL } from "../../PreURL/PreURL"
import { createStackNavigator } from "@react-navigation/stack"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, login } from '@react-native-seoul/kakao-login'
import styles from '../Styles/Styles.js';
import FocusableInput from "../Styles/FocusableInput"
const Stack = createStackNavigator()
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
const LoginScreen = ({ navigation }) => {
    const PreURL = require('../../PreURL/PreURL')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState(null)
    const [isButtonActive, setButtonActive] = useState(false);
    const loginSubmit = async () => {
        if(!userEmail){
            return Alert.alert('오류','이메일을 입력해주세요')
        }
        const emailTest = emailRegEx.test(userEmail);
        if(!emailTest){
            return Alert.alert('오류','올바른 이메일 형식이 아닙니다');
        }
        if(!userPassword){
            return Alert.alert('오류','비밀번호를 입력해주세요')
        }
        data = {
            'user_email': userEmail,
            'user_pw': userPassword
        }

        const response = await fetch(PreURL.preURL + '/api/auth/login', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const responseJson = await response.json();
        if (responseJson.login) {
            await AsyncStorage.setItem('user_email', responseJson.user_email)
            await AsyncStorage.setItem('nick_name', responseJson.nick_name)
            await AsyncStorage.setItem('accessToken', responseJson.accessToken)
            navigation.replace('Main')
        }else if(response.status == 501){
            Alert.alert('오류',responseJson.message)
        } 
        else {
            Alert.alert('로그인 실패', responseJson.message)
        }
        
    }
    const checkButtonStatus = () => {
        if (userEmail && userPassword) {
            setButtonActive(true);
        } else {
            setButtonActive(false);
        }
    };
    const loginWithKakao = async () => {
        let result;
        try {
            result = await login();
        } catch (error) {
            return Alert.alert('오류');
        }
        if (result) {
            let profile = await getProfile();
            const response = await fetch(preURL + '/api/auth/kakao', {
                method: 'POST',
                body: JSON.stringify(profile),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            const data = await response.json();
            if (data.login) {
                await AsyncStorage.setItem('user_email', data.user_email)
                await AsyncStorage.setItem('accessToken', data.accessToken)
                Alert.alert('로그인 성공')
                navigation.replace('Main')
            } else {
                Alert.alert('로그인 실패')
            }
        }
    }
    return (
        <SafeAreaView style={styles.container}> 
            <View style={{alignItems: "center", alignContent: 'center'}}>       
                <Text style={styles.podo}>
                    PODO
                </Text>
                <Text style={styles.postDonation}>
                    POST DONATION
                </Text>
            </View> 
            <Text style={[styles.lefttext, {top: 223}]}>
                이메일
            </Text>
            <FocusableInput style={[styles.Input, {top: 246}]}
                    onChangeText={(userEmail) => { setUserEmail(userEmail); checkButtonStatus(); }}
            />
            <Text style={[styles.lefttext, {top: 306}]}>
                비밀번호
            </Text>

            <FocusableInput style={[styles.Input, {top: 329}]}
                    onChangeText={(userPassword) => { setUserPassword(userPassword); checkButtonStatus(); }}
                    secureTextEntry
            />
            
            <TouchableOpacity 
                onPress={() => { loginSubmit(); }} 
                style={[styles.touchbox, {top:412, backgroundColor: isButtonActive ? '#3BCDA1' : '#CECECE'}]}
                disabled={!isButtonActive}>
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
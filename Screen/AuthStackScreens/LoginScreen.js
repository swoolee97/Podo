import { SafeAreaView, Text,Image, View, TextInput, StyleSheet } from "react-native"
import { Alert } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useState, useContext } from "react"
import { preURL } from "../../PreURL/PreURL"
import { createStackNavigator } from "@react-navigation/stack"
import RegisterScreen from "./RegisterScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getProfile, login } from '@react-native-seoul/kakao-login'
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
        let result = await login();
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
    const styles = StyleSheet.create({
        container: {
            width: 390,
            height: 844,
            backgroundColor: '#ffffff'
        },
        podo: {
            position: 'absolute',
            width: 117,
            height: 40,
            left: 137,
            top: 124,
            fontWeight: '800',
            fontSize: 40,
            lineHeight: 50,
            textAlign: 'center',
            letterSpacing: 0.59,
            color: '#3BCDA1',
        },
        postDonation: {
            position: 'absolute',
            width: 120,
            height: 22,
            left: 135,
            top: 165,  // 프로젝트에 이 글꼴이 포함되어 있어야 합니다.
            fontWeight: '700',
            fontSize: 14,
            lineHeight: 22,
            textAlign: 'center',
            letterSpacing: 0.59,
            color: '#3BCDA1',
        },
        emailtext: {
            position: 'absolute',
            left: '3.33%',
            top: 223,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            color: '#000000',

        },

        emailInput: {
            position: 'absolute',
            height: 45,
            left: '2.56%',  // 리액트 네이티브에서는 백분율로 위치를 지정할 수 있습니다.
            right: '2.56%',
            top: 246,
            backgroundColor: '#F4F4F4',
            borderColor: '#D9D9D9',
            borderWidth: 1,
            borderRadius: 8,
        },

        passwordtext: {
            position: 'absolute',
            left: '3.33%',
            top: 306,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            color: '#000000',

        },

        passwordInput: {
            position: 'absolute',
            height: 45,
            left: '2.56%',  // 리액트 네이티브에서는 백분율로 위치를 지정할 수 있습니다.
            right: '2.56%',
            top: 329,
            backgroundColor: '#F4F4F4',
            borderColor: '#D9D9D9',
            borderWidth: 1,
            borderRadius: 8,
        },
        loginbox: {
            position: 'absolute',
            width: 370,
            height: 45,
            top: 412,
            opacity: 0.5,
        },

        loginButton: {
            height: 45,
            left: '2.56%',
            right: '2.56%',
            backgroundColor: '#3BCDA1',
            borderRadius: 8,
            justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
            alignItems: 'center',     // 텍스트를 가로로 중앙에 위치시키기 위해 추가
        },
        loginText: {
            fontWeight: '700',
            fontSize: 14,
            lineHeight: 22,
            letterSpacing: -0.408,
            color: '#FFFFFF',
            textAlign: 'center',
        },
        registerText: {
            position: 'absolute',
            left: '3.33%',
            top: 477,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            color: '#000000',
        },
        kakaoButton: {
            position: 'absolute',
            width: 370,
            height: 45,
            top: 532,
            
        },
        kakaoButton2: {
            height: 45,
            left: '2.56%',
            right: '2.56%',
            backgroundColor: '#FEE500',
            borderRadius: 8,
            alignItems: 'center', // 센터 정렬
            justifyContent: 'center', // 센터 정렬
        },
        kakaoText: {

            top: -1.5,
            fontFamily: 'Pretendard',
            fontStyle: 'normal',
            fontWeight: '700',
            fontSize: 14,
            color: '#000000',
        },
        kakaoIcon: {
            width: 16,
            height: 15,
            position: 'absolute',
            left: 136,
            top: 15, 
        },
        passwordText: {
            position: 'absolute',
            right: '2.56%',
            top: 477,
            fontStyle: 'normal',
            fontWeight: '400',
            fontSize: 14,
            color: '#000000',
        },

    


       
    });
    return (
        <SafeAreaView style={styles.container}>            
            <Text style={styles.podo}>
                PODO
            </Text>
            <Text style={styles.postDonation}>
                POST DONATION
            </Text>
            <Text style={styles.emailtext} >
                이메일
            </Text>
                <TextInput style={styles.emailInput}
                    onChangeText={(userEmail) => { setUserEmail(userEmail) }}
                />
            
            <Text style={styles.passwordtext} >
                비밀번호
            </Text>
                <TextInput style={styles.passwordInput}
                    onChangeText={(userPassword) => { setUserPassword(userPassword) }}
                    secureTextEntry
                />

            <View style={styles.loginbox} >
                <TouchableOpacity 
                    style={styles.loginButton}
                    onPress={() => { loginSubmit(); }}
                >
                    <Text style={styles.loginText}>로그인</Text>
                </TouchableOpacity>
            </View>
                
            
            <View style={styles.registerText}>
                <TouchableOpacity 
                    onPress={() => navigation.navigate('RegisterScreen')}                    
                >
                    <Text>회원가입</Text>
                </TouchableOpacity>
            </View>
            <View style ={styles.kakaoButton}>
                <TouchableOpacity style={styles.kakaoButton2} onPress={() => loginWithKakao()}>
                <Image source={require('../../images/KakaoTalk_logo.png')} style={styles.kakaoIcon} />
                <Text style={styles.kakaoText}>      카카오 로그인</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.passwordText}>
                <TouchableOpacity
                onPress={() => navigation.navigate('ForgotPasswordScreen')}
                >
                <Text>비밀번호 찾기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen
import { SafeAreaView, Text, View, TextInput, StyleSheet } from "react-native"
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react"
import { preURL, PreURL } from "../../PreURL/PreURL"
import { createStackNavigator } from "@react-navigation/stack"
import RegisterScreen from "./RegisterScreen"
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as kakaoLogin from '@react-native-seoul/kakao-login'
const Stack = createStackNavigator()

const LoginScreen = ({ navigation }) => {
    const PreURL = require('../../PreURL/PreURL')
    const [userPassword, setUserPassword] = useState('')
    const [userEmail, setUserEmail] = useState('')
    
    const loginSubmit = () => {
        let dataToSend = { user_email: userEmail, user_pw: userPassword };
        let formBody = []; // 1
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log(PreURL.preURL + '/api/login')
        fetch(PreURL.preURL + '/api/login', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                if (responseJson.login == 'success') {
                    console.log(responseJson.user_email)
                    AsyncStorage.setItem('user_email', responseJson.user_email)
                    AsyncStorage.setItem('token',responseJson.token)
                    navigation.replace('Main')
                } else {
                    console.log('Please check your id or password');
                }
            }).catch((error) => {
                // Hide Loader
                // setLoading(false);
                console.error(error);
            });
    }
    const loginWithKakao = () => {
        kakaoLogin.login()
    }
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            marginTop : 0,
            backgroundColor: '#fff',
            justifyContent: 'center',
            paddingHorizontal: 20,
        },
        title: {
            fontSize: 24,
            fontWeight: 'bold',
            textAlign: 'center',
            marginBottom: 20,
        },
        input: {
            height: 40,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
            marginHorizontal : 100
        },
        button: {
            backgroundColor: '#4e9bde',
            paddingVertical: 10,
            borderRadius: 10,
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
        },
    });
    return (

        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View>
                    <Stack.Screen name="회원가입" component={RegisterScreen} />

                    <TextInput
                        onChangeText={(userEmail) => { setUserEmail(userEmail) }}
                        placeholder='이메일'
                        style={styles.input}
                    />
                    <TextInput
                        onChangeText={(userPassword) => { setUserPassword(userPassword) }}
                        placeholder='비밀번호'
                        style={styles.input}
                    />
                    <View style = {{flexDirection :'row'}}>
                        <TouchableOpacity
                            onPress={loginSubmit}
                            style={styles.button}
                        >
                            <Text style = {styles.buttonText}>로그인</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => navigation.navigate('RegisterScreen')}
                            style={styles.button}
                        >
                            <Text style={styles.buttonText}>회원가입</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            onPress={() => {
                                    loginWithKakao()
                                }}
                            style={styles.button}
                        >
                            <Text style = {styles.buttonText}>카카오로그인</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default LoginScreen
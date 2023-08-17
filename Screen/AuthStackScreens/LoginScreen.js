import { SafeAreaView, Text, View, TextInput, StyleSheet } from "react-native"
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
            flex: 1,
            marginTop: 0,
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
            marginHorizontal: 100
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
                    secureTextEntry
                />
                <View style={{ flexDirection: 'row' }}>
                    <TouchableOpacity
                        onPress={() => { loginSubmit(); }}
                        style={styles.button}
                    >
                        <Text style={styles.buttonText}>로그인</Text>
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
                        <Text style={styles.buttonText}>카카오로그인</Text>
                    </TouchableOpacity>
                </View>
            </View>
            </ScrollView>
        </SafeAreaView>
    )
}
export default LoginScreen
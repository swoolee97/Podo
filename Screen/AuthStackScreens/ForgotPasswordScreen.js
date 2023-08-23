import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import PreURL from '../../PreURL/PreURL';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [verificationCode, setVerificationCode] = useState('');
    const [generatedCode, setGeneratedCode] = useState('');
    const [codeSent, setCodeSent] = useState(false);
    const [emailValid, setEmailValid] = useState(null);
    const [checkCode,setCheckCode] = useState(false);

    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    const emailCheck = (inputEmail) => {
        setEmail(inputEmail);
        setEmailValid(emailRegEx.test(inputEmail));
    }
    const createRandomCode = () => {
        return (String(Math.floor(Math.random() * 1000000)).padStart(6, "0"));
    }

    const checkRandomCode = () => {
        if (!verificationCode) {
            Alert.alert('오류', '인증번호를 입력해주세요.');
            return;
        }
        if (verificationCode === generatedCode) {
            setCodeSent(true);
            Alert.alert('성공', '인증번호가 확인되었습니다.', [
                {
                    text: '확인',
                    onPress: () => navigation.navigate('PasswordResetScreen', { userEmail: email })
                }
            ]);
        } else {
            Alert.alert('오류', '인증번호가 일치하지 않습니다.');
        }
    }

    const emailAuthentication = async() => {
        if (!emailValid) {
            Alert.alert('오류', '유효한 이메일 주소를 적어주세요.');
            return;
        }
        const code = createRandomCode();
        setGeneratedCode(code);
        let dataToSend = { user_email: email, randomCode: code };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        try {
            const response = await fetch(PreURL.preURL + '/api/emailAuth', {
                method: 'POST',
                body: formBody,
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                },
            });
            const responseJson = await response.json();

            if (responseJson.success) {
                Alert.alert('성공', '인증 메일이 전송되었습니다.');
            } else {
                Alert.alert('오류', responseJson.message || '메일 전송 실패');
            }
        } catch (error) {
            console.error(error);
        }
    };
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
            height: 30,
            borderColor: '#ccc',
            borderWidth: 1,
            marginBottom: 10,
            paddingHorizontal: 10,
            borderRadius: 8,
        },
        button: {
            backgroundColor: '#4e9bde',
            paddingVertical: 10,
            borderRadius: 10,
            marginTop: 10,
        },
        buttonText: {
            color: '#fff',
            textAlign: 'center',
            fontSize: 18,
        },
    });

    return (
        <SafeAreaView style={[styles.container]}>
            <ScrollView>
                <Text style={styles.title}>비밀번호 재설정</Text>
                <View style={{ flexDirection: 'row' }}>
                    <TextInput
                        value={email}
                        onChangeText={(email) => { emailCheck(email); }}
                        placeholder="이메일 주소"
                        style={styles.input}
                        editable={!checkCode}
                        autoCapitalize="none"
                    />
                </View>
                <TouchableOpacity onPress={emailAuthentication} style={styles.button}>
                    <Text style={styles.buttonText}>인증번호 전송</Text>
                </TouchableOpacity>
                <View>
                    <TextInput
                        placeholder="인증번호"
                        editable={!checkCode}
                        style={styles.input}
                        onChangeText={(code) => setVerificationCode(code)}
                    />
                    <TouchableOpacity onPress={checkRandomCode} style={styles.button}>
                        <Text style={styles.buttonText}>인증번호 확인</Text>
                    </TouchableOpacity>
    
                    {checkCode && (
                <>
                </>
            )}
            </View>
        </ScrollView>
    </SafeAreaView>
    );
}

export default ForgotPasswordScreen;
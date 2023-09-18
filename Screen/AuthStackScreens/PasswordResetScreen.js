import React, { useState, useEffect  } from 'react';
import {SafeAreaView, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles';
// 비밀번호 정규식 검사는 나중에. 로그인하기 편하게 일단 빼둠
const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/;
const PasswordResetScreen = ({ route, navigation }) => {
    const [newPassword, setNewPassword] = useState(''); // 새로운 비밀번호
    const [checkPassword, setCheckPassword] = useState(''); // 확인 비밀번호
    const userEmail = route.params;
    const [passwordValid, setPasswordValid] = useState(null); // 비밀번호 유효성 검사
    const [doubleCheck, setDoubleCheck] = useState(null); // 비밀번호 일치하는지 검사

    const passwordCheck = password => {
        setPasswordValid(passwordRegEx.test(password));
      };
      const passwordDoubleCheck = checkPassword => {
        setCheckPassword(checkPassword);
        setDoubleCheck(newPassword == checkPassword);
      };
    const handlePasswordReset = async () => {
        if (!passwordValid) {
            return Alert.alert('오류', '비밀번호는 특수문자,영문,숫자가 포함되어야 합니다');
        }
        if (!doubleCheck) {
            return Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
        }
        const response = await fetch(PreURL.preURL + '/api/auth/resetPassword', {
            method: 'POST',
            body: JSON.stringify({
                user_email: userEmail,
                newPassword: newPassword
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if (data.success) {
            Alert.alert('성공', `${data.message}`)
            navigation.replace('Auth')
        } else {
            Alert.alert('오류', `${data.message}`)
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <Text style={[styles.title, {top:20}]}>새로운 비밀번호를 입력해주세요.</Text>
            {newPassword &&(<Text style={[styles.PretendardRegular, {position:'absolute',top:60, right:"3%", color:'#ff2f2f'}]}>
                {passwordValid == null ? '' : passwordValid ? 'OK' :'숫자, 영문, 특수문자(@$#!%*?&)를 포함해야 합니다.'}
            </Text>)}
            <TextInput
                placeholder="새로운 비밀번호"
                secureTextEntry
                style={[styles.Input, {top:83}]}
                onChangeText={(newPassword) => {
                    setNewPassword(newPassword)
                    passwordCheck(newPassword);
                    if(newPassword === checkPassword){
                      setDoubleCheck(true)
                    }else{
                      setDoubleCheck(false)
                    }
                }}
            />
            
            {checkPassword && (<Text style={[styles.PretendardRegular, {position:'absolute',top:137, right:"3%", color:'#ff2f2f'}]}>
                {doubleCheck == null ? '' : doubleCheck ? 'OK' : '비밀번호가 일치하지 않습니다.'}
            </Text>)}
            <TextInput
                placeholder="비밀번호 확인"
                secureTextEntry
                style={[styles.Input, {top:160}]}
                onChangeText={(confirmPassword) => {
                    passwordDoubleCheck(confirmPassword)
                }}
            />
            
            <TouchableOpacity onPress={handlePasswordReset} style={[styles.touchbox, {top: 223}]}>
                <Text style={styles.buttonText}>비밀번호 재설정</Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
}


export default PasswordResetScreen;
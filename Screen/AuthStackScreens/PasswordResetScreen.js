import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import PreURL from '../../PreURL/PreURL';
// 비밀번호 정규식 검사는 나중에. 로그인하기 편하게 일단 빼둠
const passwordRegEx = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;
const PasswordResetScreen = ({ route,navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userEmail = route.params;

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            return Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
        }
        if (String(newPassword).length < 8) {
            return Alert.alert('오류','비밀번호는 8자 이상으로 설정해주세요.');
        }
        const response = await fetch(PreURL.preURL + '/api/auth/resetPassword', {
            method: 'POST',
            body: JSON.stringify({
                user_email : userEmail,
                newPassword : newPassword
            }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        const data = await response.json()
        if(data.success){
            Alert.alert('성공',`${data.message}`)
            navigation.replace('Auth')
        }else{
            Alert.alert('오류',`${data.message}`)
        }
    }

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>비밀번호 재설정</Text>
            
            <TextInput
                placeholder="새로운 비밀번호"
                secureTextEntry
                style={styles.input}
                onChangeText={setNewPassword}
            />

            <TextInput
                placeholder="비밀번호 확인"
                secureTextEntry
                style={styles.input}
                onChangeText={setConfirmPassword}
            />
            
            <TouchableOpacity onPress={handlePasswordReset} style={styles.button}>
                <Text style={styles.buttonText}>비밀번호 재설정</Text>
            </TouchableOpacity>
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#fff',
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

export default PasswordResetScreen;
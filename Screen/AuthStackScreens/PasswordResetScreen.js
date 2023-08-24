import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import PreURL from '../../PreURL/PreURL';

const PasswordResetScreen = ({ route,navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const userEmail = route.params.userEmail;

    const handlePasswordReset = async () => {
        if (newPassword !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        if (!newPassword || !confirmPassword) {
            Alert.alert('새로운 비밀번호와 확인 비밀번호는 필수입니다.');
            return;
        }

        if (String(newPassword).length < 8 || String(confirmPassword).length < 8) {
            Alert.alert('비밀번호는 8자 이상으로 생성해주세요.');
            return;
        }
        
        const User = require('../models/User')
        const user = await User.findOne({ userEmail });
        const passwordMatch = await bcrypt.compare(newPassword, user.user_password);
        if (passwordMatch) {
            Alert.alert('이전과 다른 비밀번호를 설정해주세요.');
            return;
        }

        fetch(PreURL.preURL + '/api/auth/resetPassword', {
            method: 'POST',
            body: JSON.stringify({user_email: userEmail, new_password: newPassword, confirm_password: confirmPassword}),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => {
            console.log("Server Response: ", response); 
            if(response.ok) {
                return response.json();
            } else {
                if (response.headers.get('Content-Type').startsWith('text/html')) {
                    return Promise.reject('Invalid server response');
                }
                return response.json().then(err => Promise.reject(err));
            }
        })
        .then((responseJson) => {
            if (responseJson.success) {
                Alert.alert('성공', '비밀번호가 성공적으로 변경되었습니다.', [
                    { text: '확인', onPress: () => navigation.navigate('LoginScreen') }
                ]);
            } else {
                Alert.alert('오류', responseJson.message || '비밀번호 변경 실패');
            }
        })
        .catch(error => console.error(error));
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
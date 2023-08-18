import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';
import PreURL from '../../PreURL/PreURL';

const PasswordResetScreen = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');

    const handlePasswordReset = async () => {
        fetch(PreURL.preURL + '/api/resetPassword', {
            method: 'POST',
            body: JSON.stringify({ password: newPassword }),
            headers: {
                'Content-Type': 'application/json',
            },
        })
        .then((response) => response.json())
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
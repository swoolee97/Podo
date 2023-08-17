import React, { useState } from 'react';
import { View, TextInput, Button, Alert, StyleSheet } from 'react-native';

const PasswordResetScreen = ({ navigation }) => {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleResetPassword = async () => {
        if (password !== confirmPassword) {
            Alert.alert('오류', '비밀번호가 일치하지 않습니다.');
            return;
        }

        try {
            const response = await fetch('/api/auth/password/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ password }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('성공', '비밀번호가 성공적으로 재설정되었습니다.');
                navigation.navigate('LoginScreen');
            } else {
                Alert.alert('오류', data.message);
            }
        } catch (error) {
            console.error('Error during password reset:', error);
            Alert.alert('오류', '비밀번호 재설정 중 문제가 발생했습니다.');
        }
    };

    return (
        <View style={styles.container}>
            <TextInput
                value={password}
                onChangeText={setPassword}
                placeholder="새로운 비밀번호"
                secureTextEntry
                style={styles.input}
            />
            <TextInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="비밀번호 확인"
                secureTextEntry
                style={styles.input}
            />
            <Button title="비밀번호 재설정" onPress={handleResetPassword} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20
    },
    input: {
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        padding: 8
    }
});

export default PasswordResetScreen;

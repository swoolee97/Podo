import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, StyleSheet, Alert, TouchableOpacity, ScrollView } from 'react-native';

const ForgotPasswordScreen = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const emailRegEx = /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

    const handleRequestReset = async () => {
        try {
            const response = await fetch('/api/auth/login/reset', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('성공', '비밀번호 재설정 메일이 전송되었습니다.');
                navigation.navigate('PasswordResetScreen');
            } else {
                Alert.alert('오류', data.message);
            }
        } catch (error) {
            console.error('Error during password reset request:', error);
            Alert.alert('오류', '비밀번호 재설정 요청 중 문제가 발생했습니다.');
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
                <View>
                    <TextInput
                        value={email}
                        onChangeText={setEmail}
                        placeholder="이메일 주소"
                        style={styles.input}
                    />
                </View>
                <TouchableOpacity
                    onPress={handleRequestReset}
                    style={styles.button}
                >
                    <Text style={styles.buttonText}>확인</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

export default ForgotPasswordScreen;

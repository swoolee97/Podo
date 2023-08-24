import React, { useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [checkCode, setCheckCode] = useState(false);

  const emailRegEx =
    /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;

  const emailCheck = inputEmail => {
    setEmail(inputEmail);
    setEmailValid(emailRegEx.test(inputEmail));
  };
  const createRandomCode = () => {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  };

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
          onPress: () => navigation.navigate('PasswordResetScreen',email),
        },
      ]);
    } else {
      Alert.alert('오류', '인증번호가 일치하지 않습니다.');
    }
  };

  const emailAuthentication = async () => {
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
    const response = await fetch(PreURL.preURL + '/api/emailAuth', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
    const data = await response.json()
    if(data.success){
      Alert.alert('성공', '인증 메일이 전송되었습니다.');
    }else{
      Alert.alert('오류', data.message || '메일 전송 실패');
    }
  };
  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <Text style={styles.title}>회원가입한 이메일을 입력해주세요.</Text>

        <View>
          <TextInput
            placeholder="이메일 주소"
            value={email}
            editable={!checkCode}
            style={styles.input}
            onChangeText={email => {
              emailCheck(email);
            }}
          />
        </View>

        <View>
          <TextInput
            placeholder="인증번호"
            editable={!checkCode}
            style={styles.input}
            onChangeText={code => setVerificationCode(code)}
          />
          <TouchableOpacity onPress={emailAuthentication} style={styles.button}>
            <Text style={styles.buttonText}>인증번호 전송</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={checkRandomCode} style={styles.button}>
            <Text style={styles.buttonText}>인증번호 확인</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

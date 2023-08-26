import React, { useState, useEffect,useRef } from 'react';
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
import timer from '../../CommonMethods/timer';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [checkCode, setCheckCode] = useState(false);
  const { timeRemaining, isExpired, startTimer } = timer(300);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };
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
    if(isExpired){
      return Alert.alert('오류','인증번호 유효기간 만료')
    }
    if(!codeSent){
      return Alert.alert('오류','인증번호 전송 후 시도해주세요')
    }
    if (!verificationCode) {
      return Alert.alert('오류', '인증번호를 입력해주세요.');
    }
    if (verificationCode === generatedCode) {
      // setCodeSent(true);
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
    setCodeSent(true)
    if (!emailValid) {
      Alert.alert('오류', '유효한 이메일 주소를 적어주세요.');
      return;
    }
    const code = createRandomCode();
    setGeneratedCode(code);
    let dataToSend = { user_email: email, randomCode: code, purpose : 'password' };
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
      startTimer();
      Alert.alert('성공', '인증 메일이 전송되었습니다.');
    }else{
      Alert.alert('오류', data.message || '메일 전송 실패');
      setCodeSent(false)
    }
  };
  return (
    <SafeAreaView style={[styles.container]}>
        <Text style={[styles.title, {top:20}]}>회원가입한 이메일을 입력해주세요.</Text>
        <TextInput
          placeholder="이메일 주소"
          value={email}
          editable={!codeSent}
          style={[styles.Input, {top:70}]}
          onChangeText={email => {
          emailCheck(email);
          }}
        />        
        <TextInput
          placeholder="인증번호"
          editable={!checkCode}
          style={[styles.Input, {top:220}]}
          onChangeText={code => setVerificationCode(code)}
         />
         
        <TouchableOpacity onPress={ () => {
          emailAuthentication();
          // clearInterval()
          
        }} style={[styles.touchbox, {top: 130}]}>
          <Text style={[styles.PretendardBold, {color: '#ffffff', fontSize:16}]}>인증번호 전송</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={checkRandomCode}style={[styles.touchbox, {top: 280}]}>
          <Text style={styles.PretendardBold}>인증번호 확인</Text>
        </TouchableOpacity>
        <Text style = {[styles.title,{top : 330}]}>{formatTime(timeRemaining)}</Text>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

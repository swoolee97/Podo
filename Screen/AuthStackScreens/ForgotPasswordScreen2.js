import React, {useState, useEffect, useRef} from 'react';
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

const ForgotPasswordScreen = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [codeSent, setCodeSent] = useState(false);
  const [emailValid, setEmailValid] = useState(null);
  const [checkCode, setCheckCode] = useState(false);
  const {timeRemaining, isExpired, startTimer} = timer(300);

  const formatTime = seconds => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec
      .toString()
      .padStart(2, '0')}`;
  };

  const createRandomCode = () => {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  };

  const checkRandomCode = () => {
    if (isExpired) {
      return Alert.alert('오류', '인증번호 유효기간 만료');
    }
    if (!codeSent) {
      return Alert.alert('오류', '인증번호 전송 후 시도해주세요');
    }
    if (!verificationCode) {
      return Alert.alert('오류', '인증번호를 입력해주세요.');
    }
    if (verificationCode === generatedCode) {
      // setCodeSent(true);
      Alert.alert('성공', '인증번호가 확인되었습니다.', [
        {
          text: '확인',
          onPress: () => navigation.navigate('PasswordResetScreen', email),
        },
      ]);
    } else {
      Alert.alert('오류', '인증번호가 일치하지 않습니다.');
    }
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <Text style={[styles.title, {top: 20}]}>
        회원가입한 이메일을 입력해주세요.
      </Text>
      <TextInput
        placeholder="이메일 주소"
        value={email}
        editable={!codeSent}
        style={[styles.Input, {top: 70}]}
        onChangeText={email => {
          emailCheck(email);
        }}
      />
      <TextInput
        placeholder="인증번호"
        editable={!checkCode}
        style={[styles.Input, {top: 220}]}
        onChangeText={code => setVerificationCode(code)}
      />

      <TouchableOpacity style={[styles.touchbox, {top: 130}]}>
        <Text style={[styles.PretendardBold, {color: '#ffffff', fontSize: 16}]}>
          인증번호 전송
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => {
          checkRandomCode();
          // 이후에 필요한 다른 동작을 추가할 수 있습니다.
          navigation.navigate('ForgotPasswordScreen'); // 예를 들어 다음 화면으로 이동할 수 있습니다.
          // clearInterval() 또는 다른 동작을 추가할 수 있습니다.
        }}
        style={[styles.touchbox, {top: 280}]}>
        <Text style={styles.PretendardBold}>인증번호 확인</Text>
      </TouchableOpacity>

      <Text style={[styles.title, {top: 330}]}>
        {formatTime(timeRemaining)}
      </Text>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

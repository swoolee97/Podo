import React, {useState} from 'react';
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

const ForgotPasswordScreen = ({navigation}) => {
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

  const emailAuthentication = async () => {
    if (!emailValid) {
      Alert.alert('오류', '유효한 이메일 주소를 적어주세요.');
      return;
    }
    formBody = formBody.join('&');
    fetch(PreURL.preURL + '/api/emailAuth', {
      method: 'POST',
      body: formBody,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(responseJson => {
        if (responseJson.success) {
          Alert.alert('성공', '인증 메일이 전송되었습니다.');
        } else {
          Alert.alert('오류', responseJson.message || '메일 전송 실패');
        }
      })
      .catch(error => console.error(error));
  };
  const handleButtonPress = () => {
    // emailAuthentication 관련 로직 추가 (인증번호 전송 등)
    emailAuthentication(); // 기존의 emailAuthentication 함수를 실행

    // 화면 전환
    navigation.navigate('ForgotPasswordScreen2');
  };

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>
        <Text style={[styles.title, {marginTop: 20}]}>
          회원가입한 이메일을 입력해주세요.
        </Text>

        <View style={styles.input}>
          <TextInput
            placeholder="이메일 주소"
            value={email}
            editable={!checkCode}
            onChangeText={email => {
              emailCheck(email);
            }}
          />
        </View>

        <View style={styles.button}>
          <TouchableOpacity onPress={handleButtonPress}>
            <Text style={styles.buttonText}>인증번호 전송</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default ForgotPasswordScreen;

import React from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  Touchable,
} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/Styles.js';

const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
const passwordRegEx = /^[A-Za-z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,20}$/;

const RegisterScreen = ({navigation}) => {
  const PreURL = require('../../PreURL/PreURL');
  const [userPassword, setUserPassword] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [doubleCheck, setDoubleCheck] = useState(null);
  const [randomCode, setRandomCode] = useState(null);
  const [emailAuthCode, setEmailAuthCode] = useState(null);
  const [checkCode, setCheckCode] = useState(false);

  const emailCheck = email => {
    setUserEmail(email);
    setEmailValid(emailRegEx.test(email));
  };

  const passwordCheck = password => {
    setUserPassword(password);
    setPasswordValid(passwordRegEx.test(password));
  };
  const passwordDoubleCheck = checkPassword => {
    setCheckPassword(checkPassword);
    setDoubleCheck(userPassword == checkPassword);
  };
  const createRandomCode = () => {
    return String(Math.floor(Math.random() * 1000000)).padStart(6, '0');
  };
  const checkRandomCode = () => {
    if (randomCode == emailAuthCode) {
      setCheckCode(true);
      console.log('인증 선공');
    } else console.log('인증 실패');
  };

  const emailAuthentication = () => {
    if (!emailValid) {
      console.log('유효한 이메일 주소를 적어주세요');
      return;
    } else {
      // 6자리 인증번호 생성
      const code = createRandomCode();
      setRandomCode(code);
      let dataToSend = {user_email: userEmail, randomCode: code};
      let formBody = [];
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(PreURL.preURL + '/api/emailAuth', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => {
          response.json();
        })
        .then(responseJson => {
          console.log(responseJson);
        });
    }
  };
  const registerSubmit = () => {
    if (!emailValid) {
      console.log('유효한 이메일 주소를 입력해주세요');
      return;
    } else if (!passwordValid) {
      console.log('비밀번호 재설정');
      return;
    } else if (!doubleCheck) {
      console.log('비밀번호를 다시 확인해주세요');
      return;
    } else if (randomCode != emailAuthCode) {
      console.log('인증번호를 확인해 주세요');
      return;
    }
    let dataToSend = {
      user_email: userEmail,
      user_pw: userPassword,
      check_password: checkPassword,
    };
    let formBody = []; // 1
    for (let key in dataToSend) {
      let encodedKey = encodeURIComponent(key);
      let encodedValue = encodeURIComponent(dataToSend[key]);
      formBody.push(encodedKey + '=' + encodedValue);
    }
    const checkRandomCode = () => {
        if (randomCode == emailAuthCode) {
            setCheckCode(true)
            console.log('인증 성공')
        } else
            console.log('인증 실패')
    }

    const emailAuthentication = () => {
      if (!emailValid) {
        console.log('유효한 이메일 주소를 적어주세요');
        return;
      } else {
        // 6자리 인증번호 생성
        const code = createRandomCode();
        setRandomCode(code);
        let dataToSend = {user_email: userEmail, randomCode: code};
        let formBody = [];
        for (let key in dataToSend) {
          let encodedKey = encodeURIComponent(key);
          let encodedValue = encodeURIComponent(dataToSend[key]);
          formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        fetch(PreURL.preURL + '/api/emailAuth', {
          method: 'POST',
          body: formBody,
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          },
        })
          .then(response => {
            response.json();
          })
          .then(responseJson => {
            console.log(responseJson);
          });
      }
    };
    const registerSubmit = () => {
      if (!emailValid) {
        console.log('유효한 이메일 주소를 입력해주세요');
        return;
      } else if (!passwordValid) {
        console.log('비밀번호 재설정');
        return;
      } else if (!doubleCheck) {
        console.log('비밀번호를 다시 확인해주세요');
        return;
      } else if (randomCode != emailAuthCode) {
        console.log('인증번호를 확인해 주세요');
        return;
      }
      let dataToSend = {
        user_email: userEmail,
        user_pw: userPassword,
        check_password: checkPassword,
      };
      let formBody = []; // 1
      for (let key in dataToSend) {
        let encodedKey = encodeURIComponent(key);
        let encodedValue = encodeURIComponent(dataToSend[key]);
        formBody.push(encodedKey + '=' + encodedValue);
      }
      formBody = formBody.join('&');
      fetch(PreURL.preURL + '/api/auth/register', {
        method: 'POST',
        body: formBody,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
        },
      })
        .then(response => response.json())
        .then(async responseJson => {
          if (responseJson.register) {
            console.log(responseJson);
            AsyncStorage.setItem('user_email', responseJson.user_email);
            AsyncStorage.setItem('accessToken', responseJson.accessToken);
            navigation.replace('Main');
          } else {
            Alert.alert('회원가입 실패');
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
  };
  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.lefttext, {top:140}]} >
        이메일
      </Text>
      <TextInput 
        editable={!checkCode}
        onChangeText={userEmail => {emailCheck(userEmail)}}
        style={[styles.smallInput, {top: 163}]}
      />

      <Text style={[styles.PretendardRegular, {position:'absolute',top:140, right:"36%", color:'#ff2f2f'}]}>
        {emailValid == null ? '' : emailValid ? 'OK' : '올바른 이메일 형식이 아닙니다.'}
        </Text>  

      <TouchableOpacity 
        disabled={checkCode} 
        onPress={() => {emailAuthentication();}}
        style={[styles.smalltouchbox, {top:163}]}>
        <Text style={styles.buttonText}>
          인증번호 전송
        </Text>
      </TouchableOpacity>

      <Text style={[styles.lefttext, {top:223}]} >
        인증번호
      </Text>   

      <TextInput
        editable={!checkCode}
        onChangeText={emailAuthCode => setEmailAuthCode(emailAuthCode)}
        style={[styles.smallInput, {top:246}]}
      />
      <TouchableOpacity
        disabled={checkCode}
        onPress={() => {checkRandomCode();}}
        style={[styles.smalltouchbox, {top:246}]}>
        <Text style={styles.buttonText}>
          인증번호 확인
        </Text>
      </TouchableOpacity>
    
      <Text style={[styles.lefttext, {top:306}]} >
        비밀번호
      </Text>  

      <Text style={[styles.PretendardRegular, {position:'absolute',top:306, right:"3%", color:'#ff2f2f'}]}>
        {passwordValid == null ? '' : passwordValid ? 'OK' : '비밀번호는 8자리 이상이여야 합니다.'}
      </Text>

      <TextInput
        secureTextEntry
        onChangeText={userPassword => {
          passwordCheck(userPassword);
        }}
        style={[styles.Input, {top: 329}]}
      />
      
  
      <Text style={[styles.lefttext, {top:389}]} >
        비밀번호 확인
      </Text>  
      <Text style={[styles.PretendardRegular, {position:'absolute',top:389, right:"3%", color:'#ff2f2f'}]}>
        {doubleCheck == null ? '' : doubleCheck ? 'OK' : 'X'}
      </Text>
      <TextInput
        secureTextEntry
        onChangeText={checkPassword => {
          passwordDoubleCheck(checkPassword);
        }}
        style={[styles.Input, {top: 412}]}
      />
      
      <TouchableOpacity
        onPress={registerSubmit}
        style={[styles.touchbox, {top: 495}]}>
        <Text style={styles.buttonText}>회원가입</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default RegisterScreen;

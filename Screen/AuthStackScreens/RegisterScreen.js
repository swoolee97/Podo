import React from 'react';
import {Alert} from 'react-native';
import {
  SafeAreaView,
  Text,
  TextInput,
} from 'react-native';
import {TouchableOpacity} from 'react-native';
import {useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles from '../Styles/Styles.js';
import FocusableInput from '../Styles/FocusableInput.js';
import timer from '../../CommonMethods/timer.js';
const emailRegEx =
  /^[A-Za-z0-9]([-_.]?[A-Za-z0-9])*@[A-Za-z0-9]([-_.]?[A-Za-z0-9])*\.[A-Za-z]{2,3}$/i;
  const passwordRegEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$#!%*?&])[A-Za-z\d@$#!%*?&]{8,20}$/;

const RegisterScreen = ({navigation}) => {
  const PreURL = require('../../PreURL/PreURL');
  const [userPassword, setUserPassword] = useState(null);
  const [userEmail, setUserEmail] = useState(null);
  const [emailValid, setEmailValid] = useState(null);
  const [passwordValid, setPasswordValid] = useState(null);
  const [checkPassword, setCheckPassword] = useState(null);
  const [doubleCheck, setDoubleCheck] = useState(null); // 비밀번호와 비밀번호 확인이 일치하는지
  const [randomCode, setRandomCode] = useState(null);
  const [emailAuthCode, setEmailAuthCode] = useState(null);
  const [checkCode, setCheckCode] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const { timeRemaining, isExpired, startTimer } = timer(300);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60);
    const sec = seconds % 60;
    return `${min.toString().padStart(2, '0')}:${sec.toString().padStart(2, '0')}`;
  };

  const emailCheck = email => {
    setUserEmail(email);
    setEmailValid(emailRegEx.test(email));
  };

  const passwordCheck = password => {
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
    if(isExpired) return Alert.alert('오류','인증번호 유효기간 만료')
    if (randomCode == emailAuthCode) {
      setCheckCode(true);
      setIsAuthenticated(true); 
      Alert.alert('성공','인증되었습니다')
    } else Alert.alert('오류','인증번호를 확인해주세요');
  };

  const emailAuthentication = async () => {
    setCodeSent(true)
    if (!emailValid) {
      setCodeSent(false)
      return Alert.alert('오류','유효한 이메일주소를 입력해주세요')
    } else {
      // 6자리 인증번호 생성
      const code = createRandomCode();
      setRandomCode(code);
      let dataToSend = {user_email: userEmail, randomCode: code, purpose : 'register'};
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
      const data = await response.json();
      if(data.success){
        startTimer();
        Alert.alert('성공','인증번호가 전송되었습니다')
      }else{
        setCodeSent(false)
        Alert.alert('오류', `${data.message}`)
      }
    }
  };

    const registerSubmit = () => {
      if (!emailValid) {
        return Alert.alert('오류','유효한 이메일주소를 입력해주세요');
      }else if (!checkCode) {
        return Alert.alert('오류','이메일 인증을 해주세요')
      }else if (!passwordValid) {
        return Alert.alert('오류','비밀번호 형식을 확인해주세요');
      } else if (!doubleCheck) {
        return Alert.alert('오류','비밀번호를 확인해주세요')
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
            AsyncStorage.setItem('user_email', responseJson.user_email);
            AsyncStorage.setItem('accessToken', responseJson.accessToken);
            Alert.alert('성공',`${responseJson.message}`)
            navigation.replace('Main');
          } else {
            Alert.alert('실패',`${responseJson.message}`);
          }
        })
        .catch(error => {
          console.error(error);
        });
    };
    return (
      <SafeAreaView style={styles.container}>
        <Text style={[styles.lefttext, {top:140}]} >
          이메일
        </Text>
        
        <FocusableInput 
          editable={!codeSent}
          onChangeText={userEmail => {emailCheck(userEmail)}}
          style={[styles.smallInput, {top: 163}]}
        />
  
        {userEmail && (<Text style={[styles.PretendardRegular, {position:'absolute',top:140, right:"35%", color: emailValid ? '#3BCDA1' : '#ff2f2f'}]}>
          {emailValid ? 'OK' : '올바른 이메일 형식이 아닙니다.'}
        </Text>)}
  
        <TouchableOpacity
          disabled={!userEmail || checkCode} 
          onPress={() => {emailAuthentication();}}
          style={[styles.smalltouchbox, {top:163, backgroundColor: (userEmail && !codeSent) ? '#3BCDA1' : '#CECECE'}]}>
          <Text style={styles.buttonText}>
            인증번호 전송
          </Text>
        </TouchableOpacity>
  
        <Text style={[styles.lefttext, {top:223}]} >
          인증번호
        </Text>
        {codeSent && !isAuthenticated && (   
          <Text style={[styles.timeout, {top:223}]} >
            {formatTime(timeRemaining)}
          </Text>
        )}
        {isAuthenticated && (<Text style={[styles.PretendardRegular, {position:'absolute',top:223, right:"35%", color:'#3BCDA1'}]}>
          인증완료
        </Text>)}
        <FocusableInput
          editable={codeSent && !checkCode}
          onChangeText={emailAuthCode => setEmailAuthCode(emailAuthCode)}
          style={[styles.smallInput, {top:246}]}>
        </FocusableInput>
        <TouchableOpacity
          disabled={!codeSent || !emailAuthCode || checkCode}
          onPress={() => {checkRandomCode();}}
          style={[styles.smalltouchbox, {top:246, backgroundColor: (emailAuthCode && codeSent && !checkCode) ? '#3BCDA1' : '#CECECE'}]}>
          <Text style={styles.buttonText}>
            인증번호 확인
          </Text>
        </TouchableOpacity>
      
        <Text style={[styles.lefttext, {top:306}]} >
          비밀번호
        </Text>  
  
        {userPassword &&(<Text style={[styles.PretendardRegular, {position:'absolute',top:306, right:"3%", color:'#ff2f2f'}]}>
          {passwordValid == null ? '' : passwordValid ? 'OK' :'숫자, 영문, 특수문자(@$#!%*?&)를 포함해야 합니다.'}
        </Text>)}
  
        <FocusableInput
          secureTextEntry
          onChangeText={userPassword => {
            setUserPassword(userPassword)
            passwordCheck(userPassword);
            if(userPassword === checkPassword){
              setDoubleCheck(true)
            }else{
              setDoubleCheck(false)
            }
          }}
          style={[styles.Input, {top: 329}]}
        />
        
    
        <Text style={[styles.lefttext, {top:389}]} >
          비밀번호 확인
        </Text>  
        {checkPassword && (<Text style={[styles.PretendardRegular, {position:'absolute',top:389, right:"3%", color:'#ff2f2f'}]}>
          {doubleCheck == null ? '' : doubleCheck ? 'OK' : '비밀번호가 일치하지 않습니다.'}
        </Text>)}
        <FocusableInput
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

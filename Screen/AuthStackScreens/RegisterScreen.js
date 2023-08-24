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
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
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
        setCheckCode(true);
        console.log('인증 성공');
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
      marginHorizontal: 10,
    },
  });
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView>
        <View>
          <View style={[styles.inputContainer, {marginTop: 100}]}>
            <TextInput
              placeholder="이메일"
              editable={!checkCode}
              onChangeText={userEmail => {
                emailCheck(userEmail);
              }}
              style={styles.input}
            />
            <Text>{emailValid == null ? '' : emailValid ? 'OK' : 'X'}</Text>

            <TouchableOpacity
              disabled={checkCode}
              onPress={() => {
                emailAuthentication();
              }}>
              <Text>인증번호 전송</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="인증번호"
              editable={!checkCode}
              style={styles.input}
              onChangeText={emailAuthCode => setEmailAuthCode(emailAuthCode)}
            />
            <TouchableOpacity
              disabled={checkCode}
              onPress={() => {
                checkRandomCode();
              }}>
              <Text>인증번호 확인</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="비밀번호"
              secureTextEntry
              onChangeText={userPassword => {
                passwordCheck(userPassword);
              }}
              style={styles.input}
            />
            <Text>
              {passwordValid == null ? '' : passwordValid ? 'OK' : 'X'}
            </Text>
          </View>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder="비밀번호 확인"
              secureTextEntry
              onChangeText={checkPassword => {
                passwordDoubleCheck(checkPassword);
              }}
              style={styles.input}
            />
            <Text>{doubleCheck == null ? '' : doubleCheck ? 'OK' : 'X'}</Text>
          </View>
        </View>
        
        <TouchableOpacity
          onPress={registerSubmit}
          style={[styles.button, {marginTop: 20}]}>
          <Text style={styles.buttonText}>회원가입</Text>
        </TouchableOpacity>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default RegisterScreen;

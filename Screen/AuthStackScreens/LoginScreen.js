import {SafeAreaView, Text, View, TextInput, StyleSheet} from 'react-native';
import {Image} from 'react-native';
import {Alert} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import {useState, useContext} from 'react';
import {preURL} from '../../PreURL/PreURL';
import {createStackNavigator} from '@react-navigation/stack';
import RegisterScreen from './RegisterScreen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getProfile, login} from '@react-native-seoul/kakao-login';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';

const LoginScreen = ({navigation}) => {
  const Stack = createStackNavigator();
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const loginSubmit = async () => {
    formdata = {
      user_email: userEmail,
      user_pw: userPassword,
    };

    const response = await fetch(PreURL.preURL + '/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(formdata),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await response.json();
    if (data.login) {
      await AsyncStorage.setItem('user_email', data.user_email);
      await AsyncStorage.setItem('accessToken', data.accessToken);
      navigation.replace('Main');
    } else {
      Alert.alert('로그인 실패 : ', data.message);
    }
  };
  const loginWithKakao = async () => {
    let result = await login();
    if (result) {
      let profile = await getProfile();
      const response = await fetch(preURL + '/api/auth/kakao', {
        method: 'POST',
        body: JSON.stringify(profile),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();

      if (data.login) {
        await AsyncStorage.setItem('user_email', data.user_email);
        await AsyncStorage.setItem('accessToken', data.accessToken);
        navigation.replace('Main');
      } else {
        Alert.alert('로그인 실패');
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.podo}>PODO</Text>
      <Text style={styles.postDonation}>POST DONATION</Text>
      <Text style={styles.emailtext}>이메일</Text>
      <TextInput
        style={styles.emailInput}
        onChangeText={userEmail => {
          setUserEmail(userEmail);
        }}
      />

      <Text style={styles.passwordtext}>비밀번호</Text>
      <TextInput
        style={styles.passwordInput}
        onChangeText={userPassword => {
          setUserPassword(userPassword);
        }}
        secureTextEntry
      />

      <View style={styles.loginbox}>
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => {
            loginSubmit();
          }}>
          <Text style={styles.loginText}>로그인</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.registerText}>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text>회원가입</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.kakaoButton}>
        <TouchableOpacity
          style={styles.kakaoButton2}
          onPress={() => loginWithKakao()}>
          {/* <Image
            source={require('../../images/KakaoTalk_logo.png')}
            style={styles.kakaoIcon}
          /> */}
          <Text style={styles.kakaoText}>카카오 로그인</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.passwordText}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}>
          <Text>비밀번호 찾기</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default LoginScreen;

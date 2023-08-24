import {createStackNavigator} from '@react-navigation/stack';
import React, {useState} from 'react';
import LoginScreen from '../AuthStackScreens/LoginScreen';
import RegisterScreen from '../AuthStackScreens/RegisterScreen';
import ForgotPasswordScreen from '../AuthStackScreens/ForgotPasswordScreen';
import ForgotPasswordScreen2 from '../AuthStackScreens/ForgotPasswordScreen2';
import PasswordResetScreen from '../AuthStackScreens/PasswordResetScreen';

const AuthStackScreen = ({}) => {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="LoginScreen">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{
          title: '로그인', // 타이틀 설정
          headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
          headerTitleStyle: {
            fontWeight: 'bold', // 헤더 타이틀 굵게 설정
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={{
          title: '회원가입', // 타이틀 설정
          headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
          headerTitleStyle: {
            fontWeight: 'bold', // 헤더 타이틀 굵게 설정
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="ForgotPasswordScreen"
        component={ForgotPasswordScreen}
        options={{
          title: '비밀번호 찾기', // 타이틀 설정
          headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
          headerTitleStyle: {
            fontWeight: 'bold', // 헤더 타이틀 굵게 설정
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="ForgotPasswordScreen2"
        component={ForgotPasswordScreen2}
        options={{
          title: '비밀번호 찾기', // 타이틀 설정
          headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
          headerTitleStyle: {
            fontWeight: 'bold', // 헤더 타이틀 굵게 설정
          },
        }}></Stack.Screen>

      <Stack.Screen
        name="PasswordResetScreen"
        component={PasswordResetScreen}
        options={{
          title: '비밀번호 초기화', // 타이틀 설정
          headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}></Stack.Screen>
    </Stack.Navigator>
  );
};
export default AuthStackScreen;

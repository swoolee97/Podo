import React, { useState } from "react";
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
import { createStackNavigator } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Stack = createStackNavigator()

const Certification = ({ route, navigation }) => {
  const [cardNumber, setCardNumber] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [cvc, setCvc] = useState('');
  const [password, setPassword] = useState('');

  const handleInputChange = (text, setValue, maxLength) => {
    // 숫자만 포함된 문자열로 필터링
    const filteredText = text.replace(/[^0-9]/g, '');
    setValue(filteredText);
    if (filteredText.length <= maxLength) {
      setValue(filteredText);
    } else {
      // 길이를 초과할 경우 마지막 입력을 무시
      setValue(filteredText.substring(0, maxLength));
    }
  };

  const handleSubmitPress = async () => {
    if(cardNumber.length != 16)
      return Alert.alert('카드번호는 16자리입니다')
    if(month.length != 2 || year.length != 2)
      return Alert.alert('유효기간을 확인해주세요')
    if(cvc.length != 3)
      return Alert.alert('cvc번호는 세자리 입니다')
    if(password.length != 4)
      return Alert.alert('비밀번호는 네자리 입니다.')
    const email = await AsyncStorage.getItem('user_email')
    const response = await fetch(PreURL.preURL + '/api/card/certification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        cardNumber, month, year, cvc, password, email
      })
    })
    const data = await response.json();
    if(!data.success){
      Alert.alert(`${data.message}`)
    }else{
      Alert.alert('인증 완료')
      navigation.goBack();
    }
  }

  return (
    <SafeAreaView style={[styles.container]}>
      <ScrollView>

        <View>
          <TextInput
            placeholder="**** - **** - **** - ****"
            value={cardNumber}
            onChangeText={(text) => handleInputChange(text, setCardNumber, 16)}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="MM"
            value={month}
            onChangeText={(text) => handleInputChange(text, setMonth, 2)}
            style={styles.input}
          />
          <TextInput
            placeholder="YY"
            value={year}
            onChangeText={(text) => handleInputChange(text, setYear, 2)}
            style={styles.input}
          />
        </View>

        <View>
          <TextInput
            placeholder="CVC"
            value={cvc}
            onChangeText={(text) => handleInputChange(text, setCvc, 3)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View>
          <TextInput
            placeholder="비밀번호"
            value={password}
            onChangeText={(text) => handleInputChange(text, setPassword, 4)}
            style={styles.input}
            secureTextEntry
          />
        </View>

        <View>
          <TouchableOpacity style={styles.button}
            onPress={
              () => {
                handleSubmitPress();
              }}>
            <Text>확인</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

export default Certification



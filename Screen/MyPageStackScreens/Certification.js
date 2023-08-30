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

const Stack = createStackNavigator()

const Certification = ({ route, navigation }) => {
    const [value1, setValue1] = useState('');
    const [value2, setValue2] = useState('');
    const [value3, setValue3] = useState('');
    const [value4, setValue4] = useState('');

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

    return (
        <SafeAreaView style={[styles.container]}>
          <ScrollView>

            <View>
              <Text style={styles.title}>아동급식카드 번호</Text>
              <TextInput
                placeholder="**** - **** - **** - ****"
                value={value1}
                onChangeText={(text) => handleInputChange(text, setValue1, 16)}
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.title}>카드 유효기간</Text>
              <TextInput
                placeholder="MM/YY"
                value={value2}
                onChangeText={(text) => handleInputChange(text, setValue2, 4)}
                style={styles.input}
              />
            </View>

            <View>
              <Text style={styles.title}>CVC</Text>
              <TextInput
                placeholder="***"
                value={value3}
                onChangeText={(text) => handleInputChange(text, setValue3, 3)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View>
              <Text style={styles.title}>카드 비밀번호</Text>
              <TextInput
                placeholder=""
                value={value4}
                onChangeText={(text) => handleInputChange(text, setValue4, 20)}
                style={styles.input}
                secureTextEntry
              />
            </View>

            <View>
              <TouchableOpacity style={styles.button}>
                <Text style={styles.buttonText}>확인</Text>
              </TouchableOpacity>
            </View>
            
          </ScrollView>
        </SafeAreaView>
    );
}

export default Certification



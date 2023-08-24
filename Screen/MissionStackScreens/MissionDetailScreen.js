import React, { useState } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert} from 'react-native';

const MissionDetailScreen = ({ route, navigation }) => {
  const { mission } = route.params;
  const [inputText, setInputText] = useState('');
  const [answers, setAnswers] = useState([]);

  const handleSubmit = () => {
    if (!inputText) {
      Alert.alert('오류', '텍스트를 입력해주세요.');
      return;
    }

    const newAnswers = [...answers, inputText];
    setAnswers(newAnswers);
    setInputText('');

    Alert.alert('성공', '제출이 완료되었습니다.', [
      {
        text: '확인',
        onPress: () => navigation.navigate('AnswerListScreen', { answers: newAnswers })
      }
    ]);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{mission.title}</Text>
        <Text>{mission.details}</Text>
      </View>
      <View>
        <TextInput
          value={inputText}
          onChangeText={text => setInputText(text)}
          placeholder="여기에 텍스트를 입력하세요"
        />
        <Button
          title="제출"
          onPress={handleSubmit}
        />
      </View>
    </SafeAreaView>
  );
};

export default MissionDetailScreen;
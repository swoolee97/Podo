import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, TextInput, Button, Alert, FlatList } from 'react-native';
import { useMissions } from './MissionContents';

const MissionDetailScreen = ({ route, navigation }) => {
  const { mission } = route.params;
  const [inputText, setInputText] = useState('');
  const [answers, setAnswers] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { completedMissions, setCompletedMissions } = useMissions();

  useEffect(() => {
    // 초기 로드시 해당 미션에 대한 완료된 답변이 있는지 확인하고, 있다면 상태를 설정
    const completedMission = completedMissions.find(cm => cm.missionId === mission.id);
    if (completedMission) {
      setAnswers(completedMission.answer);
      setIsSubmitted(true);
    }
  }, [mission.id, completedMissions]);
  
  const handleSubmit = () => {
    if (!inputText) {
      Alert.alert('오류', '텍스트를 입력해주세요.');
      return;
    }

    let newAnswers = [...answers];

    // 수정 모드인 경우
    if (editIndex !== null) {
      newAnswers[editIndex] = inputText;
    } else {
      newAnswers = [...answers, inputText];
    }

    setAnswers(newAnswers);
    setInputText('');
    setEditIndex(null);
    setIsSubmitted(true);

    const updatedMissions = completedMissions.filter(item => item.missionId !== mission.id);
    updatedMissions.push({ missionId: mission.id, answer: newAnswers });
    
    setCompletedMissions(updatedMissions);

    Alert.alert('성공', '제출이 완료되었습니다.', [
      {
        text: '확인'
      }
    ]);
  };

  const handleEdit = (index) => {
    setInputText(answers[index]);
    setEditIndex(index);
    setIsSubmitted(false);
  };

  return (
    <SafeAreaView>
      <View>
        <Text>{mission.title}</Text>
        <Text>{mission.details}</Text>
      </View>
      <View>
        {isSubmitted ? (
          <FlatList
            data={answers}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item, index }) => (
              <View>
                <Text>{item}</Text>
                <Button title="수정" onPress={() => handleEdit(index)} />
              </View>
            )}
          />
        ) : (
          <>
            <TextInput
              value={inputText}
              onChangeText={text => setInputText(text)}
              placeholder="여기에 텍스트를 입력하세요"
            />
            <Button title="제출" onPress={handleSubmit} />
          </>
        )}
      </View>
    </SafeAreaView>
  );
};

export default MissionDetailScreen;

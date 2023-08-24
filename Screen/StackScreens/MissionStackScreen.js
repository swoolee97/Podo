import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../MainStackScreens/HomeScreen';
import MissionDetailScreen from '../MissionStackScreens/MissionDetailScreen'; // 미션 리스트
import AnswerListScreen from '../MissionStackScreens/AnswerListScreen'; // 답변 리스트

const MissionStack = createStackNavigator();

const MissionStackScreen = () => {
  return (
    <MissionStack.Navigator initialRouteName="MissionDetailScreen">
      <MissionStack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <MissionStack.Screen name="MissionScreen" component={MissionDetailScreen} />
      <MissionStack.Screen name="AnswerListScreen" component={AnswerListScreen} />
    </MissionStack.Navigator>
  );
};

export default MissionStackScreen;
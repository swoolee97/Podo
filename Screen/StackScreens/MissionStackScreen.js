import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MissionDetailScreen from '../MissionStackScreens/MissionDetailScreen';

const MissionStack = createStackNavigator();

const MissionStackScreen = () => {
  return (
    <MissionStack.Navigator initialRouteName="MissionDetailScreen">
      <MissionStack.Screen name="MissionScreen" component={MissionDetailScreen} />
    </MissionStack.Navigator>
  );
};

export default MissionStackScreen;
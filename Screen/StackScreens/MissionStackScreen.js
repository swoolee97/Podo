import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MissionDetailScreen from '../MissionStackScreens/MissionDetailScreen';

const MissionStack = createStackNavigator();

const MissionStackScreen = () => {

  return (
    <MissionStack.Navigator initialRouteName="MissionDetailScreen">
      <MissionStack.Screen 
      name="MissionDetailScreen" 
      component={MissionDetailScreen}
      options={{
          title: '오늘의 미션',
          headerTitleAlign: 'center',
          headerTitleStyle: {
            fontWeight: 'bold'
          },
      }}/>
    </MissionStack.Navigator>
  );
};

export default MissionStackScreen;
import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import Main from './Main';
const Stack = createStackNavigator()
import { enableScreens } from 'react-native-screens';
import AuthStackScreen from './Screen/StackScreens/AuthStackScreen';
import { MissionProvider } from './Screen/MissionStackScreens/MissionContents';
import MissionStackScreen from './Screen/StackScreens/MissionStackScreen';

enableScreens();
const App = () => {
  return (
    <MissionProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Mission" component={MissionStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </MissionProvider>  
  );
};

export default App;
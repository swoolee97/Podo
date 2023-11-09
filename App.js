import React from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import Main from './Main';
const Stack = createStackNavigator()
import AuthStackScreen from './Screen/StackScreens/AuthStackScreen';
import Toast from 'react-native-toast-message'

const App = () => {
  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={AuthStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
      <Toast/>
    </>
  );
};

export default App;
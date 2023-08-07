import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'

import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import Main from './Main';
import AuthStackScreen from './Screen/StackScreens/AuthStackScreen';

const Stack = createStackNavigator()

const App = () => {
  // rest of the code
  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} options = {{headerShown :false}}/>
        <Stack.Screen name = "Main" component = {Main} options = {{headerShown :false}} />
        <Stack.Screen name = 'Auth' component = {AuthStackScreen} options = {{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
import React from 'react';
import { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native'
import { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './Screen/SplashScreen';
import Main from './Main';
import AuthStackScreen from './Screen/StackScreens/AuthStackScreen';
import { UserProvider } from './userContext';

const Stack = createStackNavigator()

const App = () => {
  // rest of the code
  const [userEmail, setUserEmail] = useState(null)
  return (
    <UserProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName='SplashScreen'>
          <Stack.Screen name="SplashScreen" component={SplashScreen} options={{ headerShown: false }} />
          <Stack.Screen name="Main" component={Main} options={{ headerShown: false }} />
          <Stack.Screen name='Auth' component={AuthStackScreen} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </UserProvider>
  )
}

export default App;
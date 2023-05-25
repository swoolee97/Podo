// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
// import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
// import { createStackNavigator } from '@react-navigation/stack';

// import SplashScreen from './Screen/SplashScreen';
// import HomeScreen from './Screen/HomeScreen';
// import Screen1 from './Screen/Screen1';
// import Screen2 from './Screen/Screen2';
// import Screen3 from './Screen/Screen3';

// const Drawer = createDrawerNavigator();
// const Tab = createBottomTabNavigator();
// const Stack = createStackNavigator();



// const DrawerNavigator = () => (
//   <Drawer.Navigator>
//     <Drawer.Screen name="Home" component={HomeScreen} />
//     <Drawer.Screen name="TabNavigator" component={TabNavigator} />
//   </Drawer.Navigator>
// );

// const App = () => (
//   <NavigationContainer>
//     <Stack.Navigator initialRouteName="SplashScreen">
//       <Stack.Screen
//         name="SplashScreen"
//         component={SplashScreen}
//         options={{ headerShown: false }}
//       />
//       <Stack.Screen
//         name="DrawerNavigator"
//         component={DrawerNavigator}
//         options={{ headerShown: false }}
//       />
//     </Stack.Navigator>
//   </NavigationContainer>
// );

// export default App;
import React, { useState } from 'react';
import { View, Text, SafeAreaView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import SplashScreen from './Screen/SplashScreen';
import Main from './Main';
import LoginScreen from './Screen/AuthStackScreens/LoginScreen';
import RegisterScreen from './Screen/AuthStackScreens/RegisterScreen';

const Stack = createStackNavigator()

const App = () => {
  // rest of the code
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='SplashScreen'>
        <Stack.Screen name = "SplashScreen" component = {SplashScreen} options = {{headerShown :false}}/>
        <Stack.Screen name = "Main" component = {Main} options = {{headerShown :false}} />
        <Stack.Screen name = "LoginScreen" component={LoginScreen} options = {{headerShown : false}}/>
        <Stack.Screen name = "RegisterScreen" component={RegisterScreen} options = {{headerShown : false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App;
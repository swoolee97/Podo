import React from 'react';
import {Button} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import GifticonListScreen from '../GifticonListScreens/GifticonListScreen';
import SearchingResultScreen from '../GifticonListScreens/SearchingResultScreen';
import SearchingScreen from '../GifticonListScreens/SearchingScreen';

import GifticonDetailScreen from '../GifticonListScreens/GifticonDetailScreen';
import PurchaseScreen from '../GifticonListScreens/PurchaseScreen';

import {getFocusedRouteNameFromRoute} from '@react-navigation/native';

const Stack = createStackNavigator();
const SearchingStackScreen = ({navigation, route}) => {
  React.useLayoutEffect(() => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? 'GifticonListScreen';
    if (routeName != 'GifticonListScreen') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } else {
      navigation.setOptions({tabBarStyle: {display: undefined}});
    }
  }, [navigation, route]);
  return (
    <Stack.Navigator initialRouteName="GifticonListScreen">
      <Stack.Screen
        component={GifticonListScreen}
        name="GifticonListScreen"
        options={{
          headerRight: () => (
            <Button
              title="검색"
              onPress={() => {
                navigation.navigate('SearchingScreen');
              }}
            />
          ),
        }}
      />
      <Stack.Screen component={SearchingScreen} name="SearchingScreen" />
      <Stack.Screen
        component={SearchingResultScreen}
        name="SearchingResultScreen"
      />
      <Stack.Screen
        component={GifticonDetailScreen}
        name="GifticonDetailScreen"
      />
      <Stack.Screen component={PurchaseScreen} name="PurchaseScreen" />
    </Stack.Navigator>
  );
};
export default SearchingStackScreen;

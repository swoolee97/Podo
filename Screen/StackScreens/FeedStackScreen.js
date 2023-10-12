import React, { useState, useEffect } from "react"
import { getFocusedRouteNameFromRoute } from "@react-navigation/native"
import { createStackNavigator } from '@react-navigation/stack';
import CommunityScreen from '../FeedStackScreens/CommunityScreen';
import CommunityDetail from '../FeedStackScreens/CommunityDetail';
import WriteCommunity from '../FeedStackScreens/WriteCommunity';
const Stack = createStackNavigator();
const FeedStackScreen = ({ navigation, route }) => {
  React.useLayoutEffect(() => {
    const routeName =
      getFocusedRouteNameFromRoute(route) ?? 'Community';
    if (routeName != 'Community') {
      navigation.setOptions({tabBarStyle: {display: 'none'}});
    } 
    else {
      navigation.setOptions({tabBarStyle: {display: 'flex', height: 60}});
    }
  }, [navigation, route]);
  
  return (
      <Stack.Navigator initialRouteName="Community">
        <Stack.Screen name="Community" component={CommunityScreen} />
        <Stack.Screen name="CommunityDetail" component={CommunityDetail} />
        <Stack.Screen name="WriteCommunity" component={WriteCommunity}
          options={{
            title: '글쓰기', // 타이틀 설정
            headerTitleAlign: 'center', // 헤더 타이틀 중앙 정렬
            headerTitleStyle: {
              fontWeight: 'bold', // 헤더 타이틀 굵게 설정
            },
            
          }}/>
      </Stack.Navigator>
  );
}

export default FeedStackScreen;

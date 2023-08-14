import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import MyPage1 from "./MyPage1";
import MyPage2 from "./MyPage2";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator()

const Profile = ({ navigation }) => {
    
    return (
        <View>
            <Stack.Navigator>
                <Stack.Screen name="MyPage1" component={MyPage1} options={{ headerShown: false }} />
                <Stack.Screen name="MyPage2" component={MyPage2} options={{ headerShown: false }} />
            </Stack.Navigator>
            <TouchableOpacity onPress={() => {
                navigation.navigate('MyPage1')
            }}>
                <Text>마이페이지1</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('MyPage2')
            }}>
                <Text>마이페이지2</Text>
            </TouchableOpacity>
        </View>
    )
}
export default Profile
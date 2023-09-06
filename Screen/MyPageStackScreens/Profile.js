import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { TouchableOpacity } from "react-native-gesture-handler";

const Stack = createStackNavigator()

const Profile = ({ navigation }) => {
    
    return (
        <View>
<<<<<<< HEAD
            <Stack.Navigator>
                <Stack.Screen name="MyPage1" component={MyPage1} options={{ headerShown: false }} />
            </Stack.Navigator>
            <TouchableOpacity onPress={() => {
                navigation.navigate('MyPage1')
            }}>
                <Text>마이페이지1</Text>
            </TouchableOpacity>
=======
            
>>>>>>> main
        </View>
    )
}
export default Profile
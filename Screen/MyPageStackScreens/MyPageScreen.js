import React from "react";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
const MyPageScreen = ({navigation}) =>{
    return (
        <View>
            <Text>기본 마이페이지 화면</Text>
            <TouchableOpacity onPress={ () => {
                navigation.navigate('Profile')
            }}>
                <Text>프로필</Text>
            </TouchableOpacity>
        </View>
    )
}
export default MyPageScreen
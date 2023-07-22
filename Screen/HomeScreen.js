import AsyncStorage from "@react-native-async-storage/async-storage";
import React from "react";
import { View, Text, SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import { ScrollView } from "react-native";
const HomeScreen = ({ navigation }) => {
    // const user = await AsyncStorage.getItem('user')
    // const [name, setName] = useState(null)
    const [userId, setUserId] = useState(null)
    useEffect(() => {
        const fetchUserId = async () => {
            const userId = await AsyncStorage.getItem('user_id');
            setUserId(userId);
        }
        fetchUserId();
    }, []);
    return (
        <View>
            <ScrollView>
                <View>
                    <Text style = {{flex :1}}>asdfasdasdfad</Text>
                </View>
            </ScrollView>
            <View style = {{}}>
                <Text>{userId}</Text>
            </View>
            <View style = {{}}>
                <TouchableOpacity onPress={async () => {
                    await AsyncStorage.clear()
                    navigation.replace('LoginScreen')
                    console.log('로그아웃 완료')
                }}>
                    <Text>로그아웃</Text>
                </TouchableOpacity>
            </View>
            <View>
            </View>
        </View>
    )
}
export default HomeScreen
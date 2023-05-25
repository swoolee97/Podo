import { React, useEffect, useState } from "react";
import { View, Image, Text, SafeAreaView } from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

import junImage from '../Image/IMG_3346.jpg';
import AsyncStorage from '@react-native-community/async-storage';
import HomeScreenStack from "./StackScreens/HomeStackScreen";
import LoginScreen from "./AuthStackScreens/LoginScreen";
const SplashScreen = ({ navigation }) => {
    const [animating, setAnimating] = useState(true);
    // AsyncStorage.setItem('user_id' , null)
    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('user_id').then((value) => {
                navigation.replace(value === null ? 'LoginScreen' : 'Main')
            })
        }, 2000);
    })

    return (
        <SafeAreaView>
            <View>
                <Text>SplashScreen</Text>
            </View>
        </SafeAreaView>
    )
}
export default SplashScreen
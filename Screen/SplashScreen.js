import { React, useEffect, useState } from "react";
import { View, Text, SafeAreaView } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const SplashScreen = ({ navigation }) => {
    
    useEffect(() => {
        setTimeout(() => {
            AsyncStorage.getItem('user_email').then((value) => {
                navigation.replace('Main')
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
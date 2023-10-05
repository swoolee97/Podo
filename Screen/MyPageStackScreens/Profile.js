import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text } from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles';

const Stack = createStackNavigator()


const Profile = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState(null)

    const isFocused = useIsFocused();
    useEffect(() => {
        if (isFocused) {
            const fetchEmail = async () => {
                const email = await AsyncStorage.getItem('user_email')
                setUserEmail(email)
            }
            fetchEmail()
        }
    }, [isFocused]);
    const handleCertificationScreen = async () =>{
        if(!userEmail){
            return Alert.alert('로그인 후 이용해주세요')
        }
        const response = await fetch(PreURL.preURL+`/api/card?email=${userEmail}`)
        const data = await response.json();
        if(response.status == 500){
            return Alert.alert(`${data.message}`)
        }else{
            return navigation.navigate('Certification')
        }
    }
    
    return (
        <View>
            
                <TouchableOpacity onPress={() => {
                    handleCertificationScreen();
                    
                }}
                style={styles.touchbox}><Text style = {styles.buttonText}>수혜자 인증받기</Text>
                </TouchableOpacity>
            
            
        </View>
    )
}
export default Profile
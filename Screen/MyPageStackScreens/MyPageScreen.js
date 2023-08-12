import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import { Modal } from 'react-native';
import AuthStackScreen from '../StackScreens/AuthStackScreen';

const MyPageScreen = ({ navigation }) => {
    const preURL = require('../../PreURL/PreURL').preURL
    const [userEmail, setUserEmail] = useState(null)
    const [modalVisible, setModalVisible] = useState(false)

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

    const handleLoginSuccess = (email) => {
        setUserEmail(email)
    };
    const handleLoginFail = () => {
        // Alert.alert('로그인 실패')
    }
    const handleRegisterSuccess = () => {
        Alert.alert('회원가입 성공')
        setUserEmail(email)
    }
    const handleRegisterFail = () => {
        Alert.alert('회원가입 실패')
    }
    const toggleModal = () => {
        setModalVisible(!modalVisible);
    };
    return (

        <View style={styles.container}>
            {
                userEmail === null && (
                    <TouchableOpacity onPress={() => { setModalVisible(true) }}><Text>로그인하기</Text></TouchableOpacity>
                )
            }
            <Modal
                animationType="none"
                transparent={false}
                visible={modalVisible}
                swipeDirection={['down']}  // up,down,left,right
                onSwipeComplete={toggleModal}
                onRequestClose={() => {setModalVisible(false)}}
                >
                <AuthStackScreen onClose={() => { setModalVisible(false); }}
                    onLoginSuccess={handleLoginSuccess}
                    onLoginFail={handleLoginFail}
                    onRegisterSuccess = {handleRegisterSuccess}
                    onRegisterFail = {handleRegisterFail}/>
            </Modal>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Profile', { screen: 'Profile' })
                }}><Text>프로필 관리</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('Certification', { screen: 'Certification' })
                }}><Text>수혜자 인증</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.section}>
                <Text>{userEmail}님 안녕하세요!</Text>
                <Text>이메일 : {userEmail}</Text>
            </View>
            <View>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    section: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderColor: 'black',
        borderWidth: 1,
    },
});
export default MyPageScreen
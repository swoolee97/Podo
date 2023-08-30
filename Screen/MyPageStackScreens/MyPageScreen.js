import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useIsFocused } from '@react-navigation/native';
import PreURL from '../../PreURL/PreURL';
import { checkLoginStatus } from '../../CommonMethods/CheckLoginStatus';
const MyPageScreen = ({ navigation }) => {
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
    return (

        <View style={styles.container}>
            <>{!userEmail &&
                <View>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AuthStackScreen')
                    }}><Text>로그인하기</Text>
                    </TouchableOpacity>
                </View>
            }</>
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate('MissionCompletedList')
                }}>
                    <Text>미션 완료 리스트</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PurchaseHistory')
                }}>
                    <Text>상품 구매 내역</Text>
                </TouchableOpacity>
            </View>

            <View style={styles.section}>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('CustomerService')
                }}>
                    <Text>고객 센터</Text>
                </TouchableOpacity>
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
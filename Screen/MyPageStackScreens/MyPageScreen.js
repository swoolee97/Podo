import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState, useContext } from "react";
import { StyleSheet, Alert } from "react-native";
import { View, Text } from "react-native";
import { TouchableOpacity } from "react-native";
import { useIsFocused } from '@react-navigation/native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles';

const MyPageScreen = ({ navigation }) => {
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
    const logout = async () => {
        const preURL = PreURL.preURL
        const response = await fetch(preURL + '/api/auth/logout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                user_email: userEmail
            })
        })
        if (response.status == 200) {
            const data = await response.json();
            AsyncStorage.removeItem('accessToken')
            AsyncStorage.removeItem('user_email')
            // Toast.hide();
            Alert.alert(`${data.message}`)
            navigation.replace('MyPageScreen')
        }

    }
    return (
            <View style={styles.container}>
                {!userEmail ? 
                (<View style = {{  justifyContent: 'center', alignItems: 'center',flexDirection: 'row',marginHorizontal: '5%',marginTop:'8%'}}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('AuthStackScreen')
                    }}><Text style = {{fontFamily: 'Pretendard-Medium', fontSize: 24}}>로그인을 해주세요</Text>
                    </TouchableOpacity>
                    <View style = {{flex:1}}/>
                    <TouchableOpacity style = {{width: 115, height: 45, borderRadius: 8, backgroundColor: '#9D8DFF',justifyContent: 'center',alignItems: 'center'}}onPress={() => {
                        navigation.navigate('AuthStackScreen')
                    }}><Text style = {{fontFamily: 'Pretendard-Bold', fontSize: 14, color: '#FFFFFF'}}>개인정보 관리</Text>
                    </TouchableOpacity>
                </View>):(<View style = {{justifyContent: 'center', alignItems: 'center',flexDirection: 'row',marginHorizontal: '5%',marginTop:'8%'}}>
                    <View style={{width: 45, height:45, borderRadius:50,backgroundColor: '#D9D9D9',marginRight: '3%'}}>
                    </View>
                    <Text style={{ fontFamily: 'Pretendard-Medium', fontSize: 24}}>
                        {userEmail.split('@')[0]}
                    </Text>
                    <View style = {{flex:1}}/>
                    <TouchableOpacity style = {{width: 115, height: 45, borderRadius: 8, backgroundColor: '#9D8DFF',justifyContent: 'center',alignItems: 'center'}}onPress={() => {
                        navigation.navigate('Profile', { screen: 'Profile' })
                    }}><Text style = {{fontFamily: 'Pretendard-Bold', fontSize: 14, color: '#FFFFFF'}}>개인정보 관리</Text>
                    </TouchableOpacity>
                </View>)}

            <View style= {{width: 360, height: 300, borderRadius: 20, borderColor:'#D0D0D0', borderWidth: 1, marginTop: 40, alignSelf: 'center'}}>
                
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('DonationHistoryScreen')
                    }}>
                        <Text style={{marginLeft: 20}}>기부내역</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('WishListScreen')
                    }}>
                        <Text style={{marginLeft: 20}}>장바구니화면</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('MissionCompletedList')
                    }}>
                        <Text style={{marginLeft: 20}}>완료한 미션</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.section}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('PurchaseHistory')
                    }}>
                        <Text style={{marginLeft: 20}}>상품 구매 내역</Text>
                    </TouchableOpacity>
                </View>
                {userEmail &&
                    <View style={styles.section}>
                        <TouchableOpacity onPress={() => {
                            logout()
                        }}>
                            <Text style={{marginLeft: 20}}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                }

                <View style={[styles.section, {borderBottomWidth:0}]}>
                    <TouchableOpacity onPress={() => {
                        navigation.navigate('CustomerService')
                    }}>
                        <Text style={{marginLeft: 20}}>고객 센터</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </View>
    )
}

export default MyPageScreen
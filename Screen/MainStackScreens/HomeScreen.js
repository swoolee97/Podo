import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
const HomeScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState(null)
    const isFocused = useIsFocused();
    const [userPoints, setUserPoints] = useState(0);

    useEffect(() => {
        if (isFocused) {
            const fetchUserPoints = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);

                if (email) {
                    fetch(`${PreURL.preURL}/api/point?user_email=${encodeURIComponent(email)}`)
                        .then(res => {
                            // HTTP 응답 상태 코드가 성공 범위에 있지 않으면 오류를 던집니다.
                            if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
                            return res.json();
                        })
                        .then(data => {
                            if (data && data.points !== undefined) {
                                setUserPoints(data.points);
                            } else {
                                console.error("Unexpected response structure:", data);
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching user points:", error);
                        });
                }
            };
            fetchUserPoints();
        }
    }
    )

    const showMissionIncompleteToast = () => {
        Toast.show({
            type: 'error',
            position: 'bottom',
            text1: '오늘 할 수 있는 미션이 있어요',
            text2: '미션하러 가기',
            visibilityTime: 4000,
            autoHide: false,
            bottomOffset: 70,
            onPress: () => {
                conductMission();
                Toast.hide()
            }
        });
    };
    useEffect(() => {
        if (isFocused) {
            const fetchEmailAndMission = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);
                if (email) {
                    const response = await fetch(PreURL.preURL + `/api/mission/isMissionCompleted?email=${email}`)
                    const data = await response.json();
                    if (!data.completed) {
                        showMissionIncompleteToast();
                    }
                }
            };
            fetchEmailAndMission()
        }
    }, [isFocused]);
    const conductMission = async () => {
        const email = await AsyncStorage.getItem('user_email');
        const response = await fetch(PreURL.preURL + `/api/mission/createMission?email=${email}`)
        const data = await response.json()
        navigation.navigate('MissionDetailScreen', { data, email })
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
            Toast.hide();
            Alert.alert(`${data.message}`)
            navigation.replace('HomeScreen')
        }

    }
    return (
        <View>
            <View style={{}}>
                <Text>{userEmail}님, 안녕하세요!</Text>
            </View>
            <View style={{}}>
                <Text></Text>
                <Text>나무 그림</Text>
                <Text></Text>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PointDetailScreen')
                }}>
                    <Text>포인트 적립내역화면: {userPoints} 포인트</Text>
                </TouchableOpacity>
            </View>
           
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('NotificationScreen')
                }}>
                    <Text>알림화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={async () => {
                    const response = await fetch(PreURL.preURL + '/api/card/fake');
                    const data = await response.json();
                    console.log(data)
                }}>
                    <Text>카드생성버튼(임시용)</Text>
                </TouchableOpacity>
            </View>
        </View >
    )
}
export default HomeScreen
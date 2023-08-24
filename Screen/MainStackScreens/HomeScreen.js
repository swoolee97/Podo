import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused } from "@react-navigation/native";
import { useMissions } from '../MissionStackScreens/MissionContents';

const HomeScreen = ({ navigation }) => {
    const [userEmail, setUserEmail] = useState(null)
    const [dailyMission, setDailyMission] = useState(null);
    const [missionViewed, setMissionViewed] = useState(false);
    const { missions } = useMissions(); 
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const fetchEmailAndMission = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);
                
                const lastMissionUpdate = await AsyncStorage.getItem('last_mission_update');
                const today = new Date().toDateString();
                
                if (lastMissionUpdate !== today) {
                    const randomMission = missions[Math.floor(Math.random() * missions.length)];
                    setDailyMission(randomMission);
                    await AsyncStorage.setItem('last_mission_update', today);
                    await AsyncStorage.setItem('daily_mission', JSON.stringify(randomMission));
                  } else {
                    const savedMission = await AsyncStorage.getItem('daily_mission');
                    setDailyMission(JSON.parse(savedMission));
                }
            };
            fetchEmailAndMission()
        }
    }, [isFocused]);

    const showMission = () => {
        setMissionViewed(true);
    };


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
                    <Text>포인트 적립내역화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('WishListScreen')
                }}>
                    <Text>장바구니화면</Text>
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
                <TouchableOpacity onPress={() => {
                    navigation.navigate('DonationHistoryScreen')
                }}>
                    <Text>기부내역화면</Text>
                </TouchableOpacity>
            </View>
            <View>
                <TouchableOpacity onPress={() => {
                if (missionViewed) {
                        if (dailyMission) {
                            navigation.navigate('MissionScreen', { mission: dailyMission });
                        } else {
                            Alert.alert("오늘의 미션이 아직 업데이트되지 않았습니다.");
                        }
                    } else {
                        showMission();  // 미션을 확인 업데이트
                    }
                }}>
                    <Text>
                        {missionViewed ?
                            (dailyMission ? "오늘의 미션: " + dailyMission.title : "오늘의 미션을 불러오는 중...")
                            :
                            "오늘의 미션이 도착했어요!"
                        }</Text>
                </TouchableOpacity>
            </View>
            <>{userEmail &&
                <View style={{}}>
                    <TouchableOpacity onPress={() => {
                        logout()
                    }}>
                        <Text>로그아웃</Text>
                    </TouchableOpacity>
                </View>
            }</>
            <View>
            </View>
        </View >
    )
}
export default HomeScreen
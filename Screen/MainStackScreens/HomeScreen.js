import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, SafeAreaView, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message'

const HomeScreen = ({ navigation, setHeaderPoints}) => {
    const [userEmail, setUserEmail] = useState(null)
    const isFocused = useIsFocused();
    const [userPoints, setUserPoints] = useState(0);
    useFocusEffect(
        React.useCallback(() => {
          return () => {
            Toast.hide()
          };
        }, [])
      );
    const fetchUserDetails = async (user_email) => {
        if (user_email) {
            try {
                
                const pointResponse = await fetch(PreURL.preURL + `/api/point/sum?email=${user_email}`)
                const missionResponse = await fetch(PreURL.preURL + `/api/mission/isMissionCompleted?email=${user_email}`)
                if (!pointResponse.ok) {
                    throw new Error(`HTTP Error in pointResponse: ${pointResponse.status}`);
                }
                if (!missionResponse.ok) {
                    throw new Error(`HTTP Error in missionResponse: ${missionResponse.status}`);
                }
                const pointData = await pointResponse.json();
                const missionData = await missionResponse.json();
                setUserPoints(pointData.sum)
                if (!missionData.completed) {
                    showMissionIncompleteToast();
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
    };
    useEffect(() => {
        if (isFocused) {
            const fetchUserEmailAndDetails = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);
                fetchUserDetails(email);
            };
            fetchUserEmailAndDetails();

        }
    }, [isFocused]);

    useEffect(() => {
        if (setHeaderPoints) {
            setHeaderPoints(userPoints);
        }
    }, [userPoints]);

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
    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            userEmail && (
              <TouchableOpacity 
                onPress={() => {
                  navigation.navigate('PointDetailScreen');
                }}
              >
                <Text>총 {userPoints} 포인트</Text>
              </TouchableOpacity>
            )
          )
        });
      }, [navigation, userEmail, userPoints]);
    return (
        <View>
            <View style={{}}>
                <Text>{userEmail}님, 안녕하세요!</Text>
            </View>
            {userEmail && (
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('PointDetailScreen')
                }}>
                    <Text>총 {userPoints} 포인트</Text>
                </TouchableOpacity>
            </View>
        )}
           
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
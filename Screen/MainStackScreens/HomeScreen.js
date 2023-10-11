import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, Dimensions, StyleSheet, Alert, Image} from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message'


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    }
});

const { width, height} = Dimensions.get('window');
const isSmallScreen = width < 400 || height < 800;
const toastOffset = isSmallScreen ? 70 : 150;
const grapeImageSize = isSmallScreen ? 230 : 400;
const grapeCharSize = isSmallScreen ? 60 : 100;

const HomeScreen = ({ navigation, setHeaderPoints}) => {
    const [userEmail, setUserEmail] = useState(null)
    const isFocused = useIsFocused();
    const [userPoints, setUserPoints] = useState(0);
    const [completedMissions, setCompletedMissions] = useState(0);
    const [missionData, setMissionData] = useState(null);
    
    const grapeImages = [
        require('../../images/grape.png'),
        require('../../images/grape1.png'),
        require('../../images/grape1.png'),
        require('../../images/grape4.png'),
        require('../../images/grape4.png'),
        require('../../images/grape4.png'),
        require('../../images/grape4.png'),
        // ... 나머지 이미지들을 여기에 추가
      ];

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
                setMissionData(missionData); // 상태 업데이트
                setUserPoints(pointData.sum)
                if (!missionData.completed) {
                    showMissionIncompleteToast();
                }
            } catch (error) {
                console.error("Error fetching user details:", error);
            }
        }
    };

    const fetchCompletedMissionCount = async (user_email) => {
        try {
            const response = await fetch(PreURL.preURL + `/api/mission/list?email=${user_email}`);
            const data = await response.json();
            if (data && data.missions) {
                setCompletedMissions(data.missions.length);
            }
        } catch (error) {
            console.error("Error fetching completed missions count:", error);
        }
    };
    
    useEffect(() => {
        if (isFocused) {
            const fetchUserEmailAndDetails = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);
                fetchUserDetails(email);
                fetchCompletedMissionCount(email);
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
            bottomOffset: toastOffset,
            onPress: () => {
                conductMission();
                Toast.hide()
            },
            style: {
                container: {
                    height: 100, 
                }
            }
        });
    };
    const conductMission = async () => {
        const email = await AsyncStorage.getItem('user_email');
        const response = await fetch(PreURL.preURL + `/api/mission/createMission?email=${email}`)
        const data = await response.json()
        navigation.navigate('MissionDetailScreen', { data, email })
    };

    useEffect(() => {
        if (missionData) {
            setCompletedMissions(missionData.completedMissions || 0);
        }
    }, [missionData]);

    useEffect(() => {
        console.log("completedMissions:", completedMissions);
        console.log("grapeImages.length - 1:", grapeImages.length - 1);
        console.log("Math.min value:", Math.min(completedMissions, grapeImages.length - 1));
    }, [completedMissions]);

    return (
        <View style={styles.container}>
            <Image source={grapeImages[Math.min(completedMissions)]} style={{ width: grapeImageSize, height: grapeImageSize * 1.5, marginTop: -50}} />
            <Image source={require('../../images/grape_char.png')} style={{ width: grapeCharSize, height: grapeCharSize * 1.5, alignSelf: 'flex-start' }} />
        </View >
        
    )
}
export default HomeScreen
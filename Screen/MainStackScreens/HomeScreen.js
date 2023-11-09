import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef }  from "react";
import { View, Text, Dimensions, StyleSheet, Button, Image,TouchableOpacity, Modal} from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message'
import { Modalize } from 'react-native-modalize';

const { width, height} = Dimensions.get('window');
const isSmallScreen = width < 200 || height < 500;

const toastOffset = isSmallScreen ? 30 : 160;
const grapeImageSize = isSmallScreen ? 100 : 250;
const grapeCharSize = isSmallScreen ? 40 : 60;

const imageSize = width < 400 ? 20 : 25; 
const marginSize = width < 400 ? 10 : 15;

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
        require('../../images/grape1.png'),
        require('../../images/grape1.png'),
        require('../../images/grape1.png'),
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
                setMissionData(missionData);
                setUserPoints(pointData.sum)
                
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

    
    const conductMission = async () => {
        const email = await AsyncStorage.getItem('user_email');
        const response = await fetch(PreURL.preURL + `/api/mission/createMission?email=${email}`)
        const data = await response.json()
        navigation.navigate('MissionDetailScreen', { data, email })
    };

    React.useLayoutEffect(() => {
        navigation.setOptions({
          headerLeft: () => (
            userEmail && (
                <TouchableOpacity onPress={() => navigation.navigate('PointHistoryScreen',userEmail)}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginLeft: 15 }}>
                    <Image 
                        source={require('../../images/point_grape.png')}
                        style={{ width: imageSize, height: imageSize, marginRight: marginSize }}
                    />
                    <Text>{userPoints}</Text>
                </View>
            </TouchableOpacity>
            )
          )
        });
      }, [navigation, userEmail, userPoints]);

    useEffect(() => {
        if (missionData) {
        }
    }, [missionData]);

    return (
        <View style={styles.container}>
            <Image source={grapeImages[Math.min(completedMissions, grapeImages.length - 1)]} style={{ width: grapeImageSize, height: grapeImageSize * 1.5}} />
            <Image source={require('../../images/grape_char.png')} style={{ width: grapeCharSize, height: grapeCharSize * 1.5, alignSelf: 'flex-start' }} />
            <View style={{flex: 1}}/>
            {missionData && !missionData.completed ? (
            <TouchableOpacity style={{width:'90%', height: 40, borderColor: 'grey', borderWidth: 1, borderRadius: 15, justifyContent: 'center'}}
                onPress={() => {
                    conductMission();
                    Toast.hide()
                }}>
                <Text>오늘 할 수 있는 미션이 있어요</Text>
            </TouchableOpacity>) : (
            <TouchableOpacity style={{width:'90%', height:100, borderColor: 'grey', borderWidth: 1, borderRadius: 15 ,justifyContent: 'center'}}
                disabled={true} >
                <Text style={{alignSelf:'center', fontFamily: 'Pretendard-SemiBold'}}>오늘은 미션이 없어요</Text>
            </TouchableOpacity>)}
        </View >
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: 'white',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        marginTop: 10,
        // iOS에서의 그림자 설정
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
    },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
    
        // Android에서의 그림자 설정
        elevation: 5,
    },
    buttonText: {
        color: 'black',
        fontSize: 16,
        textAlign: 'center',
    },
});

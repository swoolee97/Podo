import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useContext } from "react";
import { View, Text, Dimensions, StyleSheet, Alert, Image} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
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
    }
});

const { width, height } = Dimensions.get('window');
const isSmallScreen = width < 400 || height < 800;

const grapeImageSize = isSmallScreen ? 210 : 300;
const grapeCharSize = isSmallScreen ? 55 : 90;

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

    return (
        <View style={styles.container}>
            
            <Image source={require('../../images/grape.png')} style={{ width: grapeImageSize, height: grapeImageSize * 1.5 }} />
            <Image source={require('../../images/grape_char.png')} style={{ width: grapeCharSize, height: grapeCharSize * 1.5, alignSelf: 'flex-start' }} />
        </View >
    )
}
export default HomeScreen
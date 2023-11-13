import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef }  from "react";
import { View, Text, Dimensions, StyleSheet, Button, Image,TouchableOpacity, Modal} from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Toast from 'react-native-toast-message';
import PodoChr from '../../images/PODOcharacter.png';
import Imageicon from '../../images/Imageicon.png';
import Arrow from '../../images/arrow.png';

const HomeScreen = ({ navigation, setHeaderPoints}) => {
  
    const [userPoints, setUserPoints] = useState(0);
    const [completedMissions, setCompletedMissions] = useState(0);
    const [missionData, setMissionData] = useState(null);
    const donationLevel = ['첫걸음']
    const [userEmail, setUserEmail] = useState(null);
    const [isCertified, setIsCertified] = useState(false);
    const isFocused = useIsFocused();

    useEffect(() => {
        if (isFocused) {
            const fetchData = async () => {
                const email = await AsyncStorage.getItem('user_email');
                if (!email) return;

                setUserEmail(email);
                try {
                    const [pointResponse, certificationResponse] = await Promise.all([
                        fetch(PreURL.preURL + `/api/point/sum?email=${email}`),
                        fetch(PreURL.preURL + `/api/card?email=${email}`)
                    ]);

                    if (!pointResponse.ok) {
                        throw new Error(`HTTP Error in pointResponse: ${pointResponse.status}`);
                    }
                    const pointData = await pointResponse.json();
                    setUserPoints(pointData.sum);

                    setIsCertified(certificationResponse.status == 500);
                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [isFocused]);

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
        userEmail && 
        (<View style={styles.container}>
            <Text style={{fontFamily: 'Pretendard-Medium', fontSize:26, color:'#000'}}>현재까지{'\n'}<Text style={{fontFamily: 'Pretendard-Bold'}}>77명의 아이들</Text>이{'\n'}기프티콘을 사용했어요!</Text>
            <View style={{flex: 0.5}}/>
            <View style={{width:'100%', height: 200, padding: '5%', borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}} >
                <View style={{flex: 1, flexDirection:'row', alignItems: "center", alignSelf:'center'}}>
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:20, color:'#000'}}>
                        {userEmail}님,{'\n'}3개{isCertified ? (<Text style={{fontFamily: 'Pretendard-Medium'}}>의 미니게임을 완료했어요</Text>) : (<Text style={{fontFamily: 'Pretendard-Medium'}}>의 기프티콘을 기부했어요</Text>)}
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image source={PodoChr} style={{width: 60, height: 60}}/>
                </View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:14, color:'#000'}}><Text style={{color:'#aa57dd'}}>{donationLevel}</Text> 단계</Text>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <View style={{width: '60%', height:8, backgroundColor:'#eaeaea', borderRadius: 20}}>

                        </View>
                        <View style={{flex: 0.2}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:22, color:'#aa57dd'}}>3</Text>
                        <View style={{flex: 0.1}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:14, color:'#606060'}}>/</Text>
                        <View style={{flex: 0.1}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:18, color:'#606060'}}>5</Text>
                        <View style={{flex: 2}}/>
                    </View>
                </View>
            </View>
            <View style={{flex: 1}}/>
            <View style={{flexDirection:'row', width:'100%', height: 80, borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}}>
                {isCertified ? (<TouchableOpacity 
                    style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => navigation.navigate('PointHistoryScreen',userEmail)}
                >
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>{userPoints}P</Text>
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#484848'}}>포인트내역</Text>
                </TouchableOpacity>) :(<TouchableOpacity 
                    style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => navigation.navigate('UploadGifticon')}
                >
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>기부하기</Text>
                </TouchableOpacity>)}
                <View style={{width:2, height:48, backgroundColor:'#eaeaea', alignSelf: 'center'}}/>          
                <TouchableOpacity 
                    style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                    onPress={() => navigation.navigate('DonationHistoryScreen')}
                    >
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>3개</Text>
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#484848'}}>기부내역</Text>
                </TouchableOpacity>
            </View>
            <View style={{flex: 1}}/>
            <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:20, color:'#000'}}>당신의 나눔,{'\n'}그 생생한 이야기를 확인하세요!</Text>
            <View style={{flex: 0.3}}/>
            <TouchableOpacity 
                style={{flexDirection: 'row', width:'100%', height:48, alignItems: 'center', backgroundColor: '#b774e0', borderRadius: 10}}
                onPress={() => navigation.navigate('피드')}
                >
                <Image source={Imageicon} style={{width:16, height:16, tintColor: '#fff', marginHorizontal:'3%'}}/>
                <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#fff'}}>피드 확인하러 가기</Text>
                <View style={{flex: 1}}/>
                <Image source={Arrow} style={{width:12, height:12, tintColor: '#fff', marginHorizontal:'3%'}}/>
            </TouchableOpacity>
            <View style={{flex: 1}}/>
            {/*{missionData && !missionData.completed ? (
            <TouchableOpacity style={{width:'100%', height: 140, borderRadius: 15, justifyContent: 'center', backgroundColor: '#FFFFFF', elevation: 5, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}}
                onPress={() => {
                    conductMission();
                    Toast.hide()
                }}>
                <Text style ={{fontFamily: 'Pretendard-SemiBold', fontSize: 18, alignSelf: 'center'}}>오늘 수행할 수 있는 미션이 있어요</Text>
            </TouchableOpacity>) : (
            <TouchableOpacity style={{width:'90%', height:100, borderColor: 'grey', borderWidth: 1, borderRadius: 15 ,justifyContent: 'center'}}
                disabled={true} >
                <Text style={{alignSelf:'center', fontFamily: 'Pretendard-SemiBold'}}>오늘은 미션이 없어요</Text>
            </TouchableOpacity>)}*/}
        </View >)
    )
}
export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: '5%',
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

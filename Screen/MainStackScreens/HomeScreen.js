import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useRef }  from "react";
import { View, Text, Dimensions, StyleSheet, Button, Image,TouchableOpacity, Modal} from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import PodoChr from '../../images/PODOcharacter.png';
import Imageicon from '../../images/Imageicon.png';
import gameicon from '../../images/gameicon.png';
import Arrow from '../../images/arrow.png';

const HomeScreen = ({ navigation}) => {
    const [userEmail, setUserEmail] = useState(null);
    const [userPoints, setUserPoints] = useState(0);
    const [completedMissionCount, setCompletedMissions] = useState(0);
    const [donatedGifticonCount, setDonatdedGifticonCount] = useState(0);
    const [receivedGifticonCount, setReceivedGifticonCount] = useState(0);
    const [missionData, setMissionData] = useState(null);
    const donationLevel = ['첫걸음']
    const [isReceiver, setIsReceiver] = useState(false);
    const isFocused = useIsFocused();
    const dailyMissionLimit = 5;
    const minigameprogressWidth = ((completedMissionCount / dailyMissionLimit) * 100).toString() + '%';
    const donationprogressWidth = ((donatedGifticonCount / 5) * 100).toString() + '%';
    useEffect(() => {
        if (isFocused) {
            const fetchData = async () => {
                const email = await AsyncStorage.getItem('user_email');
                setUserEmail(email);
                if (!email) {
                    setIsReceiver(false);
                    setUserPoints(0);
                    setCompletedMissions(0);
                    return;
                }

                try {
                    const [pointResponse, certificationResponse, completedMissionCountResponse, 
                        donatedGificonCountResponse, receivedGifticonCountResponse] = await Promise.all([
                        fetch(PreURL.preURL + `/api/point/sum?email=${email}`),
                        fetch(PreURL.preURL + `/api/auth/isReceiver`,{
                            method :'POST',
                            body : JSON.stringify({'user_email' : email}),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }),
                        fetch(PreURL.preURL + `/api/mission/sum?email=${email}`),
                        fetch(PreURL.preURL + `/api/gifticon/count`,{
                            method :'POST',
                            body : JSON.stringify({'email' : email}),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }),
                        fetch(PreURL.preURL + `/api/gifticon/received`,{
                            method :'POST',
                            body : JSON.stringify({'email' : email}),
                            headers: {
                                'Content-Type': 'application/json'
                            },
                        }),
                    ]);

                    if (!pointResponse.ok) {
                        throw new Error(`HTTP Error in pointResponse: ${pointResponse.status}`);
                    }
                    const pointData = await pointResponse.json();
                    setUserPoints(pointData.sum);

                    const certificationResponseData = await certificationResponse.json()
                    setIsReceiver(certificationResponseData.isReceiver);

                    const data = await completedMissionCountResponse.json();
                        // if (data && data.missions) {
                        setCompletedMissions(data.length);
                    // }
                    

                    const donatedGificonCountResponseData = await donatedGificonCountResponse.json();
                    setDonatdedGifticonCount(donatedGificonCountResponseData.count);

                    const receivedGifticonCountResponseData = await receivedGifticonCountResponse.json();
                    setReceivedGifticonCount(receivedGifticonCountResponseData.count);

                } catch (error) {
                    console.error("Error fetching data:", error);
                }
            };
            fetchData();
        }
    }, [isFocused]);
    const getTodayDate = () => {
        let today = new Date();
        let year = today.getFullYear();
        let month = today.getMonth();
        let day = today.getDate();
        var formattedDate = year + month.toString().padStart(2, '0') + day.toString().padStart(2, '0');
        return formattedDate
    }
    const conductMission = async () => {
        const email = await AsyncStorage.getItem('user_email');
        const response = await fetch(PreURL.preURL + `/api/mission/createMission?email=${email}`)
        const data = await response.json()
        navigation.navigate('MissionDetailScreen', { data, email })
    };
    
    return (
        userEmail ? 
        (<View style={styles.container}>
            <Text style={{fontFamily: 'Pretendard-Medium', fontSize:26, color:'#000'}}>현재까지{'\n'}<Text style={{fontFamily: 'Pretendard-Bold'}}>77명의 아이들</Text>이{'\n'}기프티콘을 사용했어요!</Text>
            <View style={{flex: 0.5}}/>

            {!isReceiver ? (
                <View style={{width:'100%', height: 200, padding: '5%', borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}} >
                    <View style={{flex: 1, flexDirection:'row', alignItems: "center", alignSelf:'center'}}>
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:20, color:'#000'}}>
                            {userEmail.split('@')[0]}님,{'\n'}{donatedGifticonCount}개
                            <Text style={{fontFamily: 'Pretendard-Medium'}}>의 기프티콘을 기부했어요</Text>
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
                            <Text style={{fontFamily: 'Pretendard-Bold', fontSize:22, color:'#aa57dd'}}>{donatedGifticonCount}</Text>
                            <View style={{flex: 0.1}}/>
                            <Text style={{fontFamily: 'Pretendard-Bold',fontSize:14, color:'#606060'}}>/</Text>
                            <View style={{flex: 0.1}}/>
                            <Text style={{fontFamily: 'Pretendard-Bold',fontSize:18, color:'#606060'}}>5</Text>
                            <View style={{flex: 2}}/>
                        </View>
                    </View>
                </View>
                ) : (
                <View style={{width:'100%', height: 200, padding: '5%', borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}} >
                <View style={{flex: 1, flexDirection:'row', alignItems: "center", alignSelf:'center'}}>
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:20, color:'#000'}}>
                        {userEmail.split('@')[0]}님,{'\n'}{completedMissionCount}개
                        <Text style={{fontFamily: 'Pretendard-Medium'}}>의 미니게임을 완료했어요</Text>
                    </Text>
                    <View style={{flex: 1}}/>
                    <Image source={PodoChr} style={{width: 60, height: 60}}/>
                </View>
                <View style={{flex:1, justifyContent:'center'}}>
                    <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:14, color:'#000'}}>오늘 가능한 미니게임</Text>
                    <View style={{flexDirection: 'row', alignItems:'center'}}>
                        <View style={{width: '60%', height:8, backgroundColor:'#eaeaea', borderRadius: 20}}>
                            <View style={{width: minigameprogressWidth, height:8, backgroundColor:'#aa57dd', borderRadius: 20}}>

                            </View>
                        </View>
                        <View style={{flex: 0.2}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:22, color:'#aa57dd'}}>{dailyMissionLimit-completedMissionCount}</Text>
                        <View style={{flex: 0.1}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:14, color:'#606060'}}>/</Text>
                        <View style={{flex: 0.1}}/>
                        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:18, color:'#606060'}}>{dailyMissionLimit}</Text>
                        <View style={{flex: 2}}/>
                    </View>
                </View>
            </View>
            )}
            <View style={{flex: 1}}/>
            {!isReceiver ? (
                <View style={{flexDirection:'row', width:'100%', height: 80, borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}}>
                    <TouchableOpacity 
                        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => navigation.navigate('UploadGifticon')}
                    >
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>기부하기</Text>
                    </TouchableOpacity>
                    <View style={{width:2, height:48, backgroundColor:'#eaeaea', alignSelf: 'center'}}/>          
                    <TouchableOpacity 
                        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => navigation.navigate('DonationHistoryScreen')}
                        >
                            <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>{donatedGifticonCount}개</Text>
                            <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#484848'}}>기부내역</Text>
                    </TouchableOpacity>
                </View> 
                ) : (
                <View style={{flexDirection:'row', width:'100%', height: 80, borderRadius: 10, backgroundColor: '#FFFFFF', elevation: 10, shadowColor:'#000000', shadowOffset:{width:0, height:4},shadowOpacity:0.25}}>
                    <TouchableOpacity 
                        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => navigation.navigate('PointHistoryScreen',userEmail)}
                    >
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>{userPoints}P</Text>
                        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#484848'}}>포인트내역</Text>
                    </TouchableOpacity>
                    <View style={{width:2, height:48, backgroundColor:'#eaeaea', alignSelf: 'center'}}/>          
                    <TouchableOpacity 
                        style={{flex:1, justifyContent: 'center', alignItems: 'center'}}
                        onPress={() => navigation.navigate('DonationHistoryScreen')}
                        >
                            <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>{receivedGifticonCount}개</Text>
                            <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#484848'}}>교환내역</Text>
                    </TouchableOpacity>
                </View>)}
            <View style={{flex: 1}}/>
            {!isReceiver ? (
                <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:20, color:'#000'}}>당신의 나눔,{'\n'}그 생생한 이야기를 확인하세요!</Text>
                ) : (
                <Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:20, color:'#000'}}>플레이하고{'\n'}포인트를 획득하세요!</Text>)}
            <View style={{flex: 0.3}}/>
            {!isReceiver ? (
                <TouchableOpacity 
                    style={{flexDirection: 'row', width:'100%', height:48, alignItems: 'center', backgroundColor: '#b774e0', borderRadius: 10}}
                    onPress={() => navigation.navigate('피드')}
                    >
                    <Image source={Imageicon} style={{width:16, height:16, tintColor: '#fff', marginHorizontal:'3%'}}/>
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#fff'}}>피드 확인하러 가기</Text>
                    <View style={{flex: 1}}/>
                    <Image source={Arrow} style={{width:12, height:12, tintColor: '#fff', marginHorizontal:'3%'}}/>
                </TouchableOpacity>
                ) : (
                <TouchableOpacity 
                    style={{flexDirection: 'row', width:'100%', height:48, alignItems: 'center', backgroundColor: '#b774e0', borderRadius: 10}}
                    onPress={() => {conductMission()}}
                    >
                    <Image source={gameicon} style={{width:18, height:18, tintColor: '#fff', marginHorizontal:'3%'}}/>
                    <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#fff'}}>미니게임 플레이 하기</Text>
                    <View style={{flex: 1}}/>
                    <Image source={Arrow} style={{width:12, height:12, tintColor: '#fff', marginHorizontal:'3%'}}/>
                </TouchableOpacity>
                )}
            <View style={{flex: 1}}/>
        </View >) : (<Text>로그인을 해주세요</Text>)
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

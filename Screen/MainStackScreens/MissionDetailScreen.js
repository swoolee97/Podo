import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PreURL from "../../PreURL/PreURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
import Rouletteicon from '../../images/Rouletteicon.png';
import Person from '../../images/personblack.png';
import wordicon from '../../images/wordicon.png'
import { FlatList } from 'react-native-gesture-handler';
const MissionDetailScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [completedMissionCount, setCompletedMissions] = useState(0);
  const isFocused = useIsFocused();  
  const gamedata = [
    {id:1, title:'행운의 룰렛', contents: '매일 룰렛 돌리고\n포인트 받아가세요!', icon: Rouletteicon, imageStyle: { width: 100, height: 100, marginTop: 10, marginRight: 10 }},
    {id:2, title:'단어 퀴즈', contents: '제한 시간 안에 상황에 맞는\n단어를 작성해 보세요!', icon: wordicon, imageStyle: { width: 164, height: 100, marginTop: 5 }},
    {id:3, title:'인물 퀴즈', contents: '제한 시간 안에 설명에 맞는\n인물을 맞춰 보세요!', icon: Person, imageStyle: { width: 100, height: 100, marginTop: 10, marginRight: 10 }}, 
  ];
  const renderItem = ({item}) => (
    <TouchableOpacity 
      style = {{flexDirection: 'row' ,width: '100%', height: 110, backgroundColor: '#B774E0', borderRadius: 10 }}
      onPress={() => {navigation.navigate('MinigameScreen')}}>
      <View style={{marginLeft: 20}}>
        <View style={{flex: 3}}/>
        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:18, color:'#fff'}}>
          {item.title}
        </Text>
        <View style={{flex: 1.5}}/>
        <Text style={{fontFamily: 'Pretendard-Regular',fontSize:14, color:'#fff'}}>
          {item.contents} 
        </Text>
        <View style={{flex: 2}}/>
      </View>
      <View style={{flex: 1}}/>
      <Image source={item.icon} style={item.imageStyle}/>
    </TouchableOpacity>
  );
  useEffect(() => {
    if (isFocused) {
        const fetchData = async () => {
            const email = await AsyncStorage.getItem('user_email');
            setUserEmail(email);
            if (!email) {
                setIsCertified(false);
                setUserPoints(0);
                setCompletedMissions(0);
                return;
            }

            try {
                const [pointResponse,completedMissionCountResponse] = await Promise.all([
                    fetch(PreURL.preURL + `/api/point/sum?email=${email}`),
                    fetch(PreURL.preURL + `/api/mission/sum?email=${email}`)
                ]);

                if (!pointResponse.ok) {
                    throw new Error(`HTTP Error in pointResponse: ${pointResponse.status}`);
                }
                const pointData = await pointResponse.json();
                setUserPoints(pointData.sum);

                const data = await completedMissionCountResponse.json();
                    setCompletedMissions(data.length);


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }
  }, [isFocused]);
  

  return (
    <View style={{flex:1}}>
      <View style={{flexDirection: 'row', alignItems:'center', width:'100%', height: 70, backgroundColor: '#fff', elevation:6}}>
        <View style={{flex: 0.5}}/>
        <View style={{height:56, aspectRatio:1, borderRadius: 100, backgroundColor: '#fff', elevation:3}}>
          <Image />
        </View>
        <View style={{flex: 0.4}}/>
        <View>
          {userEmail ? (<Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:18, color:'#000'}}>
            {userEmail.split('@')[0]}
          </Text>): (<Text style={{fontFamily: 'Pretendard-SemiBold', fontSize:18, color:'#000'}}>
            닉네임
          </Text>)}
          <Text style={{fontFamily: 'Pretendard-Bold', fontSize:18, color:'#aa57dd'}}>
            {userPoints}P
          </Text>
        </View>
        <View style={{flex: 2}}/>
        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:14, color:'#000', textAlign: 'center'}}>
          오늘 가능한{'\n'}미니게임
        </Text>                          
        <View style={{flex: 0.4}}/>
        <Text style={{fontFamily: 'Pretendard-Bold', fontSize:22, color:'#aa57dd'}}>{5-completedMissionCount}</Text>
        <View style={{flex: 0.1}}/>
        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:14, color:'#606060'}}>/</Text>
        <View style={{flex: 0.1}}/>
        <Text style={{fontFamily: 'Pretendard-Bold',fontSize:18, color:'#606060'}}>5</Text>          
        <View style={{flex: 0.5}}/>
      </View>
      <FlatList
        style={{padding: '5%'}}
        renderItem={renderItem}
        data={gamedata}
        ItemSeparatorComponent={() => (
          <View style={{ height: 20 }} />  // 간격을 위한 뷰
        )}
      />
    </View>
  );
};

export default MissionDetailScreen;

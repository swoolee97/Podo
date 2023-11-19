import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PreURL from "../../PreURL/PreURL";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused, useFocusEffect } from "@react-navigation/native";
const MissionDetailScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPoints, setUserPoints] = useState(0);
  const [completedMissionCount, setCompletedMissions] = useState(0);
  const isFocused = useIsFocused();  

  useEffect(() => {
    if (isFocused) {
      console.log("@@@@")
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
                    // fetch(PreURL.preURL + `/api/card?email=${email}`),
                    fetch(PreURL.preURL + `/api/mission/list?email=${email}`)
                ]);

                if (!pointResponse.ok) {
                    throw new Error(`HTTP Error in pointResponse: ${pointResponse.status}`);
                }
                const pointData = await pointResponse.json();
                setUserPoints(pointData.sum);

            

                const data = await completedMissionCountResponse.json();
                    if (data && data.missions) {
                    setCompletedMissions(data.missions.length);
        }


            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }
}, [isFocused]);

  return (
    <View style={styles.container}>
      {userEmail ? (<Text style={{fontFamily: 'Pretendard-Bold', fontSize:20, color:'#000'}}>
                            {userEmail.split('@')[0]}님,{'\n'}{completedMissionCount}개</Text>): (<Text>손님</Text>)}
        <TouchableOpacity onPress={() => {navigation.navigate('MinigameScreen')}}>
          <Text>
            행운의 룰렛
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('MinigameScreen')}}>
          <Text>
            단어 퀴즈
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {navigation.navigate('MinigameScreen')}}>
          <Text>
            인물 퀴즈
          </Text>
        </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  roulette: {
    width: 262,
    height: 262,
    backgroundColor: '#778BD0',
    borderRadius: 150,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rouletteSection: {
    position: 'absolute',
    width: '100%',
    height: '50%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
},
modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
},
modalText: {
    marginBottom: 15,
    textAlign: "center"
},
});

export default MissionDetailScreen;

import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Animated, StyleSheet, Image, Modal } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';


const MinigameScreen = () => {
    const [angle, setAngle] = useState(new Animated.Value(0));
    const [result, setResult] = useState('');
    const [modalVisible, setModalVisible] = useState(false); // 모달 상태
    const data = [
        { color: '#3f297e', text: 500, minAngle: -36, maxAngle: 36 }, // 섹터 1
        { color: '#1d61ac', text: 100, minAngle: 253, maxAngle: 324 }, // 섹터 2
        { color: '#169ed8', text: 100, minAngle: 181, maxAngle: 252 }, // 섹터 3
        { color: '#209b6c', text: 300, minAngle: 109, maxAngle: 180 }, // 섹터 4
        { color: '#60b236', text: 100, minAngle: 37, maxAngle: 108 }  // 섹터 5
      ];
    
  
      const rotateRoulette = () => {
        angle.setValue(0);
        
        // 랜덤한 섹터 번호 선택 (0 ~ 4)
        const randomSectionIndex = Math.floor(Math.random() * 5);
        console.log(`선택된 섹터 인덱스: ${randomSectionIndex}`);
        
        // 선택된 섹터의 데이터
        const selectedSection = data[randomSectionIndex];
        console.log(`선택된 섹터: ${selectedSection.text}`);
        
        // 섹터 내에서 랜덤 각도 계산
        const randomAngleWithinSection = Math.random() * (selectedSection.maxAngle - selectedSection.minAngle) + selectedSection.minAngle;
        console.log(`섹터 내 랜덤 각도: ${randomAngleWithinSection}`);
        
        // 각도 정규화
        const normalizedAngle = (randomAngleWithinSection + 360) % 360;
        console.log(`정규화된 각도: ${normalizedAngle}`);
        
        // 최종 회전 각도
        const toValue = 360 * 5 + normalizedAngle;
        console.log(`최종 회전 각도: ${toValue}`);
        
        // 애니메이션 실행
        setTimeout(() => {
            Animated.timing(angle, {
              toValue: toValue,
              duration: 5000,
              useNativeDriver: true,
            }).start(() => {
              setResult(`선택된 섹터: ${selectedSection.text}`);
              setModalVisible(true);
        
              // 다음 회전을 위해 각도를 다시 0으로 설정

            });
          }, 500); // 1초 지연
      };
      
    const spin = angle.interpolate({
      inputRange: [0, 360],
      outputRange: ['0deg', '360deg'],
    });

  return (
    <View style={styles.container}>
        <Image source={require('../../images/RouletteArrow.png')} style={{ width: 36, height: 55, marginBottom: -35, zIndex: 1}} />
        <LinearGradient 
        colors={['#84A5F6', '#8573D9']}
        style={{ width: 300, height: 300, borderRadius: 150, justifyContent:'center', alignItems: 'center'}}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}>
            <Animated.View style={[styles.roulette, {position: 'absolute', transform: [{ rotate: spin }] }]}>
                <Image source={require('../../images/Roulette.png')} style={{ width: 360, height: 360, position: 'absolute', }} />
            </Animated.View>
            <View style={{ width: 60, height: 60, borderRadius: 150, backgroundColor:'#6993DB', alignSelf: 'center', justifyContent: 'center'}}>
                <LinearGradient 
                    colors={['#FECC2F', '#F39401']}
                    style={{ width: 50, height: 50, borderRadius: 150, justifyContent:'center', alignSelf: 'center'}}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}>
                        <LinearGradient 
                            colors={['#FEB010', '#FFE073']}
                            style={{ width: 42, height: 42, borderRadius: 150, justifyContent:'center', alignSelf: 'center'}}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 0, y: 1 }}>
                        </LinearGradient>
                </LinearGradient>
            </View>
        </LinearGradient>
        <TouchableOpacity onPress={rotateRoulette}>
            <Text>Start</Text>
        </TouchableOpacity>
        <Text style={styles.result}>{result}</Text>
        <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalText}>{result}</Text>
                        <TouchableOpacity
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.textStyle}>닫기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
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

export default MinigameScreen;
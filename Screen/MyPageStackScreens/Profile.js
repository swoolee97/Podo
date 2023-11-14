import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TextInput, Alert, Button} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles';
import { SafeAreaView } from "react-native-safe-area-context";

const Stack = createStackNavigator()


const Profile = ({ navigation }) => {
    const handleNextPagePress = () => {
        navigation.navigate('ReadContinentScreen')
    }

    const [selectedButton, setSelectedButton] = useState(null);  // 선택된 버튼의 상태를 null로 초기화
    const [inputValue, setInputValue] = useState('');
    const [showCheck, setShowCheck] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);

    const handleChangeText = (text) => {
        setInputValue(text);
        if (text.length > 3) {
            setTimeout(() => setShowCheck(true), 1000);
        } else {
            setShowCheck(false);
        }
    };

    const renderCheckmark = (imageName) => {
        if (selectedButton == imageName) {
            return (
                <View style={{width:18, height: 18, alignSelf: 'center', backgroundColor: '#4577FA', borderRadius:30, alignItems: 'center' ,justifyContent: 'center'}}>
                    <Image source={require('../../images/check.png')} style={{width: 12, height: 12}} />
                </View>
            );
        }
        return null;
    };

    return(
        <SafeAreaView style={styles.container}>
            <View style={{alignItems: 'center'}}>
                <View style={{alignItems: 'center'}}>
                <Text style={{fontSize: 14, fontFamily: 'Pretendard-Medium', color: '#000'}}>
                        프로필과 닉네임 수정이 가능합니다.
                    </Text>
                <View style={{ width: 100, height: 100, borderRadius: 50, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center',alignSelf: 'center' }}>
                    {selectedProfileImage && <Image source={selectedProfileImage} style={{ width: 100, height: 100, borderRadius: 100 }} />}
                </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 60}}>
                    <TouchableOpacity
                        style={{margin: '5%'}}
                        onPress={() => {setSelectedButton('프로필 사진1');setSelectedProfileImage(require('../../images/point_grape.png'))} }
                    >
                        <View style={{width:112, height:112, backgroundColor:'#DBFFF2', borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingBottom: 15}}>
                            <Image source={require('../../images/point_grape.png')} style={{width: 150, height: 150, borderRadius: 40}} />
                            {renderCheckmark('프로필 사진1')}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{margin: '5%'}}
                        onPress={() => {setSelectedButton('프로필 사진2');setSelectedProfileImage(require('../../images/profile2.png'))}}                
                    >
                        <View style={{width:112, height:112, backgroundColor:'#EBEBEB', borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingBottom: 15}}>
                            <Image source={require('../../images/profile2.png')} style={{width: 150, height: 150, borderRadius: 40}} />
                            {renderCheckmark('프로필 사진2')}
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={{flexDirection: 'row', marginBottom: 50}}>
                    <TouchableOpacity
                        style={{margin: '5%', marginTop:'10%'}}
                        onPress={() => {setSelectedButton('프로필 사진3');setSelectedProfileImage(require('../../images/profile3.png'))}}                
                    >
                        <View style={{width:112, height:112, backgroundColor:'#E3F7FE', borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingBottom: 15}}>
                            <Image source={require('../../images/profile3.png')} style={{width: 150, height: 150, borderRadius: 40}} />
                            {renderCheckmark('프로필 사진3')}
                        </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={{margin: '5%', marginTop:'10%'}}
                        onPress={() => {setSelectedButton('프로필 사진4');setSelectedProfileImage(require('../../images/profile4.png'))}}                
                    >
                        <View style={{width:112, height:112, backgroundColor:'#FFF7EC', borderRadius: 20, alignItems: 'center', justifyContent: 'center', paddingBottom: 15}}>
                            <Image source={require('../../images/profile4.png')} style={{width: 150, height: 150, borderRadius: 40}} />
                            {renderCheckmark('프로필 사진4')}
                        </View>
                    </TouchableOpacity>
                </View>

                <TextInput
                    placeholder="닉네임을 입력하세요"
                    placeholderTextColor={'#B9B9B9'}
                    value={inputValue}
                    onChangeText={handleChangeText} // 입력된 값으로 상태 업데이트
                    style={{width: 200, height: 50, borderBottomWidth: 1, textAlign:'center', fontFamily:'Pretendard-Medium', fontSize:18, color:'#000'}}
                />
                {inputValue.length === 0 ? (
                    // 입력값이 없을 때
                    <View style={{height:52}}/>
                ) : showCheck ? (
                    // 입력값이 4글자 이상일 때a
                    <View style={{height:52, justifyContent:'center'}}>
                        <View style={{width:18, height: 18, alignSelf: 'center', backgroundColor: '#4577FA', borderRadius:30, alignItems: 'center' ,justifyContent: 'center', marginVertical:7.5}}>
                            <Image source={require('../../images/check.png')} style={{width: 12, height: 12}} />
                        </View>
                        <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 14, color: '#B9B9B9'}}>사용하실 수 있는 이름이에요.</Text>
                    </View>
                ) : (
                    // 입력값이 있지만 4글자 미만일 때
                    <View style={{height:52, justifyContent:'center'}}>
                        <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 14, color: '#FF7474'}}>닉네임은 4글자 이상으로 해주세요.</Text>
                    </View>
                )}


            </View>
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
            <Button
            style={{}}
            title='다음으로 넘어가기'
            onPress={() => {
                if (!selectedButton) {
                    Alert.alert('실패', '프로필을 골라주세요.'); // 경고 메시지 표시
                    return;
                } else if (!inputValue.trim()) {
                    Alert.alert('실패', '닉네임을 입력하세요.'); // 경고 메시지 표시
                    return;
                } else {
                    handleNextPagePress()
                }
            }}  
            />
            </View>
        </SafeAreaView>
    )
}
export default Profile
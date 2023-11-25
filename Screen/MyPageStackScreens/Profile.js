import React, { useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { View, Text, Image, TextInput, Alert, Button, FlatList} from "react-native";
import { createStackNavigator } from "@react-navigation/stack";
import { useIsFocused } from '@react-navigation/native';
import { TouchableOpacity } from "react-native";
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles';
import { SafeAreaView } from "react-native-safe-area-context";
import profile1 from '../../images/profile1.png'
import profile2 from '../../images/profile2.png'
import profile3 from '../../images/profile3.png'
import profile4 from '../../images/profile4.png'
import { ScrollView } from "react-native-gesture-handler";

const Stack = createStackNavigator()


const Profile = ({ navigation }) => {
    const [selectedButton, setSelectedButton] = useState(null);  // 선택된 버튼의 상태를 null로 초기화
    const [inputValue, setInputValue] = useState('');
    const [showCheck, setShowCheck] = useState(false);
    const [selectedProfileImage, setSelectedProfileImage] = useState(null);
    const profileImages = [profile1,profile2,profile3,profile4]

    useEffect(() => {
        
    })

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
                <View style={{width:'15%', aspectRatio:1, alignSelf: 'center', backgroundColor: '#4577FA', borderRadius:30, alignItems: 'center' ,justifyContent: 'center'}}>
                    <Image source={require('../../images/check.png')} style={{aspectRatio:1, height:'80%'}} />
                </View>
            );
        }
        return null;
    };

    const renderItem = ({ item, index }) => (
        <View style ={{width: '50%', aspectRatio: 1,alignItems: 'center'}}>
            <TouchableOpacity onPress={() => { setSelectedButton(`프로필 사진${index + 1}`); setSelectedProfileImage(item) }} style = {{aspectRatio: 1, width: '85%', backgroundColor:'#DBFFF2', borderRadius: 20, alignItems: 'center'}}>

                    <Image source={item} style={{aspectRatio: 1, flex: 1, borderRadius: 20}} />

            </TouchableOpacity>
            {renderCheckmark(`프로필 사진${index + 1}`)}
        </View>
      );
    const onModifyPress = async () => {
        const userEmail = await AsyncStorage.getItem('user_email')
        data = {
            'user_email' : userEmail,
            'nick_name' : inputValue
        }
        const response = await fetch(PreURL.preURL + '/api/auth/update',{
            method : 'POST',
            body : JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const responseData = await response.json();
        if(response.status == 500){
            return Alert.alert('이미 사용중인 닉네임');
        }
        await AsyncStorage.setItem('nick_name', inputValue)
        return Alert.alert('변경되었습니다')
    }

    return(
        <ScrollView style={styles.container}>
            <View style = {{flex:0.5}}/>
            <Text style={{fontSize: 14, fontFamily: 'Pretendard-Medium', color: '#000', alignSelf: 'center'}}>
                    프로필과 닉네임 수정이 가능합니다.
            </Text>
            <View style = {{flex:0.5}}/>
            <View style={{ aspectRatio: 1, width: '30%', borderRadius: 100, backgroundColor: '#D9D9D9', justifyContent: 'center', alignItems: 'center',alignSelf: 'center'}}>
                {selectedProfileImage && <Image source={selectedProfileImage} style={{ aspectRatio: 1, flex: 1, borderRadius: 100}} />}
            </View>
            <View style = {{flex:0.5}}/>
            <View style={{alignItems: 'center'}}>
                <FlatList
                    style = {{marginHorizontal:'3%'}}
                    columnWrapperStyle={{justifyContent: 'space-between'}}
                    data={profileImages}
                    renderItem={renderItem}
                    keyExtractor={(index) => `key-${index}`}
                    horizontal={false}
                    numColumns={2} // 한 줄에 이미지 두 개씩 표시
                    scrollEnabled={false}
                />
            </View>
            <View style = {{flex:1}}/>
            <TextInput
                placeholder="수정할 닉네임을 입력하세요"
                placeholderTextColor={'#B9B9B9'}
                value={inputValue}
                onChangeText={handleChangeText} // 입력된 값으로 상태 업데이트
                style={{width: '60%', borderBottomWidth: 1, textAlign:'center', fontFamily:'Pretendard-Medium', fontSize:18, color:'#000', alignSelf:'center'}}
            />
            {inputValue.length === 0 ? (
                // 입력값이 없을 때
                <View/>
            ) : showCheck ? (
                // 입력값이 4글자 이상일 때a
                <View style={{height:52, justifyContent:'center'}}>
                    <View style={{width:18, height: 18, alignSelf: 'center', backgroundColor: '#4577FA', borderRadius:30, alignItems: 'center' ,justifyContent: 'center'}}>
                        <Image source={require('../../images/check.png')} style={{width: 12, height: 12}} />
                    </View>
                    <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 14, color: '#B9B9B9'}}>사용하실 수 있는 이름이에요.</Text>
                </View>
            ) : (
                // 입력값이 있지만 4글자 미만일 때
                <View style={{height:'5%', justifyContent:'center', alignSelf: 'center'}}>
                    <Text style={{fontFamily: 'Pretendard-Medium', fontSize: 14, color: '#FF7474'}}>닉네임은 4글자 이상으로 해주세요.</Text>
                </View>
            )}
            <View style = {{flex:1}}/>
            <TouchableOpacity onPress={onModifyPress}>
                <Text>
                    수정하기
                </Text>
            </TouchableOpacity>
        </ScrollView>
    )
}
export default Profile
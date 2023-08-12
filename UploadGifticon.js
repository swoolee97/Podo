import React, { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';

//카메라, 앨범 접근 라이브러리
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PreURL from './PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// import { SafeAreaView } from 'react-native-safe-area-context';
const logout = () => {
    AsyncStorage.removeItem('user_email')
    AsyncStorage.removeItem('accessToken')
}
const UploadGifticon = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);

    const showPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근

        launchImageLibrary({}, (res) => {
            if (res && res.assets && res.assets.length > 0) {
                const formdata = new FormData();
                formdata.append('file', res.assets[0].uri);
                setImageUri(res.assets[0].uri);
            }
        })
    }

    const sendImage = async () => {
        // if(await AsyncStorage.getItem('user_email') == null){
        //     Alert.alert('로그인 후 이용해주세요')
        //     return;
        // }
        let formdata = new FormData();
        formdata.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        const user_email = await AsyncStorage.getItem('user_email')
        const accessToken = await AsyncStorage.getItem('accessToken')

        formdata.append('user_email', user_email)
        formdata.append('accessToken', accessToken)
        try {
            const preURL = PreURL.preURL
            await fetch(preURL + '/api/uploadgifticon', {
                method: 'POST',
                body: formdata,
                headers: {
                    'authorization': 'Bearer ' + await AsyncStorage.getItem('accessToken'),
                    'user_email': user_email,
                }
                //response는 응답 전반 상태에 관한 내용을 담고 있음.
            }).then(async (response) => {
                const data = await response.json();
                if(data.accessToken){
                    AsyncStorage.setItem('accessToken', data.accessToken)
                }
                if (response.status == 500) {
                    Alert.alert('기부 실패 멘트')
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                else if (response.status == 401) {
                    // 여기다 로그아웃 라우터 보내는거 쓰는건가 ? 
                    console.log(response.json().message)
                    fetch(preURL + '/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_email: user_email
                        })
                    })
                        .then(res => {
                            console.log(res)
                            return res.json()
                        }
                        ).then(data => {
                            // 로그아웃 처리가 성공적으로 이루어진 경우 (서버가 로그아웃 성공 메시지를 반환한 경우)
                            if (data.success) {
                                Alert.alert('다시 로그인해주세요')
                                AsyncStorage.removeItem('accessToken');
                                AsyncStorage.removeItem('user_email');
                                navigation.replace('Auth');
                            } else {
                                console.error("Logout failed on the server side");
                            }
                        })
                        .catch(error => {
                            console.error("Error during logout:", error);
                            
                            Alert.alert('다시 로그인해주세요')
                            AsyncStorage.removeItem('accessToken');
                            navigation.replace('Auth');
                        });
                    return;
                } else if(response.status == 402){
                    Alert.alert('로그인 후 가능합니다');
                    navigation.navigate('HomeScreen')
                } else if (response.status == 200) {
                    Alert.alert('기부 성공 멘트');
                    navigation.navigate('HomeScreen')
                }
                //response.json()은 응답 본문에 관한 내용을 담음.
                return response.json()
            })
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={() => showPicker(setImageUri)}>
                <Text>기프티콘 찾기</Text>
            </TouchableOpacity>
            {imageUri && <Image source={{ uri: imageUri }} style={{ width: 200, height: 200 }} />}

            <TouchableOpacity onPress={() => sendImage()}
                disabled={!imageUri}>
                <Text>기부하기</Text>
            </TouchableOpacity>
        </View>
    );
};

export default UploadGifticon;

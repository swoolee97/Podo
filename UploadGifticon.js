import React, { useState } from 'react';
import { Text, View, Image, Alert } from 'react-native';

//카메라, 앨범 접근 라이브러리
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PreURL from './PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UploadGifticon = ({ navigation }) => {
    const [imageUri, setImageUri] = useState(null);

    const showPicker = () => {
        //launchImageLibrary : 사용자 앨범 접근 메서드
        launchImageLibrary({}, (res) => {
            if (res && res.assets && res.assets.length > 0) {
                const formdata = new FormData();
                formdata.append('file', res.assets[0].uri);
                setImageUri(res.assets[0].uri);
            }
        })
    }

    const sendImage = async () => {
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
            const response = await fetch(preURL + '/api/gifticon/upload', {
                method: 'POST',
                body: formdata,
                headers: {
                    'authorization': 'Bearer ' + await AsyncStorage.getItem('accessToken'),
                    'user_email': user_email,
                }
            })
            const data = response.json();
            if (response.status == 200) {
                Alert.alert(`${data.message}`)
                return navigation.replace('Main')
            }
            // 토큰 권한 에러
            else if (response.status == 401) {
                try {
                    const res = fetch(preURL + '/api/auth/logout', {
                        method: 'POST',
                        body: user_email,
                        headers: {
                            'Content-Type': 'application/json',
                        },
                    });
                    const logoutData = res.json();
                    if (logoutData.success) {
                        AsyncStorage.removeItem('accessToken');
                        AsyncStorage.removeItem('user_email');
                        Alert.alert(`${data.message}`)
                        navigation.replace('Auth');
                    }
                } catch (error) {
                    console.log(response.status)
                    console.error(error)
                }
            }
            else if (response.status == 500) {
                Alert.alert(`${data.message}`)
                throw new Error(`HTTP error! status: ${response.status}`);
            }

        } catch (error) {
            console.log(response.message)
            console.error(error)
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

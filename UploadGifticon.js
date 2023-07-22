import React, { useState } from 'react';
import { Text, View, Button, Image, SafeAreaView, Touchable, Alert } from 'react-native';
import styled from 'styled-components';

//카메라, 앨범 접근 라이브러리
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { preURL } from './PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { SafeAreaView } from 'react-native-safe-area-context';

const UploadGifticon = ({navigation}) => {
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
        let formdata = new FormData();
        console.log(await AsyncStorage.getItem('user_email'))
        formdata.append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'image.jpg',
        });
        formdata.append('donor_email', await AsyncStorage.getItem('user_email'))
        try {
            await fetch(preURL + '/api/uploadgifticon', {
                method: 'POST',
                body: formdata,
            //response는 응답 전반 상태에 관한 내용을 담고 있음.
            }).then((response) => {
                console.log('response : ', response)
                    if (response.status == 500) {
                        Alert.alert('기부 실패 멘트')
                        // navigation.navigate('HomeScreen')
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    //response.json()은 응답 본문에 관한 내용을 담음.
                    return response.json()
                }).then(responseJson => {
                    console.log(responseJson)
                    Alert.alert('기부 성공 멘트')
                    navigation.navigate('HomeScreen')
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

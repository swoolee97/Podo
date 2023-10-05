import React, { useEffect, useState } from 'react';
import { Text, View, Image, Alert,StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//카메라, 앨범 접근 라이브러리
import { launchImageLibrary } from 'react-native-image-picker';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PreURL from './PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginStatus } from './CommonMethods/CheckLoginStatus';
import ImagePicker from 'react-native-image-crop-picker';


const UploadGifticon = ({ }) => {
    // const [imageUri, setImageUri] = useState(null);
    const [imageUris, setImageUris] = useState([]);
    const [formData, setFormData] = useState(null);
    // 로그인 안 돼있으면 빠꾸
    const navigation = useNavigation(navigation)
    useEffect(() => {
        checkLoginStatus(navigation);
    }, []);

    const showPicker = () => {
        ImagePicker.openPicker({
            multiple: true
        }).then(images => {
            let newFormData = new FormData();
            images.forEach((image, index) => {
                newFormData.append('files', {
                    uri: image.path,
                    type: image.mime,
                    name: `image${index}.jpg`,
                });
            });
            setFormData(newFormData);
            setImageUris(images.map(image => image.path));
        });
    }

    const sendImage = async () => {
        const user_email = await AsyncStorage.getItem('user_email')
        const accessToken = await AsyncStorage.getItem('accessToken')
        try {
            const preURL = PreURL.preURL
            // const response = await fetch(preURL + '/api/gifticon/upload', {
                const response = await fetch('http://3.36.92.49:8000/upload', {
                method: 'POST',
                body: formData,
                headers: {
                    'authorization': 'Bearer ' + accessToken,
                    'user_email': user_email,
                }
            })
            const data = await response.json();
            return navigation.navigate('ModifyGifticonScreen',{
                data,
                formData,
            })

            if(data.result.coupon_status != "사용안함"){
                return Alert.alert("사용하지 않은 기프티콘을 올려주세요");
            }
            navigation.navigate('')

            if (response.status == 200) {
                await AsyncStorage.setItem('accessToken', data.accessToken)
                Alert.alert(`${data.message}`)
                return navigation.replace('Main')
            }
            // 토큰 권한 에러
            else if (response.status == 401) {
                try {
                    const res = await fetch(preURL + '/api/auth/logout', {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                            user_email: user_email
                        }),
                    });
                    const logoutData = await res.json();
                    if (logoutData.success) {
                        AsyncStorage.removeItem('accessToken');
                        AsyncStorage.removeItem('user_email');
                        Alert.alert(`${logoutData.message}`)
                        navigation.goBack();
                    }
                } catch (error) {

                }
            }
            else if (response.status == 500) {
                Alert.alert(`${data.message}`)
            }else{
                Alert.alert(`${data.message}`)
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <View style={styles.container}>
            {imageUris && <Image source={{ uri: imageUris[0] }} style={styles.image} />}
            <TouchableOpacity 
                style={styles.button} 
                onPress={() => showPicker(setImageUris)}>
                <Text style={styles.buttonText}>기프티콘 찾기</Text>
            </TouchableOpacity>

            <TouchableOpacity 
                style={[styles.button, !imageUris && styles.disabledButton]} 
                onPress={() => sendImage()}
                disabled={!imageUris}>
                <Text style={styles.buttonText}>기부하기</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        backgroundColor: '9d8dff'
    },
    button: {
        marginVertical: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
        backgroundColor: '#9d8dff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    disabledButton: {
        backgroundColor: '#9d8dff'
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginVertical: 15
    }
});
export default UploadGifticon;

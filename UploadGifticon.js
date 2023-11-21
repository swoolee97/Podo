import React, { useEffect, useState } from 'react';
import { Text, View, Image, Alert,StyleSheet, Modal } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import PreURL from './PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { checkLoginStatus } from './CommonMethods/CheckLoginStatus';
import ImagePicker from 'react-native-image-crop-picker';
import imageicon from '../Gibu/images/Imageicon.png';
import exampleimage from '../Gibu/images/example.png'

const UploadGifticon = ({ }) => {
    // const [imageUri, setImageUri] = useState(null);
    const [imageUris, setImageUris] = useState([]);
    const [formData, setFormData] = useState(null);
    // 로그인 안 돼있으면 빠꾸
    const navigation = useNavigation(navigation)
    useEffect(() => {
        checkLoginStatus(navigation);
    }, []);
    const [modalVisible, setModalVisible] = useState(false);

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
            console.log(data)
            // return;

            if(data.result.coupon_status != "사용안함"){
                return Alert.alert("사용하지 않은 기프티콘을 올려주세요");
            }

            return navigation.navigate('ModifyGifticonScreen',{
                data,
                formData,
            })
            
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
            <View style = {{alignSelf: 'center', justifyContent: 'center'}}>
                <Text style = {{fontFamily: 'Pretendard-SemiBold', fontSize: 14, textAlign:'center', marginTop: '10%', alignItems: 'center', justifyContent: 'center'}}>
                    기프티콘 교환권과 쿠폰상태가 포함된 캡쳐본 {'\n'} 한장을 업로드 해주세요.
                </Text>
                <Text style = {{fontFamily: 'Pretendard-SemiBold', fontSize: 12, marginTop:'5%', color: '#797979', marginLeft:'5%'}}>
                    예시와 같이 교환처, 상품명, 유효기간, 가격, 쿠폰상태 모두 보여야 합니다.
                </Text>
                <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Text style = {{fontFamily: 'Pretendard-SemiBold', fontSize: 12, marginTop:'3%', color: '#797979', marginBottom: '5%',alignItems: 'center', justifyContent: 'center',textAlign:'center' }}>
                        사진 예시 보기
                    </Text>
                </TouchableOpacity>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                    setModalVisible(!modalVisible);
                    }}
                >
                    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)' }}>
                        <View style={{width: '80%',height: '60%' ,backgroundColor: '#FFFFFF', borderRadius: 20, padding: 35, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.25, shadowRadius: 3.84, elevation: 5 }}>
                            <Image source={exampleimage} style={{ width: '80%', height: '95%'}} />
                            <TouchableOpacity
                                style={{ marginTop: '5%', width:'50%',alignSelf: 'center' }}
                                onPress={() => setModalVisible(false)}
                                >
                                <Text style = {{fontFamily: 'Pretendard-Regular', fontSize:14, textAlign: 'center'}}>닫기</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    </Modal>
                </View>

            <View style={{ width: '90%', height: '40%', borderRadius: 8, backgroundColor: '#A1A1A1', alignItems: 'center', alignSelf: 'center', justifyContent: 'center' }}>
                <TouchableOpacity onPress={() => showPicker(setImageUris)} style = {{alignSelf: 'center', justifyContent: 'center'}}>
                    <View style = {{ width: '75%', height:'100%', flexDirection: 'row'}}>
                        {imageUris.length > 0 && imageUris.slice(0, 2).map((uri, index) => (
                            <Image key={index} source={{ uri: uri }} style={{ width: '60%', height: '100%', marginHorizontal: '3%'}} />
                        ))}
                        {imageUris.length === 0 && (
                            <Image source={imageicon} style={{ width: '40%', height: '35%', marginTop: '35%'}} />
                        )}
                    </View>
                </TouchableOpacity>
            </View>

            <View style ={{alignItems: 'center', justifyContent: 'center'}}>
                <TouchableOpacity 
                    style={[styles.button, !imageUris && styles.disabledButton]} 
                    onPress={sendImage}
                    disabled={!imageUris}>
                    <Text style={styles.buttonText}>기부하기</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    button: {
        marginVertical: '10%',
        paddingVertical: '3%',
        paddingHorizontal: '40%',
        borderRadius: 8,
        backgroundColor: '#B774E0',
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
});
export default UploadGifticon;

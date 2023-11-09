import { View, Text, Image, StyleSheet, TouchableOpacity, Alert, VirtualizedList } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import FocusableInput from "../Styles/FocusableInput";
import stringToDate from "../../CommonMethods/stringToDate";
import { preURL } from "../../PreURL/PreURL";
import stringToPrice from "../../CommonMethods/stringToPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Modalize } from 'react-native-modalize';

const ModifyGifticonScreen = ({ navigation,route }) => {
    
    console.log("@@@@")
    console.log(route.params.data.result)
    const result = route.params.data.result
    const expiration_date = stringToDate(result.expiration_date) 
    const price = stringToPrice(result.price)

    const fetchGifticon = async () => {
        const user_email = await AsyncStorage.getItem('user_email')
        const newFormData = new FormData();
        newFormData.append('files',{
            'name' : route.params.formData._parts[0][1].name,
            'type' : route.params.formData._parts[0][1].type,
            'uri' : route.params.formData._parts[0][1].uri,
        })
        // 파일과 기타 필드 추가 (예시)
        // newFormData.append('files', formData.files[0]); // 파일 객체를 가정
        // newFormData.append('barcode_url', route.params.formData.image_url);
        newFormData.append('price', price);
        newFormData.append('expiration_date', result.expiration_date);
        newFormData.append('image_url', result.image_url);
        newFormData.append('name', result.name);
        newFormData.append('user_email',user_email)
        const response = await fetch(preURL + '/api/gifticon/upload', {
            method: 'POST',
            headers: {
                
            },
            body : 
                newFormData
        })
        const data = await response.json();
        if(response.status == 200){
            Alert.alert(data.message)
            return navigation.replace('Main')
        }
        // console.log(data)
    }
    return (
        <View style={styles.container}>
            <Text style = {{fontFamily: 'Pretendard-SemiBold', fontSize: 14, textAlign:'center', marginTop:100, alignItems: 'center', justifyContent: 'center'}}>
                추출된 쿠폰 정보를 확인해 주세요
            </Text>
            <Text style = {{fontFamily: 'Pretendard-SemiBold', fontSize: 12, textAlign:'center', marginTop:10, alignItems: 'center', justifyContent: 'center', color: '#797979'}}>
            상품명, 교환처, 유효기간, 바코드 정보가 실제 쿠폰과 일치하는지 {'\n'} 확인해 주세요.
            </Text>
            <View style = {{alignItems: 'center', justifyContent: 'center', marginTop: 20}}>
                    <Image source={{ uri: result.image_url }} style={styles.image} />
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <Text style={styles.label}>상품명</Text>
                <TextInput style={styles.input} value={result.name}
                multiline={true} 
                numberOfLines={4} />

                <Text style={styles.label}>유효기간</Text>
                <TextInput style={styles.input} value={`${expiration_date.getFullYear()}년 ${expiration_date.getMonth()}월 ${expiration_date.getUTCDate()}일` } />
            </View>

            <View style={{alignItems: 'center', justifyContent: 'center'}}>
            <TouchableOpacity onPress={fetchGifticon} style={styles.button}>
                <Text style={styles.buttonText}>기부하기</Text>
            </TouchableOpacity>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    image: {
        width: 250,
        height: 250,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    label: {
        fontFamily: 'Pretendard-Regular',
        fontSize: 14,
        color: '#404040',
        marginLeft: 10,
        marginBottom: 5
    },
    input: {
        width: 245,
        height: 45,
        borderRadius: 8,
        backgroundColor: '#F4F4F4',
        borderColor: '#D9D9D9',
        borderWidth: 1,
        marginLeft: 10,
        fontSize: 14,
        fontFamily: 'Pretendard-Regular',
        color: '#000000'
    },
    button: {
        marginTop: 50,
        backgroundColor: '#9d8dff',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        width: 370,
        height:45
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontFamily: 'Pretendard-Bold'
    },
});

export default ModifyGifticonScreen
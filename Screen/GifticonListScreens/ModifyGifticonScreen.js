import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from "react-native"
import { TextInput } from "react-native-gesture-handler";
import FocusableInput from "../Styles/FocusableInput";
import stringToDate from "../../CommonMethods/stringToDate";
import { preURL } from "../../PreURL/PreURL";
import stringToPrice from "../../CommonMethods/stringToPrice";
import AsyncStorage from "@react-native-async-storage/async-storage";

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
            <Text>추출된 기프티콘 정보를 확인해주세요.</Text>
            
            <Image source={{ uri: result.image_url }} style={styles.image} />

            <View style={styles.field}>
                <Text style={styles.label}>상품명</Text>
                <TextInput style={styles.input} value={result.name}
                multiline={true} 
                numberOfLines={4} />
            </View>

            <View style={styles.field}>
                <Text style={styles.label}>유효기간</Text>
                <TextInput style={styles.input} value={`${expiration_date.getFullYear()}년`} />
                <TextInput style={styles.input} value={`${expiration_date.getMonth()}월`} />
                <TextInput style={styles.input} value={`${expiration_date.getUTCDate()}일`} />
            </View>

            <View>
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
        padding: 20,
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'contain',
        marginBottom: 20,
    },
    field: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 10,
    },
    label: {
        flex: 2,
        fontSize: 10,
    },
    input: {
        flex: 4,
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        borderRadius: 5,
        fontSize: 16,
    },
    button: {
        marginTop: 20,
        backgroundColor: '#9d8dff',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ModifyGifticonScreen
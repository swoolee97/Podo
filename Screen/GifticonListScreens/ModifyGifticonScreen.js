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
        <View>
            <View>
                <Image source={{ uri: result.image_url }}
                    style={styles.image} />
                <Text>이름</Text>
                <FocusableInput>
                    {result.name}
                </FocusableInput>
                <Text>
                    유효기간
                </Text>
                <Text>년</Text>
                <FocusableInput>
                    {expiration_date.getFullYear()}
                </FocusableInput>
                <Text>
                    월
                </Text>
                <FocusableInput>
                    {expiration_date.getMonth()}
                </FocusableInput>
                <Text>
                    일
                </Text>
                <FocusableInput>
                    {expiration_date.getUTCDate()}
                </FocusableInput>
            </View>

            <View>
                <TouchableOpacity onPress={fetchGifticon}>
                    <Text>
                        보내기
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 200,
        height: 200,
    }
});

export default ModifyGifticonScreen
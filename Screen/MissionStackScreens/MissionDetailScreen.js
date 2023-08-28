import { Alert, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useState } from "react"
import PreURL from "../../PreURL/PreURL"

const MissionDetailScreen = ({navigation,route}) => {
    const [text,setText] = useState('')
    const handleSubmitPress = async () => {
        const response = await fetch(PreURL.preURL+'/api/mission/save',{
            method : 'POST',
            headers : {'Content-Type': 'application/json'},
            body : JSON.stringify({
                text : text,
                email : route.params.email,
            })
        })
        const data = await response.json();
        if(data.success){
            Alert.alert('성공',`${data.message}`)
            navigation.goBack();
        }
    }
    return (
        <SafeAreaView>
            <View>
                <Text>미션디테일 스크린</Text>
            </View>
                <Text>{route.params.data.mission.title}</Text>
                <Text>{route.params.data.mission.details}</Text>
            <TextInput onChangeText={setText} placeholder='본문'></TextInput>
            <TouchableOpacity onPress={() =>{
                handleSubmitPress();
            }}>
                <Text>전송</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default MissionDetailScreen
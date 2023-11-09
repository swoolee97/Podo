import { Alert, Image, SafeAreaView, Text, TouchableOpacity, View } from "react-native"
import { TextInput } from "react-native-gesture-handler"
import { useState } from "react"
import PreURL from "../../PreURL/PreURL"
import styles from "../Styles/Styles"
import missionpodo from "../../images/mission_podo.png"
import missionpodo2 from "../../images/mission_podo2.png"
import QuestionMark from "../../images/Question_Mark.png"

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
        <SafeAreaView style={[styles.container]}>
            <Image source={QuestionMark} style={{width:25, height: 25, marginLeft: 90, marginTop:90}}/>
            <Image source={missionpodo} style={{width:55, height: 55, marginLeft: 28}}/>
            <Text style={{ fontFamily: 'Pretendard-SemiBold', color: '#000000', fontSize: 16, textAlign: 'center' }}>
                {route.params.data.mission.title}
            </Text>
            <Text style={{ fontFamily: 'Pretendard-SemiBold', color: '#000000', fontSize: 16, textAlign: 'center'}}>
                {route.params.data.mission.details}
            </Text>
            <View style={{flexDirection: 'row', textAlign: 'center', justifyContent: 'center',alignItems: 'center',marginTop: 16}}>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', color: '#797979', fontSize: 12, textAlign: 'center'}}> 미션을 완료할 때마다 </Text>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', color: '#AA57DD', fontSize: 12, textAlign: 'center'}}>포도</Text>
                <Text style={{ fontFamily: 'Pretendard-SemiBold', color: '#797979', fontSize: 12, textAlign: 'center'}}>가 하나씩 적립돼요!</Text>
            </View>
        
            <View style={{ width: 350, height: 250, borderColor: '#C5C5C5', borderWidth: 1, borderRadius: 20, justifyContent: 'center', alignItems: 'center', marginLeft: 20, marginTop: 54, position: 'relative' }}>
                <TextInput style={{ fontFamily: 'Pretendard-Medium', width: '100%', paddingHorizontal: 10 }} onChangeText={setText} placeholder='답변을 입력해 주세요.' />
                <TouchableOpacity onPress={handleSubmitPress} style={{ position: 'absolute', right: 10, bottom: 10 }}>
                    <Image source={missionpodo2} style={{ width: 55, height: 55 }} />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default MissionDetailScreen
import { SafeAreaView, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { preURL } from "../../PreURL/PreURL";

const SearchingMainScreen = ({ navigation }) => {
    const [text, setText] = useState('')
    
    const searchingButton = async () => {
        const formdata = new FormData()
        formdata.append('keyword', text)
        console.log(formdata)
        try {
            await fetch(preURL + '/api/searchgifticon', {
                method: 'POST',
                body: formdata,
                headers : {
                    'Content-Type' : 'multipart/form-data'
                }
            })
            navigation.navigate('SearchingResultScreen')
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <SafeAreaView>
            <Text>서칭 메인 스크린</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput onChangeText={setText} placeholder='asdf'></TextInput>
                <TouchableOpacity onPress={() => {
                    searchingButton();
                }}>
                    <Text>찾기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default SearchingMainScreen;
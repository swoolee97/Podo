import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native"
import { useState } from "react"
import SearchingResultScreen from "./SearchingResultScreen"

const SearchingScreen = ({navigation}) => {
    const [text, setText] = useState('')
    const searchingButton = async () => {
        navigation.navigate(SearchingResultScreen)
    }
    return (
        <SafeAreaView>
            <Text>서칭 메인 스크린</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput onChangeText={setText} placeholder='기프티콘'></TextInput>
                <TouchableOpacity onPress={() => {
                    searchingButton();
                }}>
                    <Text>찾기</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )

}
export default SearchingScreen
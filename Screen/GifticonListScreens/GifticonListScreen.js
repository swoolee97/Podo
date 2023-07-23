import { SafeAreaView, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { preURL } from "../../PreURL/PreURL";

const GifticonListScreen = ({ navigation }) => {
    const [text, setText] = useState('')
    
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                <Text>기프티콘 리스트</Text>
            </View>
        </SafeAreaView>
    )
}

export default GifticonListScreen;
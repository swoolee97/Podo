import { SafeAreaView, View, Text, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

const GifticonListScreen = ({ navigation }) => {
    return (
        <SafeAreaView>
            <View>
                <TouchableOpacity onPress={() => {
                    navigation.navigate('GifticonDetailScreen')
                }}>
                    <Text>기프티콘 리스트</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default GifticonListScreen;

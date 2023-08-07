import { SafeAreaView, View, Text, TextInput } from "react-native";
import { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { preURL } from "../../PreURL/PreURL";
import GifticonDetailScreen from "../GifticonListScreens/GifticonDetailScreen";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

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
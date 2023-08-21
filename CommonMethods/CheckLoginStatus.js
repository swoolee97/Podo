import { Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
export const checkLoginStatus = async (navigation) => {
    const user_email = await AsyncStorage.getItem('user_email');
    const accessToken = await AsyncStorage.getItem('accessToken');
    if (!user_email || !accessToken) {
        await AsyncStorage.removeItem('user_email');
        await AsyncStorage.removeItem('accessToken');
        navigation.goBack();
        Alert.alert('로그인 후 이용해주세요');
    }
};

// export default checkLoginStatus
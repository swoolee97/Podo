import { SafeAreaView, Text, View, TextInput } from "react-native"
import { TouchableOpacity } from "react-native-gesture-handler"
import { useState } from "react"
import { PreURL } from "../../PreURL/PreURL"
import { createStackNavigator } from "@react-navigation/stack"
import RegisterScreen from "./RegisterScreen"
const Stack = createStackNavigator()
const LoginScreen = ({ navigation }) => {
    const PreURL = require('../../PreURL/PreURL')
    const [userId, setUserId] = useState('')
    const [userPassword, setUserPassword] = useState('')
    const loginSubmit = () => {
        let dataToSend = { user_id: userId, user_pw: userPassword };
        let formBody = [];
        for (let key in dataToSend) {
            let encodedKey = encodeURIComponent(key);
            let encodedValue = encodeURIComponent(dataToSend[key]);
            formBody.push(encodedKey + '=' + encodedValue);
        }
        formBody = formBody.join('&');
        console.log(formBody)
        fetch(PreURL.preURL + '/api/user/login', {
            method: 'POST',
            body: formBody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            },
        }).then((response) => response.json())
            .then((responseJson) => {
                console.log(responseJson.login)
                if (responseJson.login == 'success') {
                    navigation.replace('Main')
                } else {
                    navigation.replace('RegisterScreen')
                }
            }).catch((error) => {
                //Hide Loader
                // setLoading(false);
                console.error(error);
            });
    }

    return (

        <SafeAreaView>
            <View>
                <Stack.Screen name="회원가입" component={RegisterScreen} />
                <TouchableOpacity
                    onPress={() => navigation.navigate('RegisterScreen')}
                >
                    <Text>회원가입</Text>
                </TouchableOpacity>
                <TextInput
                    onChangeText={(userId) => { setUserId(userId) }}
                    placeholder='아이디'
                />
                <TextInput
                    onChangeText={(userPassword) => { setUserPassword(userPassword) }}
                    placeholder='비밀번호'
                />
                <TouchableOpacity
                    onPress={loginSubmit}
                >
                    <Text>로그인</Text>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}
export default LoginScreen
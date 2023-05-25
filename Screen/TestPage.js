import React from "react"
import { Text, View, SafeAreaView } from "react-native"
import { createStackNavigator } from "@react-navigation/stack"

const Stack = createStackNavigator()

const TestPage = () => {
    return (
        <SafeAreaView>
            <View>
                <Text>마이페이지 테스트</Text>
            </View>
        </SafeAreaView>
    )
}
export default TestPage
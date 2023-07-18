import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import SearchingMainScreen from "../SearchingScreens/SearchingMainScreen";
import SearchingResultScreen from "../SearchingScreens/SearchingResultScreen";

const Stack = createStackNavigator()
const SearchingScreen = () => {
    return (
        <Stack.Navigator initialRouteName="SearchingMainScreen">
            <Stack.Screen component = {SearchingMainScreen} name = 'SearchingMainScreen'/>
            <Stack.Screen component={SearchingResultScreen} name = 'SearchingResultScreen'/>
        </Stack.Navigator>
    )
}
export default SearchingScreen
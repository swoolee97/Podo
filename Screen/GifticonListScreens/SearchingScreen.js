import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, StyleSheet, Image } from "react-native"
import { useState } from "react"
import { FlatList } from "react-native"
import SearchingResultScreen from "./SearchingResultScreen"
import PreURL from "../../PreURL/PreURL"

const SearchingScreen = ({navigation}) => {
    const [gifts, setGifts] = useState([]);
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const handleSearchPress = async () => {
        if(keyword.length < 2){
            return Alert.alert('두글자 이상 입력해주세요')
        }
        const response = await fetch(PreURL.preURL+`/api/gifticon/search?keyword=${keyword}&page=${page}`);
        const data = await response.json()
        if(page == 1){
            setGifts(data.gifticons)
        }else{
            setGifts(prevGifts => [...prevGifts,...data.gifticons])
        }
    }
    return (
        <SafeAreaView>
            <Text>서칭 메인 스크린</Text>
            <View style={{ flexDirection: 'row' }}>
                <TextInput onChangeText={setKeyword} placeholder='기프티콘'></TextInput>
                <TouchableOpacity onPress={() => {
                    handleSearchPress();
                }}>
                    <Text>찾기</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={gifts}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress = {() => handleSearchPress(item)}>
                        <View style={styles.listItem}>
                            <Image source={{ uri: item.url }} style={styles.image} />
                            <Text style={styles.itemName}>{item.gifticon_name}</Text>
                            <Text>{item.price}원</Text>
                        </View>
                    </TouchableOpacity>
                )}
                // onEndReached={}
                onEndReachedThreshold={0.8} // 리스트의 80% 스크롤하면 추가 데이터 로드
                ListFooterComponent={() => isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        // onRefresh={onRefresh}
                    />
                }
            />
        </SafeAreaView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 10,
    },
    listItem: {
        flex: 1,
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 150,
        height: 150,
        borderRadius: 15,
    },
    itemName: {
        marginTop: 10,
    },
});
export default SearchingScreen
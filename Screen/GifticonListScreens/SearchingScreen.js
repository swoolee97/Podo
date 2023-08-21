import { SafeAreaView, View, Text, TextInput, TouchableOpacity, Alert, ActivityIndicator, RefreshControl, StyleSheet, Image } from "react-native"
import { useState, useEffect } from "react"
import { FlatList } from "react-native"
import PreURL from "../../PreURL/PreURL"

const SearchingScreen = ({ navigation }) => {
    const [gifts, setGifts] = useState([]);
    const [keyword, setKeyword] = useState('')
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [firstKeyword, setFirstKeyword] = useState('');

    // 찾기버튼을 눌렀을 땐 false.   isSearchButton == 찾기 눌렀을 때 true
    const handleSearchPress = async (isSearchButton = true) => {
        if (isSearchButton && keyword.length < 2) {
            return Alert.alert('두글자 이상 입력해주세요')
        }
        if (isSearchButton) {
            setPage(1)
            setHasMore(true)
            setGifts([])
            setFirstKeyword(keyword)
        }
        // 받아올 데이터가 더 없는데 추가데이터를 불러오려고 할 때 return
        if (!hasMore && !isSearchButton) {
            return;
        }
        try {
            if(!isSearchButton){
                setPage(page+1)
            }
            const fetchKeyword = isSearchButton ? keyword : firstKeyword;
            const nextPage = isSearchButton ? 1 : page + 1;
            const response = await fetch(`${PreURL.preURL}/api/gifticon/search?keyword=${fetchKeyword}&page=${nextPage}`)
            const data = await response.json()
            if (isSearchButton) {
                setGifts(data.gifticons)
            } else {
                setGifts(prevGifts => [...prevGifts, ...data.gifticons])
            }
            setHasMore(data.hasMore)
        } catch (error) {
            console.error(error)
        }
    }
    return (
        <SafeAreaView>
            <View style={{ flexDirection: 'row' }}>
                <TextInput onChangeText={setKeyword} placeholder='검색어'></TextInput>
                <TouchableOpacity onPress={() => {
                    handleSearchPress(true);
                }}>
                    <Text>찾기</Text>
                </TouchableOpacity>
            </View>
            <View>

                <FlatList
                    data={gifts}
                    numColumns={2}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity >
                            <View style={styles.listItem}>
                                <Image source={{ uri: item.url }} style={styles.image} />
                                <Text style={styles.itemName}>{item.gifticon_name}</Text>
                                <Text>{item.price}원</Text>
                            </View>
                        </TouchableOpacity>
                    )}
                    onEndReached={() => {
                        if (hasMore) {
                            console.log('추가 데이터 불러오기')
                            handleSearchPress(false);
                        }
                    }}
                    onEndReachedThreshold={1.0} // 리스트의 80% 스크롤하면 추가 데이터 로드
                    ListFooterComponent={() => isLoading ? <ActivityIndicator size="small" color="#0000ff" /> : null}
                    showsVerticalScrollIndicator={false}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={() => {

                            }}
                        />
                    }
                />
            </View>
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
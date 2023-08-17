import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, Image, ActivityIndicator, RefreshControl } from 'react-native';
import PreURL from '../../PreURL/PreURL';
const GiftIconList = () => {
    const [gifts, setGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false);
    useEffect(() => {
        if(hasMore) {
            fetchGifts();
        }
    }, [hasMore]);
    
    const onRefresh = async () => {
        setRefreshing(true);
        setHasMore(true)
        setPage(1);
        setGifts([]);
        await fetchGifts(1); // 첫 페이지 로드.
        setRefreshing(false);
    }

    const fetchGifts = async (refreshPage) => {
        try {
            if(!hasMore) return;
            const currentPage = refreshPage ? 1 : page
            const response = await fetch(PreURL.preURL + `/api/gifticon?page=${currentPage}`);
            const data = await response.json();
            console.log(data);
            
            if (currentPage === 1) {  // 첫 페이지인 경우 기존 데이터 대체
                setGifts(data.gifticons);
            } else {
                setGifts(prevGifts => [...prevGifts, ...data.gifticons]);
            }

            if (data.loading == false) {
                setHasMore(false);
            } else {
                console.log('@@@')
                setHasMore(true);
                setPage(prevPage => prevPage + 1); // 페이지번호 증가
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={gifts}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <Image source={{ uri: item.url }} style={styles.image} />
                        <Text style={styles.itemName}>{item.gifticon_name}</Text>
                        <Text>{item.price}원</Text>
                    </View>
                )}
                onEndReached={() => fetchGifts()}
                onEndReachedThreshold={0.8} // 리스트의 80% 스크롤하면 추가 데이터 로드
                ListFooterComponent={() => isLoading ? <ActivityIndicator size="large" color="#0000ff" /> : null}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                    />
                }
            />
        </View>
    );
};

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

export default GiftIconList;

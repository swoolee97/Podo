import React, { useState } from 'react';
import { View, Text, FlatList, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';

const GiftIconList = ({navigation}) => {
    const [gifts, setGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = async () => {
        setRefreshing(true);
        setHasMore(true)
        setPage(1);
        await fetchGifts(1); // 첫 페이지 로드.
        setRefreshing(false);
    }

    const fetchGifts = async (refreshPage) => {
        try {
            if (!hasMore) return;
            const currentPage = refreshPage ? 1 : page
            const response = await fetch(PreURL.preURL + `/api/gifticon/list?page=${currentPage}`);
            const data = await response.json();
            
            if (currentPage === 1) {  // 첫 페이지인 경우 기존 데이터 대체
                setGifts(data.gifticons);
            } else {
                setGifts(prevGifts => [...prevGifts, ...data.gifticons]);
            }

            if (data.loading == false) {
                setHasMore(false);
            } else {
                setHasMore(true);
                setPage(prevPage => prevPage + 1); // 페이지번호 증가
            }
            setIsLoading(false);
        } catch (error) {
            console.error(error)
        }
    };
    const handleItemPress = (item) => {
        navigation.navigate('GifticonDetailScreen',{
            gifticonId : item._id
        })
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.Input, {top:20, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start'}]}
                onPress={() => {navigation.navigate('SearchingScreen');}}
            >
                <Image 
                    source={require('../../images/Searchicon.png')}
                    style={{width:20, height:20,  marginLeft: 10, tintColor: '#A9A9A9'}} 
                    resizeMode="contain"/>
                <Text 
                 style={ {fontFamily: 'Pretendard-Regular', fontSize:14 ,marginLeft: 8, color: '#666666'}}>
                    원하는 상품이 있으신가요?
                </Text>
            </TouchableOpacity>

            
            <FlatList 
                style={{top:70, marginHorizontal: '5%'}}
                columnWrapperStyle={styles.columnWrapper}
                data={gifts}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress = {() => handleItemPress(item)}>
                                <Image source={{ uri: item.url }} style={styles.image}/>
                                <Text style={styles.brandtext}>{item.company}</Text>
                                <Text style={styles.itemName}>{item.gifticon_name}</Text>
                                <Text style={styles.price}>{item.price}포인트</Text>
                        </TouchableOpacity>
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

export default GiftIconList;

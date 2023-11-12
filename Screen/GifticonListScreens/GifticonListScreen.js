import React, { useState } from 'react';
import {SafeAreaView ,View, Text, FlatList, Image, ActivityIndicator, RefreshControl, TouchableOpacity } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';

const GiftIconList = ({navigation}) => {
    const [gifts, setGifts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('전체');
    // Sample categories, you can fetch these from your API as well
    const categories = ['전체', '치킨', '피자', '카페', '편의점', '패스트푸드', '아이스크림', '상품권', '베이커리'];

    const onRefresh = async () => {
        setRefreshing(true);
        setHasMore(true)
        setPage(1);
        await fetchGifts(1); // 첫 페이지 로드.
        setRefreshing(false);
    }

    const fetchGifts = async (refreshPage, category = selectedCategory) => {
        try {
            if (!hasMore) return;
            const currentPage = refreshPage ? 1 : page
            const response = await fetch(PreURL.preURL + `/api/gifticon/list?page=${currentPage}${categoryQuery}`);
            const data = await response.json();
            const categoryQuery = category !== 'all' ? `&category=${category}` : '';
            
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
    };
    const CategoryComponent = () => (
        <View style={styles.categoryContainer}>
            <FlatList
                horizontal
                data={categories}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={[
                            styles.categoryButton,
                            item === selectedCategory && styles.categoryButtonSelected,
                        ]}
                        onPress={() => {
                            setSelectedCategory(item);
                            fetchGifts(1, item);
                        }}
                    >
                        <Text style={[
                            styles.categoryButtonText,
                            item === selectedCategory && styles.categoryButtonSelectedText,
                        ]}>{item}</Text>
                    </TouchableOpacity>
                )}
                showsHorizontalScrollIndicator={false}
            />
        </View>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                style={styles.searchbutton}
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
            <CategoryComponent />
            <TouchableOpacity 
            style={styles.donationButton} 
            onPress={() => navigation.navigate('UploadGifticon')}>
            <Text style={styles.donationButtonText}>기부</Text>
            </TouchableOpacity>

            <FlatList 
                style={{marginHorizontal: '5%'}}
                columnWrapperStyle={styles.columnWrapper}
                data={gifts}
                numColumns={2}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <View style={styles.listItem}>
                        <TouchableOpacity onPress = {() => handleItemPress(item)}>
                                <Image source={{ uri: item.image_url }} style={styles.image}/>
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
            
        </SafeAreaView>
    );
};

export default GiftIconList;

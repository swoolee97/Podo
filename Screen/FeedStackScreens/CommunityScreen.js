import React, { useState, useEffect} from 'react';
import { View, FlatList, Text, Image, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';

const { width } = Dimensions.get('window');
const itemWidth = width / 2-10;
const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const updateDimensions = () => {
    setWindowDimensions(Dimensions.get('window'));
  };
  
  useEffect(() => {
    let navListener = navigation.addListener('focus', fetchData);
    const dimensionSubscription = Dimensions.addEventListener('change', updateDimensions);

    return () => {
        navListener.remove();
        dimensionSubscription.remove();
    };
}, []);

  const fetchData = async () => {
    try {
      const response = await fetch(PreURL.preURL + '/api/feed/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('There was an error fetching data', error);
    }
  };
  const goToPostDetail = (post) => {
    navigation.navigate('CommunityDetail', post);
  };

  return (
    <View style={styles.container}>
      <View style={{flex:9}}>
        <FlatList
          style={{margin: '5%'}}
          columnWrapperStyle={styles.columnWrapper}
          data={posts}
          keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
          renderItem={({ item }) => (
            <View style={styles.listItem}>
              <TouchableOpacity  onPress={() => goToPostDetail(item)}>
                {Array.isArray(item.imageUrl) && (
                  <ScrollView  style={{width: '100%', aspectRatio: 1}}
                    horizontal={true} 
                    pagingEnabled={true} 
                    showsHorizontalScrollIndicator={true}
                  >
                    {item.imageUrl.map((uri) => (
                          
                      <Image source={{ uri }} style={styles.image}/>
                          
                    ))}
                  </ScrollView>
                )}
                <Text style={styles.price}>{item.text}</Text>
              </TouchableOpacity>
              <Text  style={styles.itemName}>{item.email}</Text>
              <Text style={styles.brandtext}>{new Date(item.createdAt).toLocaleString()}</Text>
            </View>
          )}
          numColumns={2}
        />
      </View>
      <View style={{flex:1, justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
          alignItems: 'center'}}>
        <TouchableOpacity
          onPress={() => navigation.navigate('WriteCommunity')}
          style={{
            marginHorizontal: '5%',
            width: '90%',
            height: '70%',
            backgroundColor: '#3BCDA1',
            borderRadius: 8,
            justifyContent: 'center', // 텍스트를 세로로 중앙에 위치시키기 위해 추가
            alignItems: 'center'}}
        >
          <Text style={styles.buttonText}>글쓰기</Text>  
        
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CommunityScreen;
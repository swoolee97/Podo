import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, Text, Image, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';
import myPageIcon from '../../images/Profileicon.png';


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
    <SafeAreaView style={styles.container}>
      
      <FlatList
        style={{marginHorizontal: '5%', marginTop: '5%'}}
        columnWrapperStyle={styles.columnWrapper}
        data={posts}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity  onPress={() => goToPostDetail(item)}>
              {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 && (
                  <Image source={{ uri: item.imageUrl[0] }} style={styles.image}/>
              )}
            </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'5%'}}>
                <Image 
                  source={myPageIcon}
                  style={{ width: '13%', aspectRatio:1, borderRadius: 20, backgroundColor:'grey', marginRight: 10 }} 
                />
                <Text  style={styles.itemName}>{item.email.split('@')[0]}</Text>
              </View>
              <TouchableOpacity  onPress={() => goToPostDetail(item)}>
                <Text style={[styles.itemName,{marginTop:'2%'}]} numberOfLines={1} ellipsizeMode="tail">
                  {item.text}
                </Text>  
              </TouchableOpacity>
          </View>
        )}
        numColumns={2}
      />
      
      <TouchableOpacity
        onPress={() => navigation.navigate('WriteCommunity')}
        style={styles.button}
      >
        <Text style={styles.buttonText}>글쓰기</Text>  
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default CommunityScreen;
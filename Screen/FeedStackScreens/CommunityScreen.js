import React, { useState, useEffect} from 'react';
import { SafeAreaView, View, FlatList, Text, Image, Button, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import styles from '../Styles/Styles.js';
import myPageIcon from '../../images/Profileicon.png';
import WriteIcon from '../../images/Writeicon.png';


const CommunityScreen = ({navigation}) => {
  const [posts, setPosts] = useState([]);


  useEffect(() => {
    const navListener = navigation.addListener('focus', fetchData);


    return () => {
        navListener();
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
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity  onPress={() => navigation.navigate('WriteCommunity')} style={{ marginRight: 15 }}>
          <Image
            source={WriteIcon}
            style={{ width: 30, height: 30}} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation]);
  
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
              <Text style={[styles.itemName,{marginTop:'2%'}]} numberOfLines={1} ellipsizeMode="tail">
                {item.text}
              </Text>  
          </View>
        )}
        numColumns={2}
      />
    </SafeAreaView>
  );
};

export default CommunityScreen;
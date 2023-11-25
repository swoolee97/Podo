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
        style={{marginHorizontal: '5%'}}
        columnWrapperStyle={styles.columnWrapper}
        data={posts}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()} 
        //키 추출기(keyExtractor): FlatList의 keyExtractor에서 임의의 문자열(Math.random().toString())을 반환하고 있습니다. 이는 성능 문제를 일으킬 수 있으며, 리액트가 컴포넌트를 효율적으로 재사용하지 못하게 만듭니다. 각 항목의 고유 식별자(item._id)가 없을 경우, 리스트의 데이터 구조를 검토하고 항상 일정한 고유 키를 제공해야 합니다.
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <TouchableOpacity  onPress={() => goToPostDetail(item)}>
              {Array.isArray(item.imageUrl) && item.imageUrl.length > 0 && ( 
                // 하지만, URL이 유효한지, 혹은 네트워크 오류가 발생할 경우의 처리가 없습니다.
                  <Image source={{ uri: item.imageUrl[0] }} style={styles.image}/>
              )} 
            </TouchableOpacity>

              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop:'5%'}}>
                <Image 
                  source={myPageIcon}
                  style={{ width: '13%', aspectRatio:1, borderRadius: 20, backgroundColor:'grey', marginRight: 10 }} 
                />
                <Text  style={styles.itemName}>{item.nickName}</Text>
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
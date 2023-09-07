import React, { useState, useEffect} from 'react';
import { View, FlatList, Text, Image, Button, ScrollView,Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet } from 'react-native';
import PreURL from '../../PreURL/PreURL';

const { width } = Dimensions.get('window');
const itemWidth = width / 2-10;

const styles = StyleSheet.create({
  imageContainer: {
    padding: 5,
  },
  postContainer: {
    marginBottom: 20,
    width: itemWidth,
  },
  imageStyle: {
    width: itemWidth,
    height: 150,
  },
  columnWrapperStyle: {
    justifyContent: 'space-between',
  },
  listItem: {
    width: '45%',
    marginTop: '5%'
  },
  image: {
    aspectRatio: 1,
    borderRadius: 15,
    borderColor: '#A1A1A1',
    borderWidth: 1,
  },
});

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  const [windowDimensions, setWindowDimensions] = useState(Dimensions.get('window'));
  const updateDimensions = () => {
    setWindowDimensions(Dimensions.get('window'));
  };
  
  useEffect(() => {
    const navListener = navigation.addListener('focus', fetchData);
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

  const isLargeScreen = windowDimensions.width >= 500;

  const goToPostDetail = (post) => {
    navigation.navigate('CommunityDetail', post);
  };

  return (
    <View style={{ flex: 1, padding: isLargeScreen ? 40 : 20 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.postContainer}>
            <Text>{item.email}</Text>
            <Text style={{ fontSize: 8 }}>작성 시간: {new Date(item.createdAt).toLocaleString()}</Text>
            {Array.isArray(item.imageUrl) && (
              <ScrollView 
                horizontal={true} 
                pagingEnabled={true} 
                showsHorizontalScrollIndicator={false}
              >
                {item.imageUrl.map((uri, index) => (
                      <View style={styles.imageContainer} key={index}>
                        <Image source={{ uri }} style={styles.imageStyle}/>
                      </View>
                ))}
              </ScrollView>
            )}
            <Text onPress={() => goToPostDetail(item)}>{item.text}</Text>
          </View>
        )}
        numColumns={isLargeScreen ? 3 : 2}
        columnWrapperStyle={styles.columnWrapperStyle}
      />
       <Button title="글쓰기" onPress={() => navigation.navigate('WriteCommunity')} />
    </View>
  );
};

export default CommunityScreen;
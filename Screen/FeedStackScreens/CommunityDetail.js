import React, { useState, useRef } from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, StyleSheet } from 'react-native';
import styles from '../Styles/Styles.js';
import myPageIcon from '../../images/Profileicon.png';
const CommunityDetail = ({ route }) => {
  const { email, text, createdAt, imageUrl } = route.params;

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const scrollRef = useRef();

  const handleScroll = (event) => {
    const viewSize = event.nativeEvent.layoutMeasurement.width;
    const contentOffset = event.nativeEvent.contentOffset.x;

    const currentIndex = Math.round(contentOffset / viewSize); // Use round instead of floor
    setCurrentImageIndex(currentIndex);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
        <Image 
          source={myPageIcon}
          style={{ width: 40, height: 40, borderRadius: 20, marginRight: 10 }} 
        />
        <View>
          <Text style={styles.itemName}>{email}</Text>
          <Text style={styles.brandtext}>{createdAt}</Text>
        </View>
      </View>

      <View style={{ aspectRatio: 1 }}>
        {Array.isArray(imageUrl) && (
          <ScrollView
            ref={scrollRef}
            horizontal={true}
            pagingEnabled={true}
            showsHorizontalScrollIndicator={false}
            onScroll={handleScroll}
            scrollEventThrottle={16}
          >
            {imageUrl.map((uri, index) => (
              <Image key={index} source={{ uri }} style={{ aspectRatio: 1 }} />
            ))}
          </ScrollView>
        )}
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', margin: '3%'}}>
        {imageUrl.map((_, index) => (
          <View key={index} style={[
            { width: 8, height: 8, borderRadius: 4, marginHorizontal: 3 },
            currentImageIndex === index ? { backgroundColor: '#3BCDA1' } : { backgroundColor: 'gray' }
          ]}/>
        ))}
      </View>
      <Text style={[styles.price,{ marginHorizontal: 10 }]}>{text}</Text>
      
    </SafeAreaView>
  );
};

export default CommunityDetail;

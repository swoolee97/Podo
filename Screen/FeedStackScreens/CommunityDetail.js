import React, { useState, useRef, useEffect } from 'react';
import { View, SafeAreaView, Text, Image, ScrollView, StyleSheet, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, Platform } from 'react-native';
import styles from '../Styles/Styles.js';
import myPageIcon from '../../images/Profileicon.png';
import favoriteImage from '../../images/Favorite.png';
import heartImage from '../../images/Heart2.png';
import FocusableInput from '../Styles/FocusableInput.js';
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
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const handleCommentSubmit = () => {
    setComments([...comments, newComment]);
    setNewComment('');
  };
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    if (liked) {
      setLikes(likes - 1);
    } else {
      setLikes(likes + 1);
    }
    setLiked(!liked);
  };
  const [showComments, setShowComments] = useState(false);

  // 댓글 목록 토글 함수
  const toggleComments = () => {
    setShowComments(!showComments);
  };


  return (
    
      <SafeAreaView style={styles.container}>
        <ScrollView
            keyboardShouldPersistTaps="handled" // 여기에 추가
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Image 
              source={myPageIcon}
              style={{ width: '10%', aspectRatio:1, borderRadius: 30, backgroundColor:'grey', marginRight: 10 }} 
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
          
          


          <View style={{ flexDirection: 'row', alignItems: 'center', margin: 10 }}>
            <TouchableOpacity onPress={handleLike}>
              <Image 
                source={liked ? heartImage : favoriteImage}
                style={{ width: 24, height: 24, marginRight: 10 }} 
              />
            </TouchableOpacity>
            <Text style={styles.itemName}>{likes}</Text>
            
            <Text style={[styles.itemName,{marginLeft:'77%'}]}>댓글 {comments.length}개</Text>
            
          </View>

          
         
          
          <Text style={[styles.itemName,{ marginHorizontal: '3%', fontSize:14 }]}>{text}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', padding: 10 }}>
            <Image 
              source={myPageIcon}
              style={{ width: '10%', aspectRatio:1, borderRadius: 30, backgroundColor:'grey', marginRight: 10 }} 
            />
            <FocusableInput
              value={newComment}
              onChangeText={text => setNewComment(text)}
              onSubmitEditing={handleCommentSubmit} // 'Enter' 키를 눌렀을 때 댓글 추가
              
              style={{
                flex:1,
                height: 40,
                backgroundColor: '#F4F4F4',
                borderColor: '#D9D9D9',
                borderWidth: 1,
                borderRadius: 8,
              }}
            />
          </View>
          <View>
            {comments.map((comment, index) => (
              <Text key={index} style={{ padding: 5 }}>{comment}</Text>
            ))}
          </View>
        </ScrollView>
      </SafeAreaView>
  
  );
};

export default CommunityDetail;

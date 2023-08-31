import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, TextInput, Image, Button, Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import PreURL from '../../PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CommunityScreen = () => {
  const [posts, setPosts] = useState([]);
  const [isWriting, setIsWriting] = useState(false);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);

  const fetchData = async () => {
    try {
      const response = await fetch(PreURL.preURL + '/api/feed/posts');
      const clonedResponse = response.clone();

      const responseText = await clonedResponse.text();
      console.log("Received response: ", responseText);

      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('There was an error fetching data', error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);


  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const paths = images.map(image => image.path);
      setNewPostImage(paths);
    });
  };

  const handleSubmit = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken');
        const user_email = await AsyncStorage.getItem('user_email');
        const formData = new FormData();
        
        formData.append('text', newPostText);
    
        if (Array.isArray(newPostImage)) {
          newPostImage.forEach((imageUri, index) => {
            const fileName = imageUri.split('/').pop();
            const fileType = fileName.split('.').pop();
            formData.append('image', {
              uri: imageUri,
              type: `image/${fileType}`,
              name: fileName,
            });
          });
        }

        const response = await fetch(PreURL.preURL + '/api/feed/posts', {
            method: 'POST',
            headers: { 
              'Content-Type': 'multipart/form-data',
              'user_email': user_email,
              'Authorization': 'Bearer ' + accessToken
            },
            body: formData
        });
        const data = await response.json();
        if (data.success) {
          Alert.alert('성공', `${data.message}`);
          setIsWriting(false);
          setNewPostText('');
          setNewPostImage(null);
          fetchData();
        }
    } catch (error) {
      console.error('There was an error sending data', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item._id ? item._id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.email}</Text>
            <Text>{item.text}</Text>
            <Text>작성 시간: {new Date(item.createdAt).toLocaleString()}</Text>
            {Array.isArray(item.imageUrl) && item.imageUrl.map((uri, index) => (
            <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }}/>
))}
          </View>
        )}
      />
      <Button title="글쓰기" onPress={() => setIsWriting(!isWriting)} />
      {isWriting && (
      <View style={{ marginVertical: 20 }}>
        <TextInput
          placeholder="글을 작성해주세요"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setNewPostText(text)}
          value={newPostText}
        />
        {/* 여러 장의 이미지를 렌더링 */}
        {Array.isArray(newPostImage) && newPostImage.map((uri, index) => (
          <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }} />
        ))}
          <Button title="사진 찾기" onPress={pickImage} />
          <Button title="제출" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};

export default CommunityScreen;

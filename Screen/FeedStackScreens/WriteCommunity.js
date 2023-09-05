import React, { useState } from 'react';
import { View, TextInput, Button, Image,Alert } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreURL from '../../PreURL/PreURL';

const WriteCommunityScreen = () => {
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [posts, setPosts] = useState([]);

  const pickImage = () => {
    ImagePicker.openPicker({
      multiple: true
    }).then(images => {
      const paths = images.map(image => image.path);
      setNewPostImage(paths);
    });
  };

  const fetchData = async () => {
    try {
      const response = await fetch(PreURL.preURL + '/api/feed/posts');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('There was an error fetching data', error);
    }
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
        } else {
            Alert.alert('실패', `${data.message}`);
        }
    } catch (error) {
      console.error('There was an error sending data', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TextInput
        placeholder="글을 작성해주세요"
        multiline
        numberOfLines={4}
        onChangeText={(text) => setNewPostText(text)}
        value={newPostText}
      />
    {Array.isArray(newPostImage) && newPostImage.length > 0 && newPostImage.map((uri, index) => ( // 빈 배열 확인
      <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }} />
      ))}
      <Button title="사진 찾기" onPress={pickImage} />
      <Button title="제출" onPress={handleSubmit} />
    </View>
  );
};

export default WriteCommunityScreen;
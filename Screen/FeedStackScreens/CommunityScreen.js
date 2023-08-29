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

  useEffect(() => {
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
  
    fetchData();
  }, []);

  const pickImage = () => {
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };
  
    ImagePicker.launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setNewPostImage(source.uri);
      }
    });
  };  

  const handleSubmit = async () => {
    try {
        const accessToken = await AsyncStorage.getItem('accessToken')
        const response = await fetch(PreURL.preURL + '/api/feed/posts', {
            method: 'POST',
            headers: { 
              'Content-Type': 'application/json',
              'Authorization': 'Bearer ' +  accessToken 
        },
      });
      const data = await response.json();
      if (data.success) {
        Alert.alert('성공', `${data.message}`);
        setIsWriting(false);
        setNewPostText('');
        setNewPostImage(null);
      }
    } catch (error) {
      console.error('There was an error sending data', error);
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 20 }}>
            <Text>{item.email}</Text>
            <Text>{item.text}</Text>
            {item.imageUrl && <Image source={{ uri: item.imageUrl }} style={{ width: 100, height: 100 }} />}
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
          {newPostImage && <Image source={{ uri: newPostImage }} style={{ width: 100, height: 100 }} />}
          <Button title="사진 찾기" onPress={pickImage} />
          <Button title="제출" onPress={handleSubmit} />
        </View>
      )}
    </View>
  );
};
export default CommunityScreen;
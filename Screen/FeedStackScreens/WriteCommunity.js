import React, { useState } from 'react';
import {ScrollView, View, TextInput, TouchableOpacity, Image, Alert, Text, KeyboardAvoidingView, Platform } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PreURL from '../../PreURL/PreURL';
import { useNavigation } from '@react-navigation/native';
import styles from '../Styles/Styles.js';
import feedIcon from '../../images/Imageicon.png';
const WriteCommunityScreen = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [newPostText, setNewPostText] = useState('');
  const [newPostImage, setNewPostImage] = useState(null);
  const [isWriting, setIsWriting] = useState(false);
  const [posts, setPosts] = useState([]);
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableOpacity onPress={pickImage} style={{ marginRight: 15 }}>
          <Image
            source={feedIcon}
            style={{ width: 20, height: 20}} 
          />
        </TouchableOpacity>
      ),
    });
  }, [navigation, pickImage]);
  const handleScroll = (event) => {
    const viewWidth = event.nativeEvent.layoutMeasurement.width; // ScrollView의 가로 넓이
    const contentOffsetX = event.nativeEvent.contentOffset.x;   // 현재 스크롤 위치
    const currentIndex = Math.round(contentOffsetX / viewWidth); // 가장 가까운 이미지 인덱스로 반올림
    setCurrentIndex(currentIndex);
  };
  
  
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
        const nick_name = await AsyncStorage.getItem('nick_name');
        const formData = new FormData();
        
        formData.append('text', newPostText);
        formData.append('nick_name', nick_name)
    
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
          navigation.goBack();

        } else {
            Alert.alert('실패', `${data.message}`);
        }
    } catch (error) {
      console.error('There was an error sending data', error);
      Alert.alert('Error', 'Something went wrong!');
    }
  };
  
  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={{ aspectRatio: 1}}>
          {Array.isArray(newPostImage) && newPostImage.length > 0 ? (
            <>
              <ScrollView
                horizontal={true}
                pagingEnabled={true}
                showsHorizontalScrollIndicator={false}
                onScroll={handleScroll}
                scrollEventThrottle={16}
              >
                {newPostImage.map((uri, index) => (
                  <Image key={index} source={{ uri }} style={{ aspectRatio: 1 }} />
                ))}
              </ScrollView>

              <TouchableOpacity 
                style={{
                  position: 'absolute',
                  top: 5, 
                  right: 5,
                  backgroundColor: 'rgba(0,0,0,0.5)',
                  borderRadius: 15,
                  width: 30,
                  height: 30,
                  justifyContent: 'center',
                  alignItems: 'center'
                }} 
                onPress={() => {
                  setNewPostImage([]);
                }}
              >
                <Text style={{color: 'white', fontWeight: 'bold'}}>X</Text>
              </TouchableOpacity>
            </>
          ) : (
            <View style={{ flex: 1, backgroundColor: '#E0E0E0', justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: '#9E9E9E' }}>소중한 순간을 공유해봐요!</Text>
            </View>
          )}
        </View>
        <TextInput
          style={{fontFamily: 'Pretendard-Regular', fontSize: 14, marginHorizontal:'4%', height:150}}
          placeholder="글을 작성해주세요"
          multiline
          numberOfLines={4}
          onChangeText={(text) => setNewPostText(text)}
          value={newPostText}
        />
        <Text style={[styles.itemName,{margin:'5%', color:'GREY'}]}>
         포도는 누구나 기분 좋게 참여할 수 있는 커뮤니티를 만들기 위해 커뮤니티 이용규칙을 제정하여 운영하고 있습니다. 위반 시 게시물이 삭제되고 서비스 이용이 일정 기간 제한될 수 있습니다.{'\n'}{'\n'}
          아래는 이 게시판에 해당하는 핵심 내용에 대한 요약 사항이며, 게시물 작성 전 커뮤니티 이용규칙 전문을 반드시 확인하시기 바랍니다.{'\n'}{'\n'}
          ※정치·사회 관련 행위 금지{'\n'}
          - 국가기관, 정치 관련 단체, 언론, 시민단체에 대한 언급 혹은 이와 관련한 행위{'\n'}
          
          
          - 정책·외교 또는 정치·정파에 대한 의견, 주장 및 이념, 가치관을 드러내는 행위{'\n'}
          - 성별, 종교, 인종, 출신, 지역, 직업, 이념 등 사회적 이슈에 대한 언급 혹은 이와 관련한 행위{'\n'}
          - 위와 같은 내용으로 유추될 수 있는 비유, 은어 사용 행위{'\n'}{'\n'}
          ※홍보 및 판매 관련 행위 금지{'\n'}
          - 영리 여부와 관계 없이 사업체·기관·단체·개인에게 직간접적으로 영향을 줄 수 있는 게시물 작성 행위{'\n'}
          - 위와 관련된 것으로 의심되거나 예상될 수 있는 바이럴 홍보 및 명칭·단어 언급 행위{'\n'}{'\n'}
          ※불법촬영물 유통 금지{'\n'}
          불법촬영물등을 게재할 경우 전기통신사업법에 따라 삭제 조치 및 서비스 이용이 영구적으로 제한될 수 있으며 관련 법률에 따라 처벌받을 수 있습니다.{'\n'}{'\n'}
          ※그 밖의 규칙 위반{'\n'}
          - 타인의 권리를 침해하거나 불쾌감을 주는 행위{'\n'}
          - 범죄, 불법 행위 등 법령을 위반하는 행위{'\n'}
          - 욕설, 비하, 차별, 혐오, 자살, 폭력 관련 내용을 포함한 게시물 작성 행위{'\n'}
          - 음란물, 성적 수치심을 유발하는 행위{'\n'}
          - 스포일러, 공포, 속임, 놀라게 하는 행위{'\n'}
        </Text> 
      </ScrollView>
      <TouchableOpacity 
        style={styles.button}
        onPress={handleSubmit}
      >
        <Text style={styles.buttonText}>
            작성하기
        </Text>
      </TouchableOpacity> 
    </View>
  );
};

export default WriteCommunityScreen;
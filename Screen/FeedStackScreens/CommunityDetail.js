import React from 'react';
import { View, Text, Image } from 'react-native';

const CommunityDetail = ({ route }) => {
  const { email, text, createdAt, imageUrl } = route.params;

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text>Email: {email}</Text>
      <Text>Text: {text}</Text>
      <Text>Created At: {createdAt}</Text>
      {Array.isArray(imageUrl) && imageUrl.map((uri, index) => (
        <Image key={index} source={{ uri }} style={{ width: 100, height: 100 }} />
      ))}
    </View>
  );
};

export default CommunityDetail;
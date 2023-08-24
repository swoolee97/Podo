import React from 'react';
import { SafeAreaView, View, Text, FlatList } from 'react-native';

const AnswerListScreen = ({ route }) => {
  const { answers } = route.params;

  // Type checking for answers
  if (!Array.isArray(answers)) {
    return (
      <SafeAreaView>
        <Text>Error: answers must be an array!</Text>
      </SafeAreaView>
    );
  }

  // Handle empty array
  if (answers.length === 0) {
    return (
      <SafeAreaView>
        <Text>No answers yet!</Text>
      </SafeAreaView>
    );
  }

  const renderItem = ({ item, index }) => {
    return (
      <View>
        <Text>{`${index + 1}. ${item}`}</Text>
      </View>
    );
  };

  return (
    <SafeAreaView>
      <Text>지금까지의 답변이에요</Text>
      <FlatList
        data={answers}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
      />
    </SafeAreaView>
  );
};

export default AnswerListScreen;

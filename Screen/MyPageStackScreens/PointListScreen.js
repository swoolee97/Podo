import React, { useEffect, useState } from 'react';
import { SafeAreaView, Text, View, FlatList, TouchableOpacity, RefreshControl } from 'react-native';
import PreURL from '../../PreURL/PreURL';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet } from 'react-native';

const PointListScreen = () => {
  const [email, setEmail] = useState(null);
  const [points, setPoints] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchEmail = async () => {
    const storedEmail = await AsyncStorage.getItem('user_email');
    setEmail(storedEmail);
  };
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
  
    return `${year}-${month}-${day}`;
  };
  useEffect(() => {
    fetchEmail();
  }, []);

  const fetchPointList = async () => {
    if (email && hasMore) {
      const response = await fetch(`${PreURL.preURL}/api/point/list?email=${email}&page=${page}`);
      const data = await response.json();

      if (data.points.length > 0) {
        if (page === 1) {
          setPoints(data.points);
        } else {
          setPoints([...points, ...data.points]);
        }
        setPage(page + 1);
      } else {
        setHasMore(false);
      }
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setPage(1);
    setHasMore(true);
    await fetchPointList();
    setRefreshing(false);
  };

  useEffect(() => {
    if (email) {
      fetchPointList();
    }
  }, [email]);

  return (
    <View>
        <Text>
            포인트 적립 리스트
        </Text>
      <FlatList
        data={points}
        // numColumns={1}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => {
            
          }}>
            <View style={styles.listItem}>
            <Text>{formatDate(item.createdAt)}</Text>
              <Text>{item.from}</Text>
              <Text>{item.price}</Text>
            </View>
          </TouchableOpacity>
        )}
        onEndReached={fetchPointList}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh} 
          />
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  listItem: {
    flex: 1,
    margin: 5,
    alignItems: 'center',
    justifyContent: 'center',
  }
});

export default PointListScreen;

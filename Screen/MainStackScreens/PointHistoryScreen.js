import { SafeAreaView, View, Text, FlatList, ActivityIndicator, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";


const PointHistory = ({route}) => {
    const [points, setPoints] = useState([]); // 포인트 내역을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지
    const [page, setPage] = useState(1); // 현재 페이지

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    };

    useEffect(() => {
        const email = route.params;
        const fetchPoints = async () => {
            try {
                const response = await fetch(PreURL.preURL + `/api/point/list?email=${email}&page=${page}`);
                const data = await response.json();
                // 중복된 아이템 제거
                const uniquePoints = data.points.filter(
                    point => !points.find(existingPoint => existingPoint._id === point._id)
                );
                setPoints(prevPoints => [...prevPoints, ...uniquePoints]);
                setHasMore(data.hasMore);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching points:", error);
                setLoading(false);
            }
        };
        fetchPoints();
    }, [page]);

    return (
        <SafeAreaView style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={points}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.card}>
                            <Text style={styles.pointText}>포인트: {item.price}</Text>
                            <Text style={styles.dateText}>날짜: {formatDate(item.createdAt)}</Text>
                        </View>
                    )}
                    onEndReached={() => {
                        if (hasMore) setPage(prevPage => prevPage + 1);
                    }}
                    onEndReachedThreshold={0.5}
                />
            )}
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    card: {
        backgroundColor: '#ffffff',
        margin: 10,
        borderRadius: 5,
        padding: 15,
        elevation: 3,  // Android
        shadowOffset: { width: 1, height: 1 },  // iOS 
        shadowColor: "#333",
        shadowOpacity: 0.3,
        shadowRadius: 2
    },
    pointText: {
        fontSize: 18,
        fontWeight: 'bold'
    },
    dateText: {
        fontSize: 16,
        color: '#777',
        marginTop: 10
    }
});

export default PointHistory;

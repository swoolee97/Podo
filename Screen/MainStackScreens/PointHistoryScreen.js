import { SafeAreaView, View, Text, FlatList, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import PreURL from "../../PreURL/PreURL";


const PointHistory = ({userEmail}) => {
    const [points, setPoints] = useState([]); // 포인트 내역을 저장할 상태
    const [loading, setLoading] = useState(true); // 로딩 상태
    const [hasMore, setHasMore] = useState(true); // 더 로드할 데이터가 있는지
    const [page, setPage] = useState(1); // 현재 페이지

    useEffect(() => {
        const fetchPoints = async () => {
            try {
                const response = await fetch(`${PreURL.preURL}/api/point/list?email=${userEmail}&page=${page}`);
                const responseText = await response.text();
                const data = JSON.parse(responseText);
                
                setPoints(prevPoints => [...prevPoints, ...data.points]);
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
        <SafeAreaView>
            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <FlatList
                    data={points}
                    keyExtractor={(item) => item._id.toString()}
                    renderItem={({ item }) => (
                        <View>
                            <Text>포인트: {item.price}</Text>
                            <Text>날짜: {item.createdAt}</Text>
                            {/* 여기서 필요한 다른 정보도 추가하여 표시하실 수 있습니다 */}
                        </View>
                    )}
                    onEndReached={() => {
                        if (hasMore) setPage(prevPage => prevPage + 1); // 다음 페이지의 데이터를 로드
                    }}
                    onEndReachedThreshold={0.5} // 스크롤이 하단 50%에 도달하면 다음 페이지의 데이터를 로드
                />
            )}
        </SafeAreaView>
    );
};

export default PointHistory;

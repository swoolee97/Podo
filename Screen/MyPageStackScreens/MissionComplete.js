import React from "react";
import { View, Text, FlatList } from "react-native";
import { useMissions } from "../MissionStackScreens/MissionContents";

const MissionComplete = () => {
  const { missions, completedMissions } = useMissions();
  
  return (
    <View>
      <Text>미션 완료 리스트</Text>
      <FlatList
        data={completedMissions}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => {
          const mission = missions.find(m => m.id === item.missionId);
          return (
            <View>
              <Text>미션 제목: {mission?.title}</Text>
              <Text>미션 세부사항: {mission?.details}</Text>
              <Text>내 답변: {item.answer.join(', ')}</Text>
            </View>
          )
        }}
      />
    </View>
  );
}

export default MissionComplete;






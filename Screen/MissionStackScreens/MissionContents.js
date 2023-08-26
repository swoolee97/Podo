import React, { createContext, useState, useContext } from 'react';

export const MissionContext = createContext();

export const useMissions = () => {
  const context = useContext(MissionContext);
  if (!context) {
    throw new Error('useMissions must be used within a MissionProvider');
  }
  return context;
};

export const MissionProvider = ({ children }) => {
  const [missions, setMissions] = useState([
    {
      id: 1,
      title: '투두리스트 정하기',
      details: '오늘 해야 할 일을 정리해보세요.',
    },
    {
      id: 2,
      title: '나의 장점 3가지 작성해보기',
      details: '자신만의 장점을 정리해보세요',
    },
  ]);
  
  const [completedMissions, setCompletedMissions] = useState([]);

  return (
    <MissionContext.Provider value={{ missions, setMissions, completedMissions, setCompletedMissions }}>
      {children}
    </MissionContext.Provider>
  );
};

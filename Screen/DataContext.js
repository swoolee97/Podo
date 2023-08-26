import React, { createContext, useState } from 'react';

export const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [completedMissions, setCompletedMissions] = useState([]);

  return (
    <DataContext.Provider value={{ completedMissions, setCompletedMissions }}>
      {children}
    </DataContext.Provider>
  );
};

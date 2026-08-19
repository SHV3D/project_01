import React, { createContext, useContext } from 'react';
import { RootStore, rootStore } from './RootStore';

const StoreContext = createContext<RootStore>(rootStore);

export const StoreProvider: React.FC<{ store?: RootStore; children: React.ReactNode }> = ({
  store = rootStore,
  children
}) => {
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStore = (): RootStore => {
  const store = useContext(StoreContext);
  if (!store) {
    throw new Error('useStore must be used within a StoreProvider');
  }
  return store;
};

import { FC, PropsWithChildren, createContext, useContext } from 'react';

import RootStore from './RootStore';

export const rootStore = new RootStore();

const RootContext = createContext(rootStore);

export const useRootStore = () => {
  const context = useContext(RootContext);

  if (!context) {
    throw Error('RootStore must be used inside provider');
  }

  return context;
};

export const RootProvider: FC<PropsWithChildren> = ({ children }) => {
  return <RootContext.Provider value={rootStore}>{children}</RootContext.Provider>;
};

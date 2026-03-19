import { createContext, useContext } from 'react';

interface UserContextValue {
  username: string;
}

export const UserContext = createContext<UserContextValue>({ username: '' });

export const useUsername = (): string => {
  const { username } = useContext(UserContext);
  return username;
};

import { AsyncStorage } from 'react-native';

export const TOKEN_KEY = '@photos/token';

export const onSignIn = (token: string) => AsyncStorage.setItem(TOKEN_KEY, token);

export const onSignOut = () => AsyncStorage.removeItem(TOKEN_KEY);

export const getToken = async () => await AsyncStorage.getItem(TOKEN_KEY);

export const isSignedIn = async () => {
  const token = await AsyncStorage.getItem(TOKEN_KEY);
  return token !== null ? true : false;
};

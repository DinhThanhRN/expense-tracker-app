import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeAuthData = async (
  token: String,
  email: String,
  password: String,
) => {
  const data = {token, email, password};
  await AsyncStorage.setItem('auth', JSON.stringify(data));
};

export const getAuthData = async () => {
  const data = await AsyncStorage.getItem('auth');
  if (data) return JSON.parse(data);
};
export const removeAuthData = async () => {
  await AsyncStorage.removeItem('auth');
};

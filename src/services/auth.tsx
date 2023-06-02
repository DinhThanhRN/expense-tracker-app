import axios from 'axios';

import {BACKEND_URL} from '../utils/backend_url';
import Credential from '../interfaces/Credential';
import Registration from '../interfaces/Registration';
import {getFCMToken} from './notifications/configureNotification';

export const login = async (credential: Credential) => {
  const deviceToken = await getFCMToken();
  const {data: response} = await axios.post(`${BACKEND_URL}/users/login`, {
    ...credential,
    deviceToken,
  });
  return {
    data: response.data.user,
    token: response.token,
    id: response.data.user._id,
  };
};
export const logout = async (id: String) => {
  const deviceToken = await getFCMToken();
  await axios.post(`${BACKEND_URL}/users/logout/${id}`, {deviceToken});
};

export const signup = async (registration: Registration) => {
  const {data: response} = await axios.post(
    `${BACKEND_URL}/users/signup`,
    registration,
  );
  return {
    id: response.data.user._id,
    token: response.token,
    data: response.data.user,
  };
};

export const forgotPassword = async (email: String) => {
  const {data: response} = await axios.post(
    `${BACKEND_URL}/users/forgotPassword`,
    {email},
  );
  return response;
};

export const resetPassword = async (
  resetToken: string,
  password: String,
  passwordConfirm: String,
) => {
  const {data: response} = await axios.patch(
    `${BACKEND_URL}/users/resetPassword/${resetToken}`,
    {password, passwordConfirm},
  );
  console.log(response);
  return response.data;
};
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

import axios from 'axios';

import {BACKEND_URL} from '../utils/backend_url';
import Credential from '../interfaces/Credential';
import Registration from '../interfaces/Registration';

export const login = async (credential: Credential) => {
  const {data: response} = await axios.post(
    `${BACKEND_URL}/users/login`,
    credential,
  );
  return {
    data: response.data.user,
    token: response.token,
    id: response.data.user._id,
  };
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

import axios from 'axios';
import {BACKEND_URL} from '../../backend_url';

export const updateAccount = async (token: String, data: any) => {
  const {data: response} = await axios.patch(
    `${BACKEND_URL}/users/updateMe`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.user;
};

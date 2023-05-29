import axios from 'axios';
import {BACKEND_URL} from '../../backend_url';

export const getSpendingStatistic = async (
  userID: String,
  token: String,
  queryString: string = '',
) => {
  const response = await axios.get(
    `${BACKEND_URL}/spendings/getStatistic/${userID}?sort=year,month&${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.spendings;
};

import axios from 'axios';
import {BACKEND_URL} from '../backend_url';

export const getAllCategories = async (token: String) => {
  const {data: response} = await axios.get(`${BACKEND_URL}/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data.category;
};

export const getOwnExpenses = async (
  userID: String,
  token: String,
  queryString: String = '',
) => {
  const {data: response} = await axios.get(
    `${BACKEND_URL}/expenses/${userID}?sort=paidAt&${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.expense;
};

export const getExpensesByCategory = async (
  userID: String,
  token: String,
  category: String,
  queryString: String = '',
) => {
  const {data: response} = await axios.get(
    `${BACKEND_URL}/expenses/${userID}?category=${category}&sort=paidAt&${queryString}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return response.data.expense;
};

export const statisticExpense = async (userID: String, token: String) => {
  const {data: response} = await axios.get(
    `${BACKEND_URL}/expenses/stastitic/${userID}/`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.result;
};

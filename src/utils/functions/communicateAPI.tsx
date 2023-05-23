import axios from 'axios';
import {BACKEND_URL} from '../backend_url';
import Expense from '../../interfaces/Expense';

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
    `${BACKEND_URL}/expenses/${userID}?${queryString}`,
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
    `${BACKEND_URL}/expenses/${userID}?category=${category}&${queryString}`,
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

export const createNewExpense = async (
  userID: String,
  token: String,
  data: Expense,
) => {
  const {data: response} = await axios.post(
    `${BACKEND_URL}/expenses/${userID}`,
    {...data, userID},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  return response.data.expense;
};
export const editExpense = async (id: String, token: String, data: Expense) => {
  const {data: response} = await axios.patch(
    `${BACKEND_URL}/expenses/${id}`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  console.log(response);
  return response.data.expense;
};
export const deleteExpense = async (id: String, token: String) => {
  await axios.delete(`${BACKEND_URL}/expenses/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

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

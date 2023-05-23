import {PayloadAction, createSlice} from '@reduxjs/toolkit';
import Expense from '../interfaces/Expense';
import {PayloadID} from '../types/PayloadID';

interface ExpensesState {
  expenses: [Expense | any];
}

const initialExpenses: ExpensesState = {
  expenses: [undefined],
};

const expensesSlice = createSlice({
  name: 'expenses',
  initialState: initialExpenses,
  reducers: {
    setExpenses: (state, action: PayloadAction<[Expense]>) => {
      state.expenses = action.payload;
    },
    addExpense: (state, action: PayloadAction<Expense>) => {
      state.expenses.push(action.payload);
    },
    updateExpense: (state, action: PayloadAction<Expense>) => {
      const index = state.expenses.findIndex(
        item => item?._id === action.payload._id,
      );
      state.expenses[index] = action.payload;
    },
    removeExpense: (state, action: PayloadAction<PayloadID>) => {
      const index = state.expenses.findIndex(
        item => item?._id === action.payload.id,
      );
      state.expenses.splice(index, 1);
    },
    deleteExpenses: state => {
      state.expenses = [undefined];
    },
  },
});

export default expensesSlice.reducer;
export const {
  setExpenses,
  addExpense,
  updateExpense,
  removeExpense,
  deleteExpenses,
} = expensesSlice.actions;
export type {ExpensesState};

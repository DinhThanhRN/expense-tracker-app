import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import User from '../interfaces/User';

interface UserState {
  user: User;
}

const initialUser: UserState = {
  user: {
    id: '',
    token: '',
    name: '',
    email: '',
    avatar: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState: initialUser,
  reducers: {
    setUser: (state, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    updateUser: (state, action: PayloadAction<User>) => {
      state.user = {...state.user, ...action.payload};
    },
    removeUser: state => {
      state.user = initialUser.user;
    },
  },
});

export default userSlice.reducer;
export const {setUser, removeUser, updateUser} = userSlice.actions;
export type {UserState};

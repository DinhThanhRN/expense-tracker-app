import {configureStore} from '@reduxjs/toolkit';

import user from './user';
import expense from './expense';

export const store = configureStore({
  reducer: {
    user,
    expense,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

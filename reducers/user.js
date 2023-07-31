import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: null,
    firstName: '',
    username: '',
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, firstName, username } = action.payload;
      state.value = { token, firstName, username };
    },
    logout: (state) => {
      state.value = { token: null, firstName: '', username: '' };
    },
  },
});

export const { login, logout } = userSlice.actions;
export default userSlice.reducer;

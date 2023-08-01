import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: '', email: null, birthday: null },
  };
  
  export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      login: (state, action) => {
        state.value.token = action.payload.token;
        state.value.email = action.payload.email;
        state.value.birthday = action.payload.birthday;
      },
      logout: (state) => {
        state.value.token = '';
        state.value.email = null;
        state.value.birthday = null;
   
      },
    },
  });
  
  export const { login, logout } = userSlice.actions;
  export default userSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: { name: null, wantedNotice: [] },
};

export const userSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    searchNotice: (state, action) => {
      state.value.name = action.payload;
    },
    addNotice: (state, action) => {
      state.value.wantedNotice.push(action.payload);
    },
    removeNotice: (state, action) => {
      state.value.wantedNotice = state.value.wantedNotice.filter(
        (e) => e.name !== action.payload
      );
    },
    importNotice: (state, action) => {
      state.value = { ...state.value, wantedNotice: action.payload };
    },
  },
});

export const {
  searchNotice,
  addNotice,
  removeNotice,
  importNotice,
} = userSlice.actions;
export default userSlice.reducer;

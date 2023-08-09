import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [],
};

export const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
      loadPosts: (state, action) => {
        console.log("je lance mon action", action.payload)
        state.value = action.payload;
      },
      addPost: (state, action) => {
        state.value.unshift(action.payload);
      },
      likePost: (state, action) => {
        const index = state.value.findIndex(post => post._id === action.payload.postId);
        const isLiked = state.value[index].likes.some(e => e.pseudo === action.payload.pseudo);
  
        if (isLiked) {
          state.value[index].likes = state.value[index].likes.filter(e => e.pseudo !== action.payload.pseudo);
        } else {
          state.value[index].likes.push({ pseudo: action.payload.pseudo });
        }
      },

      deletePost: (state, action) => {
        state.value = state.value.filter(post => post._id !== action.payload);
      }

    },
  });
  
  export const { loadPosts, addPost, deletePost, likePost } = postSlice.actions;
  export default postSlice.reducer;
  
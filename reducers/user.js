import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: { token: '', email: null, birthday: null, nom: null, prenom: null, pseudo: null, adresse: null },
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
      profil: (state,action) => {
        state.value.nom = action.payload.nom;
        state.value.prenom = action.payload.prenom;
        state.value.pseudo = action.payload.pseudo;
        state.value.adresse = action.payload.adresse;
      }
    },
  });
  
  export const { login, logout, profil } = userSlice.actions;
  export default userSlice.reducer;

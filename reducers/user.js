import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: '',
    email: null,
    birthday: null,
    nom: null,
    prenom: null,
    pseudo: null,
    adresse: null,
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, email, birthday, nom, prenom, pseudo, adresse } = action.payload;
      state.value.token = token;
      state.value.email = email;
      state.value.birthday = birthday;
      state.value.nom = nom;
      state.value.prenom = prenom;
      state.value.pseudo = pseudo;
      state.value.adresse = adresse;
    },
    logout: (state) => {
      state.value.token = '';
      state.value.email = null;
      state.value.birthday = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.pseudo = null;
      state.value.adresse = null;
    },
  },
});

export const { login, logout, profil } = userSlice.actions;
export default userSlice.reducer;

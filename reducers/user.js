import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: '',
    email: null,
    nom: null,
    prenom: null,
    pseudo: null,
    adresse: null,
    longitude: null,
    latitude:null,
    animal: [],
    wantedNotice: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, email, nom, prenom, pseudo, adresse, animal, wantedNotice,longitude,latitude } = action.payload; 
      state.value.token = token;
      state.value.email = email;
      state.value.nom = nom;
      state.value.prenom = prenom;
      state.value.pseudo = pseudo;
      state.value.latitude=latitude;
      state.value.longitude=longitude;
      state.value.adresse = adresse;
      state.value.animal = animal || [];
      state.value.wantedNotice = wantedNotice || []; 
    },
    logout: (state) => {
      state.value.token = '';
      state.value.email = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.pseudo = null;
      state.value.adresse = null;
      state.value.animal = [];
      state.value.wantedNotice = []; 
    },
    addAnimal: (state, action) => {
      state.value.animal.push(action.payload.animal);
      
    },
  },
});

export const { login, logout, addAnimal } = userSlice.actions;
export default userSlice.reducer;

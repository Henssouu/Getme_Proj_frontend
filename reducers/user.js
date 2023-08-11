import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: {
    token: '',
    email: null,
    nom: null,
    prenom: null,
    pseudo: null,
    adresse: null,
    photo: null,
    longitude: null,
    latitude:null,
    animal: [],
    animalPhoto: null,
    wantedNoticePhoto: null,
    wantedNotice: [],
  },
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      const { token, email, nom, prenom, pseudo, adresse,photo,  animal, wantedNotice,longitude,latitude, wantedNoticePhoto } = action.payload; 
      state.value.token = token;
      state.value.email = email;
      state.value.nom = nom;
      state.value.prenom = prenom;
      state.value.pseudo = pseudo;
      state.value.latitude=latitude;
      state.value.longitude=longitude;
      state.value.adresse = adresse;
      state.value.photo = photo;
      state.value.animal = animal;
      state.value.wantedNotice = wantedNotice; 
      state.value.wantedNoticePhoto = wantedNoticePhoto;
    },
    logout: (state) => {
      state.value.token = '';
      state.value.email = null;
      state.value.nom = null;
      state.value.prenom = null;
      state.value.pseudo = null;
      state.value.adresse = null;
      state.value.photo = null;
      state.value.animal = [];
      state.value.wantedNotice = []; 
      state.value.wantedNoticePhoto = null;
    },
    addAnimal: (state, action) => {
      state.value.animal.push(action.payload.animal);
      
    },
  addPhoto: (state, action) => {
    state.value.photo = action.payload.photo;
  },
  addAnimalPhoto: (state, action) => {
    state.value.animalPhoto = action.payload.animalPhoto
  },
  addWantedNoticePhoto: (state, action) => {
     state.value.wantedNoticePhoto = action.payload.wantedNoticePhoto
  },
  addNewMessages: (state, action) => {
    state.value.messages = action.payload.messages
  }
}
});

export const { login, logout, addAnimal, addPhoto, addAnimalPhoto } = userSlice.actions;
export default userSlice.reducer;

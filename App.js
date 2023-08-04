import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import HomeScreen from './screens/HomeScreen';
import ProfilUserScreen from './screens/ProfilUserScreen';
import SignInScreen from './screens/SignInScreen';
import AnimalProfilScreen from './screens/AnimalProfilScreen';
import ProfilUserInfoScreen from './screens/ProfilUserInfoScreen';
// import ProfilUserAnimalScreen from './screens/ProfilUserAnimalScreen';
import ProfilScreen from './screens/ProfilScreen'
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user';

const store = configureStore({
  reducer: { user },
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function HomeStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
       <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfilUserScreen" component={ProfilUserScreen} options={{ headerShown: false }} />
       <Stack.Screen name="AnimalProfilScreen" component={AnimalProfilScreen} options={{ headerShown: false }} />
      <Stack.Screen name="ProfilUserInfoScreen" component={ProfilUserInfoScreen} options={{ headerShown: false }} /> 
    </Stack.Navigator>
  );
}

function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Home">
          <Drawer.Screen name="Acceuil" component={HomeStack} />
          <Drawer.Screen name="Profile" component={ProfilScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </Provider>
  );
}

export default App;


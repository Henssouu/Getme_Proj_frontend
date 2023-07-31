import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import ProfilUserScreen from './screens/ProfilUserScreen';
import AnimalProfilScreen from './screens/AnimalProfilScreen';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import user from './reducers/user'

const store = configureStore({
 reducer: {user},
});

const Stack = createStackNavigator();

const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilUserScreen" component={ProfilUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AnimalProfilScreen" component={AnimalProfilScreen} options={{  headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
    </Provider>
  );
};

export default App;

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import ProfilUserScreen from './screens/ProfilUserScreen';
import AnimalProfil from './screens/AnimalProfil';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
        <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilUserScreen" component={ProfilUserScreen} options={{ headerShown: false }} />
        <Stack.Screen name="AnimalProfil" component={AnimalProfil} options={{  headerShown: false}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

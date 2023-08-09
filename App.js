import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfilUserScreen from './screens/ProfilUserScreen';
import AnimalProfilScreen from './screens/AnimalProfilScreen';
import MessageScreen from './screens/MessageScreen';
import ProfilUserInfoScreen from './screens/ProfilUserInfoScreen';
import ProfilScreen from './screens/ProfilScreen'
import user from './reducers/user';
import post from './reducers/post';
import map from './reducers/map';


const store = configureStore({
  reducer: { user, post, map },
});

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();


const TabNavigator = () => {
  return (
          <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Accueil') {
          iconName = 'home';
        } else if (route.name === 'Carte') {
          iconName = 'map';
        } else if (route.name === 'Messages'){
          iconName = 'comment'
        }

        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#ec6e5b',
      tabBarInactiveTintColor: '#335561',
      headerShown: false,
    })}>
      <Tab.Screen name="Accueil" component={DrawerNavigator}  />
      <Tab.Screen name="Carte" component={MapScreen} />
      <Tab.Screen name='Messages' component={MessageScreen} />
    </Tab.Navigator>
  )
}


const DrawerNavigator = () => {
  return (
    <Drawer.Navigator>
    <Drawer.Screen name="Acceuil" component={HomeScreen} options={{ headerShown: false }}/>
    <Drawer.Screen name="Profile" component={ProfilScreen} options={{ headerShown: false }} />
  </Drawer.Navigator>
  )
}


const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="SignIn" component={SignInScreen} options={{ headerShown: false }} />
         <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilUserScreen" component={ProfilUserScreen} options={{ headerShown: false }} />
         <Stack.Screen name="AnimalProfilScreen" component={AnimalProfilScreen} options={{ headerShown: false }} />
        <Stack.Screen name="ProfilUserInfoScreen" component={ProfilUserInfoScreen} options={{ headerShown: false }} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} options={{ headerShown: false }} /> 
      </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};



export default App;

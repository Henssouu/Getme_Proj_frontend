import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEnvelope, faHouse, faMap } from '@fortawesome/free-solid-svg-icons';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import userReducer from './reducers/user';
import mapReducer from './reducers/map';

import SignInScreen from './screens/SignInScreen';
import HomeScreen from './screens/HomeScreen';
import MapScreen from './screens/MapScreen';
import ProfileScreen from './screens/ProfilScreen';
import InscriptionScreen from './screens/InscriptionScreen';
import ProfilUserScreen from './screens/ProfilUserScreen';
import AnimalProfilScreen from './screens/AnimalProfilScreen';
import MessageScreen from './screens/MessageScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

const rootReducer = combineReducers({
  user: userReducer,
  map: mapReducer,
});

const store = configureStore({
  reducer: rootReducer,
});

const HomeTabs = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Acceuil"
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} size={size} color={color} />
            ),
          }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMap} size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="Chat"
        component={MessageScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faEnvelope} size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="SignInScreen" component={SignInScreen} />
          <Stack.Screen name="HomeScreen" component={HomeDrawer} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="InscriptionScreen" component={InscriptionScreen} />
          <Stack.Screen name="ProfilUserScreen" component={ProfilUserScreen} />
          <Stack.Screen name="AnimalProfilScreen" component={AnimalProfilScreen} />
          <Stack.Screen name="MessageScreen" component={MessageScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

const HomeDrawer = () => {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Accueil" component={HomeTabs} 
      options={{ headerShown: false }}      
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
};

export default App;

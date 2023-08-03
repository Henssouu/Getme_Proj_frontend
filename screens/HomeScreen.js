import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMap, faEnvelope, faPaw, faRightFromBracket, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../reducers/user';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';

import ProfilUserInfoScreen from './ProfilUserInfoScreen';
import ProfilUserAnimalScreen from './ProfilUserAnimalScreen';
import MapScreen from './MapScreen'; // Add the MapScreen import here

const Tab = createBottomTabNavigator();

const ProfileScreen = ({ handleLogout }) => {
  const user = useSelector((state) => state.user.value);
  console.log(user);
  const dispatch = useDispatch();
  const navigation = useNavigation();

console.log("krypto", user)

  const pet = [];
    
  // for (let items of user.animal){
  //   return pet.push(items.nom)
  // }
  


  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <View style={styles.container}>
      {/* Profile user info */}
      <View style={styles.userInfoContainer}>
        <ProfilUserInfoScreen />
      </View>

      <View style={styles.userInfoContainer}>
        <ProfilUserAnimalScreen />
      </View>
      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesomeIcon icon={faRightFromBracket} size={24} color="black" />
        {pet}
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.plusButton}><FontAwesomeIcon icon={faCirclePlus} style={styles.faCirclePlus} />
      </View>
    </View>
  );
};

const HomeScreen = () => {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleLogout = () => {
    dispatch(logout());
    navigation.reset({
      index: 0,
      routes: [{ name: 'SignIn' }],
    });
  };

  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Profile"
        component={() => <ProfileScreen handleLogout={handleLogout} />}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faHouse} size={size} style={{ color }} />
          ),
        }}
      />
      <Tab.Screen
        name="Map"
        component={MapScreen}
        options={{
          tabBarIcon: ({ color, size }) => (
            <FontAwesomeIcon icon={faMap} size={size} style={{ color }} />
          ),
        }}
      />
      {/* Add other screens here */}
    </Tab.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    padding: 20,
    paddingBottom: '15%',
  },
  userInfoContainer: {
    position: 'absolute',
    top: 70,
    right: '34.5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    color: 'black',
  },
  logoutButton: {
    position: 'absolute',
    top: 20,
    right: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 30,
  },
  logoutButtonText: {
    fontSize: 18,
    marginLeft: 10,
  },
  plusButton: {
    textAlign:'start',
    justifyContent: 'start',
  }, 
  faCirclePlus: {
    color: "#469eb4",
  },
});

export default HomeScreen;

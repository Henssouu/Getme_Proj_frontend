import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMap, faEnvelope, faPaw, faPlus, faRightFromBracket, faCirclePlus } from '@fortawesome/free-solid-svg-icons';
import ProfilUserInfoScreen from './ProfilUserInfoScreen';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../reducers/user';

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
    <View style={styles.container}>
      {/* Profile user info */}
      <View style={styles.userInfoContainer}>
        <ProfilUserInfoScreen />
      </View>

      {/* Logout Button */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesomeIcon icon={faRightFromBracket} size={24} color="black" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>

      <View style={styles.plusButton}><FontAwesomeIcon icon={faCirclePlus} style={styles.faCirclePlus} /></View>

      
      <View style={styles.bottomBar}>
        {/* <FontAwesomeIcon icon={faHouse} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faMap} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faEnvelope} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faPaw} size={25} style={styles.icon} /> */}
        
      </View>
      
    </View>
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
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 122, 255, 0.4)',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
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

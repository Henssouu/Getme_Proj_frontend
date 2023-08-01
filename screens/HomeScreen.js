import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHouse, faMap, faEnvelope, faPaw, faPlus, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import ProfilUserInfoScreen from './ProfilUserInfoScreen';

const HomeScreen = () => {

  const handleLogout = () => {
    // logout mécanique
  }

  return (
    <View style={styles.container}>
      {/* <View style={styles.header}>
        <Text style={styles.espaceProfil}> container </Text>
      </View> */}

      <Text style={styles.title}>La communauté vous souhaite la bienvenue</Text>
      {<ProfilUserInfoScreen/>}
      
      {/* Icones du bas */}
      <View style={styles.bottomBar}>
        <FontAwesomeIcon icon={faHouse} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faMap} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faEnvelope} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faPaw} size={25} style={styles.icon} />
        <FontAwesomeIcon icon={faPlus} size={25} style={styles.icon} />
      </View>

      {/* Logout Btn */}
      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesomeIcon icon={faRightFromBracket} size={24} color="black" />
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  espaceProfil: {
    // height: "60%",
    // width: "100%",
  },
  header: {
    // flex: 1,
    // marginTop: 20,
    // width: "90%",
    // height: "60%",
    // borderColor: "#ccc",
    // borderWidth: 1,
    // borderRadius: 5,

  }
});

export default HomeScreen;

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image, ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const userData = useSelector((state) => state.user.value);



  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userDataContainer}>
          <View style={styles.tailleImage}>
          <Image style={styles.images} source={{uri: userData.photo}} ></Image>
          </View>
          <Text style={styles.userName}>{userData.nom} {userData.prenom}</Text>
          <Text style={styles.userPseudo}>@{userData.pseudo}</Text>
          <Text style={styles.userAddress}>{userData.adresse}</Text>
          {/* Display other information if needed */}
        </View>
      ) : (
        <ActivityIndicator size="large" color="blue" />
      )}
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
  userDataContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingLeft: '10%',
    paddingRight: '10%',
    paddingTop: '10%',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    minHeight: '100%',
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  userPseudo: {
    fontSize: 16,
    marginBottom: 5,
  },
  userAddress: {
    fontSize: 16,
    marginTop: '15%',
  },
  images: {
    width: 145,
    height: 150,
    borderRadius: 50,
    marginBottom: '15%',
  },
  userPseudo: {
    color: 'rgb(114, 131, 148)',
  },

});

export default ProfilUserInfoScreen;

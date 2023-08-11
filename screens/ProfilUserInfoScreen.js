import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, Image,  ImageBackground } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const userData = useSelector((state) => state.user.value);



  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userDataContainer}>
           <Text style={styles.profilText}>Votre profil</Text>
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
    minHeight: '93%',
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
    width: 200,
    height: 200,
    borderRadius: 100,
    marginBottom: 15,
  },
  userPseudo: {
    color: "rgba(0, 0, 0, 0.6)",
    fontWeight: 'bold',
  },
  profilText: {
    marginBottom: 20,
    fontSize: 25,
    fontWeight: 'bold',

  }

});

export default ProfilUserInfoScreen;

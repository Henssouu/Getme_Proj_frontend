import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const userData = useSelector((state) => state.user.value);

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userDataContainer}>
          <Text style={styles.userName}>
            User Name: {userData.nom} {userData.prenom}
          </Text>
          <Text style={styles.userPseudo}>Pseudo: {userData.pseudo}</Text>
          <Text style={styles.userAddress}>Adresse: {userData.adresse}</Text>
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
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  userPseudo: {
    fontSize: 16,
    marginBottom: 5,
  },
  userAddress: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfilUserInfoScreen;

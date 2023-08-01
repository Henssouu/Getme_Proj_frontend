import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const user = useSelector((state) => state.user);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (user) {
      fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [user]);

  return (
    <View style={styles.container}>
      {userData ? (
        <View style={styles.userDataContainer}>
          <Text style={styles.userName}>
            User Name: {userData.nom} {userData.prenom}
          </Text>
          <Text style={styles.userPseudo}>Pseudo: {userData.pseudo}</Text>
          <Text style={styles.userAddress}>Adresse: {userData.adresse}</Text>
          {/* Affiche d'autre informations si besoin */}
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

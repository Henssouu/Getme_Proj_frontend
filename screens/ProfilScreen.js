import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilScreen = () => {
  const user = useSelector((state) => state.user.value);
  const animal = user?.animal?.[0]; //chaining operator

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
          <View style={styles.userDataContainer}>
            <Text style={styles.userName}>{user.nom} {user.prenom}</Text>
            <Text style={styles.userPseudo}>{user.pseudo}</Text>
            <Text style={styles.userAddress}>{user.adresse}</Text>
          </View>
          {animal ? (
            <View style={styles.animalDataContainer}>
              <Text style={styles.animalName}>{animal.nom}</Text>
              <Text style={styles.animalType}>Type: {animal.type}</Text>
              <Text style={styles.animalInfo}>Taille: {animal.taille}</Text>
              <Text style={styles.animalInfo}>Couleur: {animal.couleur}</Text>
              <Text style={styles.animalInfo}>Poil: {animal.poil}</Text>
              <Text style={styles.animalInfo}>Sexe: {animal.sexe}</Text>
              <Text style={styles.animalInfo}>Castré: {animal.castré}</Text>
              <Text style={styles.animalInfo}>Tatouage: {animal.tatouage}</Text>
              <Text style={styles.animalInfo}>Puce: {animal.puce}</Text>
              <Text style={styles.animalInfo}>Description: {animal.description}</Text>
            </View>
          ) : (
            <ActivityIndicator size="large" color="blue" />
          )}
        </ScrollView>
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
    padding: 27,
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
    marginBottom: 20,
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
  animalDataContainer: {
    backgroundColor: '#f9f9f9',
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
  },
  animalName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  animalType: {
    fontSize: 16,
    marginBottom: 5,
  },
  animalInfo: {
    fontSize: 16,
    marginBottom: 5,
  },
});

export default ProfilScreen;

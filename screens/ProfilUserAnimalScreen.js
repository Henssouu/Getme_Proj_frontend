import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserAnimalScreen = () => {
  const user = useSelector((state) => state.user.value);
  const animal = user?.animal?.[0]; //chaining operator
 
  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
        <View style={styles.userDataContainer}>
        <Text style={styles.userName}>{animal?.nom}</Text>
            <Text style={styles.userPseudo}>Type: {animal?.type}</Text>
            <Text style={styles.userAddress}>Taille: {animal?.taille}</Text>
            <Text style={styles.userAddress}>Couleur: {animal?.couleur}</Text>
            <Text style={styles.userAddress}>Poil: {animal?.poil}</Text>
            <Text style={styles.userAddress}>Sexe: {animal?.sexe}</Text>
            <Text style={styles.userAddress}>Castré: {animal?.castré}</Text>
            <Text style={styles.userAddress}>Tatouage: {animal?.tatouage}</Text>
            <Text style={styles.userAddress}>Puce: {animal?.puce}</Text>
            <Text style={styles.userAddress}>Description: {animal?.description}</Text>
          {/* affiche d'autre information si besoin */}
        </View>
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
    minHeight: 300,
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

export default ProfilUserAnimalScreen;

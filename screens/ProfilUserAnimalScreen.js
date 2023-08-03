import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const user = useSelector((state) => state.user.value);

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
        <View style={styles.userDataContainer}>
          <Text style={styles.userName}>
            {user.animal[0].nom}
          </Text>
          <Text style={styles.userPseudo}>Type: {user.animal[0].type}</Text>
          <Text style={styles.userAddress}>Taille: {user.animal[0].taille}</Text>
          <Text style={styles.userAddress}>Couleur: {user.animal[0].couleur}</Text>
          <Text style={styles.userAddress}>Poil: {user.animal[0].poil}</Text>
          <Text style={styles.userAddress}>Sexe: {user.animal[0].sexe}</Text>
          <Text style={styles.userAddress}>Castré: {user.animal[0].castré}</Text>
          <Text style={styles.userAddress}>Tatouage: {user.animal[0].tatouage}</Text>
          <Text style={styles.userAddress}>Puce: {user.animal[0].puce}</Text>
          <Text style={styles.userAddress}>Description: {user.animal[0].description}</Text>
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

export default ProfilUserInfoScreen;

import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserAnimalScreen = (props) => {

 

  const user = useSelector((state) => state.user.value);


 
  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
        <View style={styles.userDataContainer}>
        <Text style={styles.userName}>{props.nom}</Text>
            <Text style={styles.userPseudo}>Type: {props.type}</Text>
            <Text style={styles.userAddress}>Taille: {props.taille}</Text>
            <Text style={styles.userAddress}>Couleur: {props.couleur}</Text>
            <Text style={styles.userAddress}>Poil: {props.poil}</Text>
            <Text style={styles.userAddress}>Sexe: {props.sexe}</Text>
            <Text style={styles.userAddress}>Castré: {props.castré}</Text>
            <Text style={styles.userAddress}>Tatouage: {props.tatouage}</Text>
            <Text style={styles.userAddress}>Puce: {props.puce}</Text>
            <Text style={styles.userAddress}>Description: {props.description}</Text>
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

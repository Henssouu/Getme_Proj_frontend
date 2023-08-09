import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView } from 'react-native';
import { useSelector } from 'react-redux';
import ProfilUserAnimalScreen from './ProfilUserAnimalScreen';
import ProfilUserInfoScreen from './ProfilUserInfoScreen';

const ProfilScreen = () => {
  const user = useSelector((state) => state.user.value);

  const animal = user.animal.map((data, i) => {
    return <ProfilUserAnimalScreen {...data} key={i} />;
  })
  

  return (
    <View style={styles.container}>
      {user ? (
        <ScrollView>
          <View style={styles.userDataContainer}>
          <ProfilUserInfoScreen />
          </View>
          {animal ? (
            <View style={styles.animalDataContainer}>
            {animal}
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
    
    paddingTop: '15%',
    paddingLeft: '15%',
    paddingRight: '15%',
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
    
    padding: 20,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    minHeight: '100%',
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
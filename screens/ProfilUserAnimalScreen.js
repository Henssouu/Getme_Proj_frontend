import React from 'react';
import { View, Text, StyleSheet, ActivityIndicator, ScrollView, Image, KeyboardAvoidingView } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserAnimalScreen = (props) => {

 

  const user = useSelector((state) => state.user.value);

  console.log('coucouWissem', props)

 
  return (
      <View style={styles.container}>
        {user ? (
          <ScrollView style={{flex:1}}>
            <View style={styles.animalDataContainer}>
            <Text style={styles.profilText}>Le profil de votre animal</Text>
              <View style={styles.position}>
                <Image style={styles.images} source={{ uri: props.animalPhoto }}></Image>
                <View style={styles.textPosition}>
                  <Text style={styles.userName}>{props.nom}</Text>
                  <Text style={styles.userPseudo}>{props.type}</Text>
                </View>
              </View>
              <Text style={styles.styleText}>Taille: {props.taille}</Text>
              <Text style={styles.styleText}>Couleur: {props.couleur}</Text>
              <Text style={styles.styleText}>Poil: {props.poil}</Text>
              <Text style={styles.styleText}>Sexe: {props.sexe}</Text>
              <Text style={styles.styleText}>Castré: {props.castré}</Text>
              <Text style={styles.styleText}>Tatouage: {props.tatouage}</Text>
              <Text style={styles.styleText}>Puce: {props.puce}</Text>
              <Text style={styles.styleText}>Description: {props.description}</Text>
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
  animalDataContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    paddingBottom: '15%',
    paddingTop: '5%',
    paddingRight: '5%',
    paddingLeft: '5%',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    width: '100%',
    backgroundColor: '#fed0a6',
   
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
  styleText: {
    fontSize: 16,
    marginBottom: 5,
  },
  images: {
  width: 100,
  height: 100,
  borderRadius: 50,
  },
  position: {
    flexDirection: 'row',
    marginBottom: 8,
    alignItems: 'center',
    justifyContent: 'flex-start',
    minHeight: '30%',
  },
  textPosition: {
    flexDirection: 'column',
    marginLeft: 15,

  },
  userPseudo: {
    fontWeight: 'bold',
  },
  profilText: {
    marginTop: 30,
   
    fontSize: 20,
    fontWeight: 'bold',

  }
});

export default ProfilUserAnimalScreen;

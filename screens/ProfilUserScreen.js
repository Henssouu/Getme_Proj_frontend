import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import  { profil } from "../reducers/user";


const ProfilUserScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasAnimal, setHasAnimal] = useState(false);
  const [nomUser, setNomUser] = useState('');
  const [prenomUser, setPrenomUser] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [adresse, setAdresse] = useState('');

  const user = useSelector((state) => state.user.value);
  //condition pour passer du screen "AnimalProfil" ou "HomeScreen"
  const switchToAnimal = () => {

    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nom: nomUser, prenom: prenomUser, pseudo: pseudo, adresse: adresse }),
		}).then(response => response.json())
			.then(data => {
        if (data.result) {
          dispatch(profil({nom: nomUser, prenom: prenomUser, pseudo: pseudo, adresse: adresse}));
          setNomUser('');
          setPrenomUser('');
          setPseudo('');
          setAdresse('');
         }

    if (hasAnimal) {
      navigation.navigate("AnimalProfilScreen");
    } else {
      navigation.navigate("HomeScreen");
    }
  })
}

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Compléter votre profil</Text>
      <View style={styles.inputContainer}>
        <View>{/*photo*/}</View>
        <View style={styles.inputBlock}>
          {/*photo*/}
          <TextInput style={styles.input}  onChangeText={(value) => setNomUser(value)} value={nomUser} placeholder="Nom" />
          <TextInput style={styles.input} onChangeText={(value) => setPrenomUser(value)} value={prenomUser} placeholder="Prénom :" />
          <TextInput style={styles.input} onChangeText={(value) => setPseudo(value)} value={pseudo} placeholder="Pseudo :" />
          <TextInput style={styles.input} onChangeText={(value) => setAdresse(value)} value={adresse} placeholder="Adresse" /> 
          <View style={styles.hasAnimalContainer}>
            <Text style={styles.hasAnimalText}>Avez-vous un animal ?</Text>

            {/* condition pour passer du screen "AnimalProfil" ou "HomeScreen" après un choix "oui" ou "non" */}

            <TouchableOpacity
              style={[
                styles.hasAnimalButton,
                hasAnimal ? styles.activeButton : null,
              ]}
              onPress={() => setHasAnimal(true)}
            >
              <Text>Oui</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[
                styles.hasAnimalButton,
                !hasAnimal ? styles.activeButton : null,
              ]}
              onPress={() => setHasAnimal(false)}
            >
              <Text>Non</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* selon le résultat de la condition, la navigation se fera au click */}
      
      <TouchableOpacity style={styles.button} onPress={switchToAnimal}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    minWidth: 500,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  inputContainer: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
  },
  inputBlock: {
    marginBottom: 20,
  },
  hasAnimalContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  hasAnimalText: {
    marginRight: 10,
  },
  hasAnimalButton: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    borderColor: "#ccc",
    borderWidth: 1,
  },
  activeButton: {
    backgroundColor: "lightblue",
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default ProfilUserScreen;






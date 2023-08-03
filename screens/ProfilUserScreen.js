import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import  { login } from "../reducers/user";


const ProfilUserScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasAnimal, setHasAnimal] = useState(false);
  const [nomUser, setNomUser] = useState('');
  const [prenomUser, setPrenomUser] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [adresse, setAdresse] = useState('');
  const [userProfilError, setUserProfilError] = useState(false);

  const user = useSelector((state) => state.user.value);
  const error = userProfilError && <Text style={styles.error}>Merci de renseigner tous les champs obligatoires *</Text> 
  //condition pour passer du screen "AnimalProfil" ou "HomeScreen"
  const switchToAnimal = () => {

    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ nom: nomUser, prenom: prenomUser, pseudo: pseudo, adresse: adresse }),
		}).then(response => response.json())
			.then(data => {
        if (data.result) {
          dispatch(login({token: user.token, email: user.email, birthday: user.birthday, nom: nomUser, prenom: prenomUser, pseudo: pseudo, adresse: adresse}));
          setNomUser('');
          setPrenomUser('');
          setPseudo('');
          setAdresse('');
         
          if (hasAnimal) {
            navigation.navigate("AnimalProfilScreen");
          } else {
            navigation.navigate("HomeScreen");
          }
        
        } else {
          setUserProfilError(true);
         }

  
  })
}

  return (
    <SafeAreaView       style={styles.container}>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Text style={styles.title}>Compléter votre profil</Text>
      <View style={styles.inputContainer}>
        <View>{/*photo*/}</View>
        <View style={styles.inputBlock}>
          {/*photo*/}
          <TextInput style={styles.input}  onChangeText={(value) => setNomUser(value)} value={nomUser}  placeholder="Nom:"/>
          <TextInput style={styles.input} onChangeText={(value) => setPrenomUser(value)} value={prenomUser} placeholder="Prénom :" />
          <TextInput style={styles.input} onChangeText={(value) => setPseudo(value)} value={pseudo} placeholder="Pseudo :" />
          <TextInput style={styles.input} onChangeText={(value) => setAdresse(value)} value={adresse} placeholder="Adresse :" /> 
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
      <View>{userProfilError && <Text style={styles.error}>Merci de renseigner tous les champs obligatoires *</Text> }</View>
      {/* selon le résultat de la condition, la navigation se fera au click */}
      <View style={styles.btncontainer}>
      <TouchableOpacity style={styles.button} onPress={switchToAnimal}>
        <Text style={styles.buttonText}>Suivant</Text>
      </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  content: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    marginTop: 10,
  },
  inputContainer: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 20,
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
    width: 150,
    height: 50,
  },
  btncontainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    marginTop: 5,
    marginBottom: 50,
    color: 'red',
  },
});

export default ProfilUserScreen;






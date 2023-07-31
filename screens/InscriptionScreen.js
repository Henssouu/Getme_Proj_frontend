import React from "react";
import { useNavigation } from '@react-navigation/native';
import {
  Image,
  ImageBackground,
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Modal,
} from "react-native";

const InscriptionScreen = () => {
  const navigation = useNavigation();

  //Gère la navigation vers un autre screen au click
  const handleProfil = () => {
    navigation.navigate('ProfilUserScreen');
  }


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Saisir vos informations</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Pseudo" />
        <TextInput style={styles.input} placeholder="Adresse email" />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <TextInput style={styles.input} placeholder="Date de naissance" />
      </View>
      {/* active la fonction handleProfil au click */}
      <TouchableOpacity style={styles.button} onPress={handleProfil}>
        <Text style={styles.buttonText}>S'enregistrer</Text>
        
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
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
    // borderColor: "#ccc",
    // borderWidth: 1,
    // borderRadius: 5,
    // paddingHorizontal: 10,
    // marginBottom: 20,
    // marginTop: 10,
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

export default InscriptionScreen;

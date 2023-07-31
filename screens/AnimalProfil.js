import React from "react";
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

const AnimalProfil = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Compléter votre profil</Text>
      <View style={styles.inputContainer}>
        <View>{/*photo*/}</View>
        <View style={styles.inpuntBlock}>
          <TextInput 
          style={styles.input} 
          placeholder="Type" 
          
          />
          {/*photo*/}
          <TextInput style={styles.input} placeholder="Nom :" />
          <TextInput style={styles.input} placeholder="Taille :" />
          <TextInput style={styles.input} placeholder="Date de naissance" />
          <TextInput style={styles.input} placeholder="couleur :" />
          <TextInput style={styles.input} placeholder="Poil :" />
          <TextInput style={styles.input} placeholder="Sex :" />
          <TextInput style={styles.input} placeholder="castré :" />
          <TextInput style={styles.input} placeholder="Tatouage :" />
          <TextInput style={styles.input} placeholder="Puce :" />
          <TextInput style={styles.input} placeholder="Description :" />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>S'enregistrer</Text>
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

export default AnimalProfil;

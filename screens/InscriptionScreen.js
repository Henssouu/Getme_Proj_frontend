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

const InscriptionScreen = () => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Saisir vos informations</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Nom d'utilisateur" />
        <TextInput style={styles.input} placeholder="Adresse email" />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
        />
        <TextInput style={styles.input} placeholder="Date de naissance" />
        <TextInput style={styles.input} placeholder="Adresse" />
        <TextInput style={styles.input} placeholder="Avez-vous un animal ?" />
      </View>
      <TouchableOpacity style={styles.button}>
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

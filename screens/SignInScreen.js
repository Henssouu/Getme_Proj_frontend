import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Modal,
  ImageBackground,
  Image
} from "react-native";
import InscriptionScreen from "../screens/InscriptionScreen";
import HomeScreen from "./HomeScreen";

const SignInScreen = () => {
  const navigation = useNavigation(); 
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [password, setPassword] = useState('');
//   const [email, setEmail] = useState('');

  const handleSignUp = () => {
    setSignUpModalVisible(true);
  };

  const handleSignUpClose = () => {
    setSignUpModalVisible(false);
  };

  const handleSignIn = () => {
    const validUsername = 'dazmo';
    const validEmail = 'dazmo@gmail.com';
    const validPassword = '123';

    if((userInput === validUsername || userInput === validEmail) && password === validPassword) {
        navigation.navigate('HomeScreen');
    } else {
        console.log('Invalid credentials');
    }
  }

  const colors = ["red", "yellow", "blue", "black"];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
        <View style={styles.headerTextWrapper}>
          <Text style={[styles.firstTitle, { color: randomColor }]}>GET ME</Text>
          <View style={styles.space} />
        <Text style={[styles.title, { color: randomColor, marginTop: 20 }]}>Connexion</Text>
        </View>
        </View>
        <TextInput
          style={styles.input}
          placeholder="Nom d'utilisateur ou email"
          placeholderTextColor="#FFF"
        //   récupère la value depuis le state
          value={userInput}
        //   met à jour l'état au changement de text  
          onChangeText={setUserInput}  
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          //   récupère la value depuis le state
          value={password}
        //   met à jour l'état au changement de text 
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Sign In</Text>
        </TouchableOpacity>

        {/* Sign Up Button */}
        <TouchableOpacity style={styles.signUpButtonContainer}>
          <Text style={styles.signUpButtonText} onPress={handleSignUp}>
            Sign Up
          </Text>
        </TouchableOpacity>

        {/* Sign Up Modal */}
        <Modal visible={isSignUpModalVisible} animationType="slide" onRequestClose={handleSignUpClose}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Inscription</Text>
            {<InscriptionScreen />}
            <TouchableOpacity style={styles.modalCloseButton} onPress={handleSignUpClose}>
              <Text style={styles.modalCloseButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </Modal>

        {/* Footer */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Copyright © 2023 Get ME. All rights reserved.
          </Text>
        </View>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 17,
    paddingBottom: 20,
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
  },
  headerTextWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  firstTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",
    marginTop:20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  space: {
    width: 400, 
  },
  input: {
    width: "100%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "black",
  },
  button: {
    backgroundColor: "transparent",
    borderColor: "#FFF",
    borderWidth: 1,
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpButtonContainer: {
    marginBottom: 10,
  },
  signUpButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    textDecorationLine: "underline",
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 20,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  modalCloseButton: {
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginTop: 20,
  },
  modalCloseButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 20,
    paddingBottom: 10,
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
  },
  footerText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "bold",
  },
});

export default SignInScreen;

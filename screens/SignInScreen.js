import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Modal, ImageBackground, Image } from 'react-native';
import InscriptionScreen from '../screens/InscriptionScreen';
import { login } from '../reducers/user';


function SignInScreen() {
  const dispatch = useDispatch();
  const [isSignUpModalVisible, setSignUpModalVisible] = useState(false);
  const [signInEmail, setSignInEmail] = useState('');
  const [signInPassword, setSignInPassword] = useState('');
  const [userError, setUserError] = useState(false);
  const navigation = useNavigation();

  const handleSignUp = () => {
    setSignUpModalVisible(true);
  };

  const handleSignUpClose = () => {
    setSignUpModalVisible(false);
  };

  const handleSignIn = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/signin`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: signInEmail, password: signInPassword, }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.result) {

          console.log("user sign in", data)
          dispatch(login(data.user)); // Dispatch the login action with the entire data object
          setSignInEmail('');
          setSignInPassword('');
          navigation.navigate('TabNavigator');
        } else {
          setUserError(true);
        }
      });
  }


  return (
    <ImageBackground source={require('../assets/background.jpg')} style={styles.background}>
      <View style={styles.container}>
        <View style={styles.header}>
        <Image style={styles.logo} source={require('../assets/logo-getme.png')}/>
          <Text style={styles.firstTitle}>GET ME</Text>
        </View>
        <View style={styles.positionInput}>
        <TextInput
          style={styles.input}
          keyboardType='email-address'
          placeholder="Email"
          placeholderTextColor="#FFF"
        //   récupèration de l'email renseigné dans le TextInput pour le sotcker dans le state signInEmail
        onChangeText={(value) => setSignInEmail(value)} value={signInEmail}
   
        />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          placeholderTextColor="#FFF"
          secureTextEntry={true}
          //   récupère la value depuis le state
          onChangeText={(value) => setSignInPassword(value)} value={signInPassword}
        />
        
        {userError && <Text style={styles.error}>Adresse email ou mot de passe incorrect</Text> }
        <TouchableOpacity style={styles.button} onPress={handleSignIn}>
          <Text style={styles.buttonText}>Connexion</Text>
        </TouchableOpacity>

        {/* SignUp Btn */}
        <TouchableOpacity style={styles.signUpButtonContainer}>
          <Text style={styles.signUpButtonText} onPress={handleSignUp}>
            Créer un compte
          </Text>
        </TouchableOpacity>
        </View>

        {/* SignUp Modal */}
        <Modal visible={isSignUpModalVisible} animationType="slide" onRequestClose={handleSignUpClose}>
          <View style={styles.modalContainer}>
            <Text style={styles.modalTitle}>Inscription</Text>
            {<InscriptionScreen closeParentModal={handleSignUpClose} />}
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

  },
  background: {
    flex: 1,
    resizeMode: "cover",
    justifyContent: "center",
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: '10%',
    marginBottom: '3%',
    paddingRight: '8%',
    paddingLeft: '8%',
    backgroundColor: "rgba(0, 0, 0, 0.6)", 
    height: '18%',
  },

  firstTitle: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#FFF",


  },
  title: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    // marginLeft: 'auto',
  },
  // // space: {
  // //   width: '100%', 
  // },
  input: {
    width: "95%",
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingHorizontal: 10,
    marginBottom: 10,
    color: "#FFF",
   
  },
  button: {
    backgroundColor: "#fec48d",
    borderColor: "white",
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
  error: {
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
  },
  logo: {
    width: 110,
    height: 110,
  },
  positionInput: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    

  }
});

export default SignInScreen;

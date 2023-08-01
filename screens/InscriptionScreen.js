import React, { useState } from "react";
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
import ProfilUserScreen from "../screens/ProfilUserScreen";
import { login } from "../reducers/user";
import { useDispatch } from 'react-redux';


function InscriptionScreen(props)  {

  const dispatch = useDispatch();
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [signUpBirthday, setSignUpBirthday] = useState('');
  const [emailError, setEmailError] = useState(false);


  const navigation = useNavigation();



  //Gère la navigation vers un autre screen au click
  const handleProfil = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/signup`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: signUpEmail, password: signUpPassword, birthday: signUpBirthday }),
		}).then(response => response.json())
			.then(data => {
				if (data.result && EMAIL_REGEX.test(signUpEmail)) {
          dispatch(login({ email: signUpEmail, birthday: signUpBirthday, token: data.token }));
          setSignUpEmail('');
					setSignUpPassword('');
					setSignUpBirthday('');
          props.closeParentModal()  // Inverse data flow;
          navigation.navigate('ProfilUserScreen');		
         
				} else {
          setEmailError(true);
        }
        
			});

      
    };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Saisir vos informations</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input} placeholder="Adresse email"  onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} />
        <TextInput style={styles.input} placeholder="Date de naissance" onChangeText={(value) => setSignUpBirthday(value)} value={signUpBirthday} />
      </View>

      {emailError && <Text style={styles.error}>Adresse email incorrect</Text> }
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
    minWidth: "100%",
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
  error: {
    marginTop: 5,
    marginBottom: 5,
    color: 'red',
  },
});

export default InscriptionScreen;

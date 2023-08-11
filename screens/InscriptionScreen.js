
import React, { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  Platform,
} from "react-native";
import { useDispatch } from 'react-redux';
import { login } from "../reducers/user";
import * as Location from 'expo-location';

function InscriptionScreen(props) {
  const dispatch = useDispatch();
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();

  const handleProfil = async () => {
    setLoading(true);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});

      const userData = {
        
        email: signUpEmail,
        password: signUpPassword,
        latitude:location.coords.latitude,
        longitude:location.coords.longitude,
      };

      const signupResponse = await fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData,),
      });

      const data = await signupResponse.json();

      const coordinatesData = {
        token: data.token,
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      };
      if (data.result && EMAIL_REGEX.test(signUpEmail)) {
        
        dispatch(login({ email: signUpEmail, token: data.token,longitude:coordinatesData.longitude,latitude:coordinatesData.latitude, animal: [] }));
        setSignUpEmail('');
        setSignUpPassword('');
        props.closeParentModal();
    
        navigation.navigate('ProfilUserScreen');
      } else {
        setEmailError(true);
      }
    } catch (error) {
      console.error('Error during signup:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Saisir vos informations</Text>
      <View style={styles.inputContainer}>
        <TextInput style={styles.input}  placeholder="Adresse email" 
          keyboardType='email-address' onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} />
        <TextInput
          style={styles.input}
          placeholder="Mot de passe"
          secureTextEntry={true}
          onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} />
      </View>

      {emailError && <Text style={styles.error}>Adresse email incorrect ou compte déjà existant</Text> }
      {/* active la fonction handleProfil au click */}
      <TouchableOpacity style={styles.button} onPress={handleProfil} disabled={loading}>
        <Text style={styles.buttonText}>{loading ? 'Loading...' : 'S\'enregistrer'}</Text>       
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "whitesmoke",
    opacity: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 50,
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
    width: "90%",
    height: 150,
    
    // borderColor: "#ccc",
    // borderWidth: 1,
    // borderRadius: 5,
    // paddingHorizontal: 10,
    // marginBottom: 20,
    // marginTop: 10,
  },
  button: {
    backgroundColor: "#fec48d",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 15,
    
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

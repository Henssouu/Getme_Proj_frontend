import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
} from "react-native";
import { useSelector, useDispatch } from 'react-redux';
import  { login, addPhoto } from "../reducers/user";
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';

const ProfilUserScreen = () => {

  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [hasAnimal, setHasAnimal] = useState(false);
  const [nomUser, setNomUser] = useState('');
  const [prenomUser, setPrenomUser] = useState('');
  const [pseudo, setPseudo] = useState('');
  const [adresse, setAdresse] = useState('');
  const [userProfilError, setUserProfilError] = useState(false);
  const [image, setImage] = useState(null);

  const user = useSelector((state) => state.user.value);

  const requestPermissions = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      alert('Permission d\'accès à la galerie refusée.');
    }
  };

useEffect(() => {
  requestPermissions()
}, []);



  //condition pour passer du screen "AnimalProfil" ou "HomeScreen"
  
  const addImage= async() => {
    
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      console.log('test',_image.uri);
        setImage(_image.uri);
      

  };

 
 
  
  
  const switchToAnimal = () => {

    const formData = new FormData();
    console.log("coucou", image)
    
    formData.append('photoFromFront', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    
 
     
  

    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({token: user.token, nom: nomUser, prenom: prenomUser, pseudo: pseudo,longitude:user.longitude,latitude:user.latitude, adresse: adresse, photo: image }),
		}).then(response => response.json())
			.then(data => {
        fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users//userimage/upload`, {
          method: 'POST',
          body: formData,
         }).then((response) => response.json())
          .then((data) => {
           setImage(data.url);
         });

        if (data.result) {
          
          dispatch(login({token: user.token, email: user.email, nom: nomUser, prenom: prenomUser,longitude:user.longitude,latitude:user.latitude, pseudo: pseudo, adresse: adresse, photo: image, animal: []}));
          setNomUser('');
          setPrenomUser('');
          setPseudo('');
          setAdresse('');
          setImage('');
         
          if (hasAnimal) {
            // passe au screen "AnimalProfilScreen"
            navigation.navigate("AnimalProfilScreen");
          } else {
            //passe au screen "HomeScreen"
            navigation.navigate("TabNavigator");
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
      <View style={styles.emplacementImage}>
      <View style={styles.containerImage}>
                {
                    image  && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />
                }
                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                            <Text>{image ? 'Edit' : 'Ajouter'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
                    </View>
                    </View>
                    </View>
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
    textAlign: 'center',
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
    borderRadius: 40,
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
    backgroundColor: "lightgrey",
  },
  button: {
    backgroundColor: "#fec48d",
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
    textAlign: 'center',
  },
  error: {
    marginTop: 5,
    marginBottom: 50,
    color: 'red',
  },
  containerImage:{
    elevation:2,
    height:200,
    width:200,
    backgroundColor:'#efefef',
    position:'relative',
    borderRadius:999,
    overflow:'hidden',
},
uploadBtnContainer:{
    opacity:0.7,
    position:'absolute',
    right:0,
    bottom:0,
    backgroundColor:'lightgrey',
    width:'100%',
    height:'25%',
},
uploadBtn:{
    display:'flex',
    alignItems:"center",
    justifyContent:'center'
},
emplacementImage: {
  alignItems: 'center',
  marginBottom: '5%',
},
});

export default ProfilUserScreen;






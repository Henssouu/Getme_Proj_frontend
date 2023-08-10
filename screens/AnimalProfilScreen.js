import React, { useState } from "react";
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
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from '@react-navigation/native';
// import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { addAnimal, addAnimalPhoto } from "../reducers/user";
import { useDispatch, useSelector } from 'react-redux';

import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';


const AnimalProfilScreen = () => {
  const [tailleModalVisible, setTailleModalVisible] = useState(false);
  const [selectedTaille, setSelectedTaille] = useState("");
  const [typeModalVisible, setTypeModalVisible] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [poilModalVisible, setPoilModalVisible] = useState(false);
  const [selectedPoil, setSelectedPoil] = useState("");
  const [sexModalVisible, setSexModalVisible] = useState(false);
  const [selectedSex, setSelectedSex] = useState("");
  const [castréModalVisible, setCastréModalVisible] = useState(false);
  const [selectedCastré, setSelectedCastré] = useState("");
  const [tatouageModalVisible, setTatouageModalVisible] = useState(false);
  const [selectedTatouage, setSelectedTatouage] = useState("");
  const [puceModalVisible, setPuceModalVisible] = useState(false);
  const [selectedPuce, setSelectedPuce] = useState("");

const[type, setType] = useState('');
const [nom, setNom] = useState('');
const [taille, setTaille] = useState('');
const [couleur, setCouleur] = useState('');
const [poil, setPoil] = useState('');
const [sexe, setSexe] = useState('');
const [castré, setCastré] = useState('');
const [tatouage, setTatouage] = useState('');
const [puce, setPuce] = useState('');
const [description, setDescription] = useState('');
const [animalProfilError, setAnimalProfilError] = useState(false);
const [image, setImage] = useState(null);

const dispatch = useDispatch();
const user = useSelector((state) => state.user.value);
const navigation = useNavigation();

  const toggleModal = (modalState, setModalState) => {
    setModalState(!modalState);
  };

  const handleSelect = (value, setModalState, setSelectedValue) => {
    setSelectedValue(value);
    setModalState(false);
  };


 

  const addImage= async() => {
    let _image = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4,3],
        quality: 1,
      });
      console.log('test',_image);
        setImage(_image.uri);
       
  
  };




console.log('ok',image);


  const handleTerminer = () => {

    
  const formData = new FormData();
  console.log("lolilol", image)
    formData.append('photoFromFront', {
      uri: image,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });
    
   




    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/animaux/newanimal`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: user.token,type,nom,taille,couleur,poil,sexe,castré,tatouage,puce,description,animalPhoto: image }),
		}).then(response => response.json())
			.then(data => {
        console.log('test', data)
 
        fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/animalimage/upload`, {
          method: 'POST',
          body: formData,
         }).then((response) => response.json())
          .then((data) => {
           setImage(data.url);
         });

        
         if(data.result){

          dispatch(addAnimal({animal: data.animal}));
          setType('');
          setNom('');
          setTaille('');
          setCouleur('');
          setPoil('');
          setSexe('');
          setCastré('');
          setTatouage('');
          setPuce('');
          setDescription('');
          setImage('');
          navigation.navigate('TabNavigator');
}else{
  setAnimalProfilError(true);        
}
   
  })
}


  return (
    <ScrollView style={{flex:1}} contentContainerStyle={{justifyContent:'center', alignItems: 'center'}}>
        <View style={styles.titleContainer}>
        <Text style={styles.title}>Entrer le profil de votre animal</Text>
        </View>
      <View style={styles.inputContainer}>
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
  
        <TextInput onChangeText={(value) => setNom(value)} value={nom} style={styles.input} placeholder="Nom" />
        <View style={styles.inputBlock}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleModal(typeModalVisible, setTypeModalVisible)}>
            
            <Text>{selectedType || "Type :" }</Text>
          </TouchableOpacity>

          <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(tailleModalVisible, setTailleModalVisible)
                }
              >
                <Text>{selectedTaille || "Taille :"}</Text>
              </TouchableOpacity>

          <TextInput onChangeText={(value) => setCouleur(value)} value={couleur} style={styles.input} placeholder="Couleur :" />

              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(poilModalVisible, setPoilModalVisible)
                }
              >
                <Text>{selectedPoil || "Poil :"}</Text>
              </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleModal(sexModalVisible, setSexModalVisible)}
          >
            <Text>{selectedSex || "Sexe :"}</Text>
          </TouchableOpacity>

              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(castréModalVisible, setCastréModalVisible)
                }
              >
                <Text>{selectedCastré || "Castré :"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(tatouageModalVisible, setTatouageModalVisible)
                }
              >
                <Text>{selectedTatouage || "Tatouage :"}</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(puceModalVisible, setPuceModalVisible)
                }
              >
                <Text>{selectedPuce || "Puce :"}</Text>
              </TouchableOpacity>

          <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.input} placeholder="Description :" />
        </View>
        {animalProfilError && <Text style={styles.error}>Merci de renseigner tous les champs obligatoires *</Text> }
      </View>
      
      <View style={styles.buttonContainer}>
      <TouchableOpacity onPress={handleTerminer} style={styles.button}>
        <Text style={styles.buttonText}>Terminer</Text>
      </TouchableOpacity>
      </View>

      {/* Modal for "Type" */}
      <Modal visible={typeModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => {
              handleSelect("Chat", setTypeModalVisible, setSelectedType), setType('Chat') }
            }
          >
            <Text style={styles.modalOptionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Chien", setTypeModalVisible, setSelectedType), setType('Chien')}
            }
          >
            <Text style={styles.modalOptionText}>Chien</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Taille" */}
      <Modal visible={tailleModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Petite", setTailleModalVisible, setSelectedTaille), setTaille('Petite')}
            }
          >
            <Text style={styles.modalOptionText}>Petite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Moyenne", setTailleModalVisible, setSelectedTaille),setTaille('Moyenne') }
            }
          >
            <Text style={styles.modalOptionText}>Moyenne</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Grande", setTailleModalVisible, setSelectedTaille),setTaille('Grande') }
            }
          >
            <Text style={styles.modalOptionText}>Grande</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Poil" */}
      <Modal visible={poilModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Court", setPoilModalVisible, setSelectedPoil),setPoil('Court') }
            }
          >
            <Text style={styles.modalOptionText}>Court</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Mi-long", setPoilModalVisible, setSelectedPoil),setPoil('Mi-long') }
            }
          >
            <Text style={styles.modalOptionText}>Mi-long</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Long", setPoilModalVisible, setSelectedPoil), setPoil('Long')}
            }
          >
            <Text style={styles.modalOptionText}>Long</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Sex" */}
      <Modal visible={sexModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Mâle", setSexModalVisible, setSelectedSex),setSexe('Mâle') }
            }
          >
            <Text style={styles.modalOptionText}>Mâle</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Femelle", setSexModalVisible, setSelectedSex),setSexe('Femelle') }
            }
          >
            <Text style={styles.modalOptionText}>Femelle</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "castré" */}
      <Modal visible={castréModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Oui", setCastréModalVisible, setSelectedCastré),setCastré('Oui') }
            }
          >
            <Text style={styles.modalOptionText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Non", setCastréModalVisible, setSelectedCastré),setCastré('Non') }
            }
          >
            <Text style={styles.modalOptionText}>Non</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Tatouage" */}
      <Modal visible={tatouageModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Oui", setTatouageModalVisible, setSelectedTatouage), setTatouage('Oui')}
            }
          >
            <Text style={styles.modalOptionText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Non", setTatouageModalVisible, setSelectedTatouage), setTatouage('Non')}
            }
          >
            <Text style={styles.modalOptionText}>Non</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Puce" */}
      <Modal visible={puceModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Oui", setPuceModalVisible, setSelectedPuce),setPuce('Oui')}
            }
          >
            <Text style={styles.modalOptionText}>Oui</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() =>
              {handleSelect("Non", setPuceModalVisible, setSelectedPuce), setPuce('Non')}
            }
          >
            <Text style={styles.modalOptionText}>Non</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  containerWrapper: {
    flex: 1,

  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: '15%',
  },
  titleContainer: {
    paddingHorizontal: 20,
    paddingTop: 30,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    minWidth: '100%',
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 2,
    marginTop: 8.5,
    justifyContent: 'center',
  },
  inputContainer: {
    width: "80%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 20,
    marginTop: 10,
    flexDirection: 'column',
    alignItems: 'center',
  },
  button: {
    width: 160,
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: -13,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  inputBlock: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
    marginTop: '10%',
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    
  },
  modalOptionText: {
    fontSize: 16,
  },
  error: {
    marginTop: 5,
    marginBottom: 5,
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

});

export default AnimalProfilScreen;

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
} from "react-native";
import { useNavigation } from '@react-navigation/native';
// import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { addAnimal } from "../reducers/user";
import { useDispatch } from 'react-redux';


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
const [birthday, setBirthday] = useState('');
const [description, setDescription] = useState('');
// const [photo, setPhoto] = useState('');
const dispatch = useDispatch();

  const toggleModal = (modalState, setModalState) => {
    setModalState(!modalState);
  };

  const handleSelect = (value, setModalState, setSelectedValue) => {
    setSelectedValue(value);
    setModalState(false);
  };

  const navigation = useNavigation(); 

  const handleTerminer = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/animaux/newanimal`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ type,nom,taille,couleur,poil,sexe,castré,tatouage,puce,birthday,description }),
		}).then(response => response.json())
			.then(data => {
        console.log(data)
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
          setBirthday('');
          setDescription('');
          navigation.navigate('HomeScreen');
         

}
   
  })
}


  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Entrer le profil de votre animal</Text>
      <View style={styles.inputContainer}>
        <View>{/*photo*/}</View>
        <TextInput onChangeText={(value) => setNom(value)} value={nom} style={styles.input} placeholder="Nom" />
        <View style={styles.inputBlock}>
          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleModal(typeModalVisible, setTypeModalVisible)}
          >
            <Text>{selectedType || "Type :"}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.input}
            onPress={() =>
              toggleModal(tailleModalVisible, setTailleModalVisible)
            }
          >
            <Text>{selectedTaille || "Taille :"}</Text>
          </TouchableOpacity>

          <TextInput onChangeText={(value) => setBirthday(value)} value={birthday} style={styles.input} placeholder="Date de naissance" />
          <TextInput onChangeText={(value) => setCouleur(value)} value={couleur} style={styles.input} placeholder="couleur :" />

          <TouchableOpacity
            style={styles.input}
            onPress={() => toggleModal(poilModalVisible, setPoilModalVisible)}
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
            onPress={() => toggleModal(puceModalVisible, setPuceModalVisible)}
          >
            <Text>{selectedPuce || "Puce :"}</Text>
          </TouchableOpacity>

          <TextInput onChangeText={(value) => setDescription(value)} value={description} style={styles.input} placeholder="Description :" />
        </View>
      </View>
      <TouchableOpacity onPress={handleTerminer} style={styles.button}>
        <Text style={styles.buttonText}>Terminer</Text>
      </TouchableOpacity>

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
  inputBlock: {
    marginBottom: 10,
  },
  modalContainer: {
    backgroundColor: "white",
    padding: 20,
    flex: 1,
  },
  modalOption: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  modalOptionText: {
    fontSize: 16,
  },
});

export default AnimalProfilScreen;

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

  const toggleModal = (modalState, setModalState) => {
    setModalState(!modalState);
  };

  const handleSelect = (value, setModalState, setSelectedValue) => {
    setSelectedValue(value);
    setModalState(false);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <Text style={styles.title}>Entrer le profil de votre animal</Text>
      <View style={styles.inputContainer}>
        <View>{/*photo*/}</View>
        <View style={styles.inputBlock}>
          <TextInput 
            style={styles.input} 
            placeholder="Type"
            onPress={() => toggleModal(typeModalVisible, setTypeModalVisible)}
          >
            <Text>{selectedType || "Type :"}</Text>
          </TextInput>

          <TextInput 
            style={styles.input}
            placeholder="Taille"
            onPress={() => toggleModal(tailleModalVisible, setTailleModalVisible)}
          >
            <Text>{selectedTaille || "Taille :"}</Text>
          </TextInput>

          <TextInput style={styles.input} placeholder="Date de naissance" />
          <TextInput style={styles.input} placeholder="couleur :" />

          <TextInput 
            style={styles.input}
            placeholder="Poil"
            onPress={() => toggleModal(poilModalVisible, setPoilModalVisible)}
          >
            <Text>{selectedPoil || "Poil :"}</Text>
          </TextInput>

          <TextInput 
            style={styles.input}
            placeholder="Sex"
            onPress={() => toggleModal(sexModalVisible, setSexModalVisible)}
          >
            <Text>{selectedSex || "Sex :"}</Text>
          </TextInput>

          <TextInput 
            style={styles.input}
            placeholder="castré"
            onPress={() => toggleModal(castréModalVisible, setCastréModalVisible)}
          >
            <Text>{selectedCastré || "Castré :"}</Text>
          </TextInput>

          <TextInput 
            style={styles.input}
            placeholder="Tatouage"
            onPress={() => toggleModal(tatouageModalVisible, setTatouageModalVisible)}
          >
            <Text>{selectedTatouage || "Tatouage :"}</Text>
          </TextInput>

          <TextInput 
            style={styles.input}
            placeholder="Puce"
            onPress={() => toggleModal(puceModalVisible, setPuceModalVisible)}
          >
            <Text>{selectedPuce || "Puce :"}</Text>
          </TextInput>

          <TextInput style={styles.input} placeholder="Description :" />
        </View>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Terminer</Text>
      </TouchableOpacity>

      {/* Modal for "Type" */}
      <Modal visible={typeModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("Chat", setTypeModalVisible, setSelectedType)}
          >
            <Text style={styles.modalOptionText}>Chat</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("Dog", setTypeModalVisible, setSelectedType)}
          >
            <Text style={styles.modalOptionText}>Dog</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Taille" */}
      <Modal visible={tailleModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("petite", setTailleModalVisible, setSelectedTaille)}
          >
            <Text style={styles.modalOptionText}>petite</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("moyenne", setTailleModalVisible, setSelectedTaille)}
          >
            <Text style={styles.modalOptionText}>moyenne</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("grande", setTailleModalVisible, setSelectedTaille)}
          >
            <Text style={styles.modalOptionText}>grande</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Poil" */}
      <Modal visible={poilModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("court", setPoilModalVisible, setSelectedPoil)}
          >
            <Text style={styles.modalOptionText}>court</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("mi-long", setPoilModalVisible, setSelectedPoil)}
          >
            <Text style={styles.modalOptionText}>mi-long</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("long", setPoilModalVisible, setSelectedPoil)}
          >
            <Text style={styles.modalOptionText}>long</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Sex" */}
      <Modal visible={sexModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("male", setSexModalVisible, setSelectedSex)}
          >
            <Text style={styles.modalOptionText}>male</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("femelle", setSexModalVisible, setSelectedSex)}
          >
            <Text style={styles.modalOptionText}>femelle</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "castré" */}
      <Modal visible={castréModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("yes", setCastréModalVisible, setSelectedCastré)}
          >
            <Text style={styles.modalOptionText}>yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("no", setCastréModalVisible, setSelectedCastré)}
          >
            <Text style={styles.modalOptionText}>no</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Tatouage" */}
      <Modal visible={tatouageModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("yes", setTatouageModalVisible, setSelectedTatouage)}
          >
            <Text style={styles.modalOptionText}>yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("no", setTatouageModalVisible, setSelectedTatouage)}
          >
            <Text style={styles.modalOptionText}>no</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      {/* Modal for "Puce" */}
      <Modal visible={puceModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("yes", setPuceModalVisible, setSelectedPuce)}
          >
            <Text style={styles.modalOptionText}>yes</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.modalOption}
            onPress={() => handleSelect("no", setPuceModalVisible, setSelectedPuce)}
          >
            <Text style={styles.modalOptionText}>no</Text>
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

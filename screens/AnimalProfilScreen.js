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
} from "react-native";
import { useNavigation } from "@react-navigation/native";

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

  const navigation = useNavigation();

  const handleTerminer = () => {
    navigation.navigate("HomeScreen");
  };

  return (
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={styles.container}
        >
  
      <View style={styles.containerWrapper}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Entrer le profil de votre animal</Text>
        </View>
          <View style={styles.inputContainer}>
            <View>{/*photo*/}</View>
            <TextInput style={styles.input} placeholder="Nom" />
            <View style={styles.inputBlock}>
              <TouchableOpacity
                style={styles.input}
                onPress={() =>
                  toggleModal(typeModalVisible, setTypeModalVisible)
                }
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

              <TextInput style={styles.input} placeholder="Date de naissance" />
              <TextInput style={styles.input} placeholder="couleur :" />

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

              <TextInput style={styles.input} placeholder="Description :" />
            </View>
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
                onPress={() =>
                  handleSelect("Chat", setTypeModalVisible, setSelectedType)
                }
              >
                <Text style={styles.modalOptionText}>Chat</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("Chien", setTypeModalVisible, setSelectedType)
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
                  handleSelect(
                    "Petite",
                    setTailleModalVisible,
                    setSelectedTaille
                  )
                }
              >
                <Text style={styles.modalOptionText}>Petite</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect(
                    "Moyenne",
                    setTailleModalVisible,
                    setSelectedTaille
                  )
                }
              >
                <Text style={styles.modalOptionText}>Moyenne</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect(
                    "Grande",
                    setTailleModalVisible,
                    setSelectedTaille
                  )
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
                  handleSelect("Court", setPoilModalVisible, setSelectedPoil)
                }
              >
                <Text style={styles.modalOptionText}>Court</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("Mi-long", setPoilModalVisible, setSelectedPoil)
                }
              >
                <Text style={styles.modalOptionText}>Mi-long</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("Long", setPoilModalVisible, setSelectedPoil)
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
                  handleSelect("Mâle", setSexModalVisible, setSelectedSex)
                }
              >
                <Text style={styles.modalOptionText}>Mâle</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("femelle", setSexModalVisible, setSelectedSex)
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
                  handleSelect("Oui", setCastréModalVisible, setSelectedCastré)
                }
              >
                <Text style={styles.modalOptionText}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("Non", setCastréModalVisible, setSelectedCastré)
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
                  handleSelect(
                    "Oui",
                    setTatouageModalVisible,
                    setSelectedTatouage
                  )
                }
              >
                <Text style={styles.modalOptionText}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect(
                    "Non",
                    setTatouageModalVisible,
                    setSelectedTatouage
                  )
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
                  handleSelect("Oui", setPuceModalVisible, setSelectedPuce)
                }
              >
                <Text style={styles.modalOptionText}>Oui</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.modalOption}
                onPress={() =>
                  handleSelect("Non", setPuceModalVisible, setSelectedPuce)
                }
              >
                <Text style={styles.modalOptionText}>Non</Text>
              </TouchableOpacity>
            </View>
          </Modal>
      </View>
        </KeyboardAvoidingView>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
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
    width: 160,
    backgroundColor: "blue",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 5,
  },
  buttonContainer: {
    alignItems: "center",
    marginTop: 20,
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

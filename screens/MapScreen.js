import { useEffect, useState, useRef } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNotice, login } from '../reducers/user'; 

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

export default function MapScreen() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  const [currentPosition, setCurrentPosition] = useState({
    latitude: 43.3013486,
    longitude: 5.3700205,
    latitudeDelta: 0.1,
    longitudeDelta: 0.1,
  });
  const [tempCoordinates, setTempCoordinates] = useState(null);
  const [selectedNotice, setSelectedNotice] = useState(null);
  const [modalVisible, setModalVisible] = useState(false); // State for the modal
  const [noticeType, setNoticeType] = useState(''); // State for the notice form
  const [noticePhoto, setNoticePhoto] = useState(''); // State for the notice form
  const [noticeTaille, setNoticeTaille] = useState(''); // State for the notice form
  const [noticeCouleur, setNoticeCouleur] = useState(''); // State for the notice form
  const [noticePoil, setNoticePoil] = useState(''); // State for the notice form
  const [noticeSexe, setNoticeSexe] = useState(''); // State for the notice form
  const [noticeDescription, setNoticeDescription] = useState(''); // State for the notice form
  const [noticeReward, setNoticeReward] = useState(''); // State for the notice form
  const [wantedNotices, setWantedNotices] = useState([]);
  const mapRef = useRef(null);

  // Fetch les user data quand le component mount
  const fetchUserData = async () => {
    try {
      const response = await fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`);
      const userData = await response.json();
      setTempCoordinates(null);
      // Dispatch the login action to update the user state with the fetched data
      // dispatch(login(userData.token));
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const fetchCurrentLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('La permission de lacalisation a été refusé');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.1, // Adjuste le zoom
        longitudeDelta: 0.1,
      });
    };

    fetchCurrentLocation();
  }, []);

  const handleLongPress = (e) => {
    setTempCoordinates(e.nativeEvent.coordinate);
    setModalVisible(true);
  };

  // Function pour ajouter une nvelle notice
const handleAddNotice = () => {
  if (!tempCoordinates || !noticeType || !noticeDescription || !noticeReward) {
    // Validation pour les champs requis
    console.log('veuillez remplir tous les champs.');
    return;
  }

  // Create a new wanted notice object with the form data
  const newNotice = {
    type: noticeType,
    photo: noticePhoto,
    taille: noticeTaille,
    couleur: noticeCouleur,
    poil: noticePoil,
    sexe: noticeSexe,
    description: noticeDescription,
    reward: noticeReward,
    latitude: tempCoordinates.latitude,
    longitude: tempCoordinates.longitude,
  };

  // envoi les nvlles wanted notice data au server pour être sauvegardé dans la database.
  fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/api/wanted-notices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: user.token, ...newNotice }),
  })
    .then(response => {
      if (!response.ok) {
        // gère le cas ou la réponse indique une érreur
        return response.json().then(errorResponse => {
          throw new Error(errorResponse.error);
        });
      }
      // Fetch les data user mis à jour après avoir ajouté une notice
      return fetchUserData();
    })
    .then(() => {
      setModalVisible(false); // Ferme la modal après avoir ajouté une notice
      setTempCoordinates(null);
    })
    .catch(error => {
      console.error('Error adding wanted notice:', error);
    });
};

const handleSearchNoticesInArea = () => {
  const minLatitude = currentPosition.latitude - 0.05;
  const maxLatitude = currentPosition.latitude + 0.05;
  const minLongitude = currentPosition.longitude - 0.05;
  const maxLongitude = currentPosition.longitude + 0.05;

  fetch(
    `http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/api/wanted-notices/all/${user.token}?minLatitude=${minLatitude}&maxLatitude=${maxLatitude}&minLongitude=${minLongitude}&maxLongitude=${maxLongitude}`
  )
    .then(response => {
      if (!response.ok) {
        throw new Error('Error fetching wanted notices');
      }
      return response.json();
    })
    .then(data => {
      setWantedNotices(data.data);
    })
    .catch(error => {
      console.error('Error fetching wanted notices:', error);
    });
};





  // contenu de la modal pour ajouter une nvlle notice
  const renderModalContent = () => {
    return (
      <View style={styles.modalContent}>
        <Text style={styles.modalTitle}>Ajouter un avis de recherche</Text>
        <TextInput
          style={styles.modalInput}
          placeholder="Type"
          value={noticeType}
          onChangeText={setNoticeType}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Photo"
          value={noticePhoto}
          onChangeText={setNoticePhoto}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Taille"
          value={noticeTaille}
          onChangeText={setNoticeTaille}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Couleur"
          value={noticeCouleur}
          onChangeText={setNoticeCouleur}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Poil"
          value={noticePoil}
          onChangeText={setNoticePoil}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Sexe"
          value={noticeSexe}
          onChangeText={setNoticeSexe}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Description"
          value={noticeDescription}
          onChangeText={setNoticeDescription}
        />
        <TextInput
          style={styles.modalInput}
          placeholder="Reward"
          value={noticeReward}
          onChangeText={setNoticeReward}
        />
        <TouchableOpacity style={styles.addButton} onPress={handleAddNotice}>
          <Text style={styles.addButtonTitle}>Add</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.cancelButtonTitle}>Cancel</Text>
        </TouchableOpacity>
      </View>
    );
  };
  
  

  // contenu de la modal pour afficher une notice
  const renderNoticeModalContent = () => {
    return (
      <View style={styles.modalContent}>
        {selectedNotice && (
          <View>
            <Text style={styles.modalTitle}>{selectedNotice.type}</Text>
            <Text>Photo: {selectedNotice.photo}</Text>
            <Text>Taille: {selectedNotice.taille}</Text>
            <Text>Couleur: {selectedNotice.couleur}</Text>
            <Text>Poil: {selectedNotice.poil}</Text>
            <Text>Sexe: {selectedNotice.sexe}</Text>
            <Text>Description: {selectedNotice.description}</Text>
            <Text>Reward: {selectedNotice.reward}</Text>
          </View>
        )}
        <TouchableOpacity style={styles.cancelButton} onPress={handleClose}>
          <Text style={styles.cancelButtonTitle}>Close</Text>
        </TouchableOpacity>
      </View>
    );
  };

  // Function qui gère le click sur un marqueur et affiche la notice en question
  const handleMarkerPress = (data) => {
    setSelectedNotice(data);
  };

  const handleClose = () => {
    setSelectedNotice(null);
  };

  const markers = user.wantedNotice.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        title={data.name}
        onPress={() => handleMarkerPress(data)}
      />
    );
  });

  const wantedRadiusMarkers = wantedNotices.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        onPress={() => handleMarkerPress(data)}
      />
    );
  });

  const animateToMarker = () => {
    if (currentPosition && mapRef.current) {
      mapRef.current.animateToRegion({
        latitude: currentPosition.latitude,
        longitude: currentPosition.longitude,
        latitudeDelta: 0.1,
        longitudeDelta: 0.1,
      });
    }
  };

 

  return (
    <View style={styles.container}>
      <MapView
        ref={mapRef} // Set the ref for the MapView component
        onLongPress={(e) => handleLongPress(e)}
        mapType="hybrid"
        style={styles.map}
        initialRegion={currentPosition} // initialise la position initiale de l'utilisateur
        onMapReady={animateToMarker} // Animation qui zoom sur la localisation du marqueur quand la map est prête
      >
        {currentPosition && <Marker coordinate={currentPosition} title="My position" pinColor="#fecb2d" />}
        {markers}
        {wantedRadiusMarkers}
      </MapView>  
      <View style={styles.searchButtonContainer}>
        <TouchableOpacity
          style={styles.searchButton}
          onPress={handleSearchNoticesInArea}
        >
          <Text style={styles.searchButtonText}>Search Notices</Text>
        </TouchableOpacity>
      </View>      
      <TouchableOpacity
        onPress={() => {
          if (tempCoordinates) {
            // Ouvre la modal, seulement si les coordonées (tempCoordinates) sont présentes (lat, long)
            setModalVisible(true);
          }
        }}
        style={[styles.button, { opacity: tempCoordinates ? 1 : 0.5 }]} // Désactive le button si les coordonées ne sont pas présentes (tempCoordinates)
        activeOpacity={0.8}
        disabled={!tempCoordinates}
      >
        <Text style={styles.textButton}>Add Notice</Text>
      </TouchableOpacity>
  
      {/* Render the modal for adding a new notice */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <TouchableOpacity style={styles.modalBackground} onPress={() => setModalVisible(false)} />
          {renderModalContent()}
        </View>
      </Modal>
  
      {/* Render the modal for displaying the selected notice */}
      <Modal visible={selectedNotice !== null} animationType="fade" transparent>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>{renderNoticeModalContent()}</View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', 
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    width: '80%', 
  },
  modalInput: {
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
    color: 'black', 
    backgroundColor: '#ffffff', 
    padding: 5, 
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  input: {
    width: 150,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 16,
  },
  button: {
    width: 150,
    alignItems: 'center',
    marginTop: 20,
    paddingTop: 8,
    backgroundColor: '#0000FF',
    borderRadius: 10,
  },
  textButton: {
    color: '#ffffff',
    height: 24,
    fontWeight: '600',
    fontSize: 15,
  },
  noticeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  searchButtonContainer: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  searchButton: {
    backgroundColor: '#0000FF',
    borderRadius: 10,
    padding: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

import { useEffect, useState, useRef } from 'react';
import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View, Image, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { addNotice, login } from '../reducers/user'; 

import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan  } from '@fortawesome/free-solid-svg-icons';

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
      const response = await fetch(`${process.env.EXPO_PUBLIC_IP_STRING}/users/${user.token}`);
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
  setNoticeType('');
  setNoticeTaille('');
  setNoticeCouleur('');
  setNoticePoil('');
  setNoticePhoto('');
  setNoticeSexe('');
  setNoticeDescription('');
  setNoticeReward('');
  
  if (!tempCoordinates || !noticeType || !noticeDescription || !noticeReward) {
    
    // Validation pour les champs requis
    console.log('Veuillez remplir tous les champs.');
    return;
  }

   

 

  const formData = new FormData();
  console.log("lolilol", noticePhoto)
    formData.append('photoFromFront', {
      uri: noticePhoto,
      name: 'photo.jpg',
      type: 'image/jpeg',
    });


  // Create a new wanted notice object with the form data
  const newNotice = {
    type: noticeType,
    wantedNoticePhoto: noticePhoto,
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
  fetch(`${process.env.EXPO_PUBLIC_IP_STRING}/api/wanted-notices`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ token: user.token, ...newNotice }),
  })
    .then(response => {
      fetch(`${process.env.EXPO_PUBLIC_IP_STRING}/users/wantedNoticeImage/upload`, {
          method: 'POST',
          body: formData,
         }).then((response) => response.json())
          .then((data) => {
           setNoticePhoto(data.url);
         });
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
  const minLatitude = currentPosition.latitude - 0.5;
  const maxLatitude = currentPosition.latitude + 0.5;
  const minLongitude = currentPosition.longitude - 0.5;
  const maxLongitude = currentPosition.longitude + 0.5;

  fetch(
    `${process.env.EXPO_PUBLIC_IP_STRING}/api/wanted-notices/all/${user.token}?minLatitude=${minLatitude}&maxLatitude=${maxLatitude}&minLongitude=${minLongitude}&maxLongitude=${maxLongitude}`
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

    const addImage = async() => {
      let _image = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
          aspect: [4,3],
          quality: 1,
        });
        console.log('test',_image);
        setNoticePhoto(_image.uri);
         
    
    };
  
    return (
      <View style={styles.modalContent}>
        <View style={styles.modalTitrePosition}>
        <Text style={styles.modalTitre}>Ajouter un avis de recherche</Text>
        </View>
        <View style={styles.containerImage}>
                {
                    noticePhoto  && <Image source={{ uri: noticePhoto }} style={{ width: 200, height: 200 }} />
                }
                    <View style={styles.uploadBtnContainer}>
                        <TouchableOpacity onPress={addImage} style={styles.uploadBtn} >
                            <Text>{noticePhoto ? 'Edit' : 'Ajouter'} Image</Text>
                            <AntDesign name="camera" size={20} color="black" />
                        </TouchableOpacity>
      </View>
      </View>
        <TextInput
          style={styles.modalInput}
          placeholder="Type"
          value={noticeType}
          onChangeText={setNoticeType}
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
          placeholder="Récompense"
          value={noticeReward}
          onChangeText={setNoticeReward}
        />
        <View style={styles.boutonModalAjouter}>
          <Pressable style={styles.addButton} onPress={handleAddNotice}>
          <Text style={styles.addButtonTitle}>Ajouter</Text>
          </Pressable>
        </View>
        <View style={styles.boutonModalFermer}>
          <Pressable style={styles.cancelButton} onPress={() => setModalVisible(false)}>
          <Text style={styles.cancelButtonTitle}>Fermer</Text>
        </Pressable>
        </View>
      </View>
    );
  };
  
  console.log(selectedNotice);

  // contenu de la modal pour afficher une notice
  const renderNoticeModalContent = () => {
    
    return (
      <View style={styles.modalContent}>
        {selectedNotice && (
          <View>
            <View style={styles.fatrash} >
              <FontAwesomeIcon icon={faTrashCan} />
            </View>
              <View style={styles.titre}>
                <Text style={styles.textTitre}>Avis de recherche posté par : @{selectedNotice.author?.pseudo}</Text>
              </View>
                <View style={styles.imagePosition}>
                  <Image style={styles.images} source={{uri: selectedNotice.wantedNoticePhoto}}></Image>
                </View>
                <View style={styles.descriptionPosition}>
                  <Text style={styles.modalTitle}>{selectedNotice.type}</Text>
                  <Text>Taille: {selectedNotice.taille}</Text>
                  <Text>Couleur: {selectedNotice.couleur}</Text>
                  <Text>Poil: {selectedNotice.poil}</Text>
                  <Text>Sexe: {selectedNotice.sexe}</Text>
                  <Text>Description: {selectedNotice.description}</Text>
                  <Text>Récompense: {selectedNotice.reward}</Text>
               </View>
          </View>
        )}
        <Pressable style={styles.fermerBoutton} onPress={handleClose}>
          <Text style={styles.fermerBouttonText}>Fermer</Text>
        </Pressable>
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

  const markers = user?.wantedNotice?.map((data, i) => {
    return (
      <Marker
        key={i}
        coordinate={{ latitude: data.latitude, longitude: data.longitude }}
        title={data.name}
        onPress={() => handleMarkerPress(data)}
      />
    );
  });

  const wantedRadiusMarkers = wantedNotices?.map((data, i) => {
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
          <Text style={styles.searchButtonText}>Afficher tous les avis de recherche </Text>
        </TouchableOpacity>
      </View>      
      {/* <TouchableOpacity
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
      </TouchableOpacity> */}
  
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
    padding: 10,
    alignItems: 'center',
    width: '80%', 
  },
  modalInput: {
    borderBottomColor: '#fec48d',
    borderBottomWidth: 1,
    fontSize: 16,
    color: 'black', 
    backgroundColor: '#ffffff', 
    padding: 5, 
  },
  modalView: {
    backgroundColor: 'white',
    borderRadius: 20,
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
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    borderRadius: 10,
    padding: 10,
  },
  searchButtonText: {
    color: 'white',
    fontWeight: 'bold',
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
images: {
  width: 300,
  height: 250,

},
fatrash: {
  flexDirection: 'row',
  alignItems: 'start',
  justifyContent: 'flex-end',
  paddingBottom: 25,
},
titre: {
  marginLeft: 25,
  marginRight: 25,
  flexDirection: 'row',
  textAlign: 'center',
  marginBottom: 25,

},
textTitre: {
  fontSize: 16,
fontWeight: 'bold',
},
imagePosition: {
  flexDirection: 'row',
  justifyContent: 'center',
},
descriptionPosition: {
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  marginTop: 25,
},
fermerBoutton: {
  backgroundColor: "#fec48d",
  paddingVertical: 12,
  paddingHorizontal: 40,
  borderWidth: 1,
  borderRadius: 15,
  borderColor: "white",
  marginTop: 20,
  marginBottom: 10,
  borderColor: "white",
  borderWidth: 1,
},
fermerBouttonText: {
  color: "white",
  fontSize: 16,
  textAlign: "center",
},

addButton: {
  margin: 10,
  
},
boutonModalAjouter: {
  backgroundColor: "#fec48d",
  paddingVertical: 3,
  paddingHorizontal: 30,
  borderWidth: 1,
  borderRadius: 15,
  borderColor: "white",
  marginTop: 20,
  marginBottom: 10,
  borderColor: "white",
  borderWidth: 1,
  

},
addButtonTitle: {
  color: "white",
  fontSize: 16,
  textAlign: "center",
},
boutonModalFermer: {
  backgroundColor: "rgba(0, 0, 0, 0.6)",
  paddingVertical: 3,
  paddingHorizontal: 30,
  borderWidth: 1,
  borderRadius: 15,
  borderColor: "white",

  marginBottom: 10,
  borderColor: "white",
  borderWidth: 1,
},
cancelButton: {
  margin: 10,
},
cancelButtonTitle: {
  color: "white",
  fontSize: 16,
  textAlign: "center",
},
modalTitrePosition: {
  marginLeft: 25,
  marginRight: 25,
  flexDirection: 'row',
  textAlign: 'center',
  marginBottom: 25,
},
modalTitre: {
  fontSize: 16,
  fontWeight: 'bold',
  paddingTop: 10,
}


});

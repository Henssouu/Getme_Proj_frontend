import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Pressable, Modal, ScrollView } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faRightFromBracket, faCirclePlus, faUser } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { logout } from '../reducers/user';
import { TextInput } from 'react-native-gesture-handler';
import { loadPosts, addPost } from '../reducers/post';
import LastPostScreen from './LastPostScreen';



const HomeScreen = () => {

const user = useSelector((state) => state.user.value);
const dispatch = useDispatch();
const navigation = useNavigation();
const [isModalVisible, setModalVisible] = useState(false);
const [newPost, setNewPost] = useState('');


const handleProfil = () => {
console.log('ok')
}


 

  useEffect(() => {
    if (!user.token) {
      return;
    }

    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/posts/all/${user.token}`)
      .then(response => response.json())
      .then(data => {
        console.log("j'ai fetché", data)
   dispatch(loadPosts(data.data));
      });
  }, []);

  const handleSubmit = () => {
    fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/posts`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: user.token, content: newPost}),
    }).then(response => response.json())
      .then(data => {
        console.log('log2',data)
        if (data.result) {
          const createdPost = { ...data.content, author: user };
          dispatch(addPost(createdPost));
          setNewPost('');
          setModalVisible(false);
        }
      });
  };



  const handleLogout = () => {
    dispatch(logout());
    navigation.navigate('SignIn')
  };


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
<ScrollView>
    <View style={styles.container}>
      
      <View style={styles.icon} >
        <Pressable onPress={handleProfil}>
      <FontAwesomeIcon  icon={faUser} size={24} style={styles.faUser} />
      </Pressable>

      <Pressable onPress={handleLogout} style={styles.logoutButton}>
        <FontAwesomeIcon icon={faRightFromBracket} size={24} color="black" />
        
        
      </Pressable>
     
      </View>
      <View><LastPostScreen /></View>
      <View style={styles.plusButtonContainer}>
        <Pressable onPress={toggleModal} style={styles.plusButton}>
          <FontAwesomeIcon icon={faCirclePlus} size={40} style={styles.faCirclePlus} />
        </Pressable>
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={toggleModal}
      >

        <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal} style={styles.cancelButton}>
              <Text style={styles.cancelButtonText}>Annuler</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sendButton}>
                <Text onPress={handleSubmit} style={styles.sendButtonText}>Envoyer</Text>
              </TouchableOpacity>
          </View>
          <View style={styles.modalContent}>
            <TextInput
              style={styles.postInput}
              placeholder="Quoi de neuf ?"
              maxLength={280}
              multiline={true}
              blurOnSubmit={true}
              onChangeText={(value) => setNewPost(value)}
              value={newPost}
            />
           <View style={styles.contentCompteur}>
            <Text>{newPost.length}/280</Text>
          </View>
          </View>
       
      </Modal>
     
    </View>
    </ScrollView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
 

  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
 
  },
  logoutButtonText: {
    fontSize: 18,
    textAlign: 'center',
    
  },
  plusButtonContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'flex',
    paddingRight: '10%',
    marginBottom: '25%',
 
    
  },
  plusButton: {
    backgroundColor: 'white',
    borderRadius: 50,
 
    
    
  },
  faCirclePlus: {
  color: "#fec48d", 
  },
  icon : {
    marginTop: '10%',
    paddingTop: '2%',
    flexDirection: 'row',
    alignItems: 'start',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    paddingVertical: '4%',
    borderWidth: 1,


  },
    modalContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingTop: '12%',
      backgroundColor: 'white',
   
      
  },
  modalContent: {
    backgroundColor: 'white',
    paddingLeft: '8%',
    paddingRight: '8%',
    paddingTop: '2%',
    height: '100%',
  },
  postInput: {
    fontSize: 18,
    padding: '1%',
    marginBottom: '2%',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    height: '20%',
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 20,
    marginLeft: '8%',
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  sendButton: {
    backgroundColor: '#1DA1F2',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 10,
    marginRight: '8%',
  },
  sendButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  contentCompteur: {
    flex: 1,
  
  },
});

export default HomeScreen;

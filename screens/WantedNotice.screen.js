import { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { createAnimalForm } from '../reducers/map';

export default function WantedNoticeScreen({ navigation }) {
  const dispatch = useDispatch();

  const [nickname, setNickname] = useState('');

  const handleSubmit = () => {
    dispatch(createAnimalForm(animalForm));
    navigation.navigate('MapScreen');
  };

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image style={styles.image} source={require('../assets/wanted.png')} />
      <Text style={styles.title}>Ask for help with the comunity</Text>

      <TextInput placeholder="Nickname" onChangeText={(value) => setNickname(value)} value={nickname} style={styles.input} />
      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Post your wanted notice</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: '50%',
  },
  title: {
    width: '80%',
    fontSize: 38,
    fontWeight: '600',
  },
  input: {
    width: '80%',
    marginTop: 25,
    borderBottomColor: '#ec6e5b',
    borderBottomWidth: 1,
    fontSize: 18,
  },
  button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '80%',
    marginTop: 30,
    backgroundColor: '#ec6e5b',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});

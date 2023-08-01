import React, { useEffect, useState } from 'react';
import { View, Text } from 'react-native';
import { useSelector } from 'react-redux';

const ProfilUserInfoScreen = () => {
  const userToken = useSelector((state) => state.user.user?.token);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (userToken) {
      fetch(`http://${process.env.EXPO_PUBLIC_IP_STRING}:3000/users/${user.token}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserData(data);
        })
        .catch((error) => {
          console.log('Error fetching user data:', error);
        });
    }
  }, [userToken]);

  return (
    <View>
      {userData ? (
        <View>
          <Text>User Name: {userData.nom} {userData.prenom}</Text>
          <Text>Pseudo: {userData.pseudo}</Text>
          <Text>Adresse: {userData.adresse}</Text>
          {/* Display other user information as needed */}
        </View>
      ) : (
        <Text>Loading...</Text>
      )}
    </View>
  );
};

export default ProfilUserInfoScreen;

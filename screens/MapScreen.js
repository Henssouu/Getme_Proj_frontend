import React, { useState, useEffect } from "react";
import { View, StyleSheet, Text, TextInput, Button } from "react-native";
import MapView, { Marker } from "react-native-maps";

const AvisDeRechercheScreen = () => {
  const [region, setRegion] = useState({
    latitude: 37.78825, // Initial latitude (example: Paris)
    longitude: -122.4324, // Initial longitude (example: Paris)
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  });
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    // For simplicity, let's assume you have a function that retrieves the user's location.
    // You can use any geolocation library or API to get the user's location.
    getUserLocation();
  }, []);

  const getUserLocation = () => {
    // Replace this with your actual code to get the user's location.
    // For demonstration purposes, we're setting a default user location here.
    const userLocation = {
      latitude: 37.78825,
      longitude: -122.4324,
    };
    setUserLocation(userLocation);
    setRegion({ ...region, latitude: userLocation.latitude, longitude: userLocation.longitude });
  };

  const handleSearch = () => {
    // Replace this with your actual code to search for users based on the searchQuery.
    // For demonstration purposes, we're setting a default search result here.
    const searchResults = [
      { id: 1, name: "John Doe", latitude: 37.78825, longitude: -122.4324 },
      { id: 2, name: "Jane Doe", latitude: 37.788, longitude: -122.431 },
    ];
    setSearchResults(searchResults);
  };

  return (
    <View style={styles.container}>
      <View style={styles.mapContainer}>
        {userLocation ? (
          <MapView
            style={styles.map}
            region={region}
            onRegionChangeComplete={setRegion}
            showsUserLocation={true}
            followsUserLocation={true}
          >
            <Marker coordinate={userLocation} title="Your Location" />
            {searchResults.map((result) => (
              <Marker
                key={result.id}
                coordinate={{ latitude: result.latitude, longitude: result.longitude }}
                title={result.name}
              />
            ))}
          </MapView>
        ) : (
          <Text>Loading...</Text>
        )}
      </View>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search for users..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <Button title="Search" onPress={handleSearch} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  mapContainer: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  searchContainer: {
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#f0f0f0",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
});

export default AvisDeRechercheScreen;

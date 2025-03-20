import React, { useState, useEffect } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import HouseItemModal from "../components/HouseItemMap";
import Modal from "react-native-modal";

export default function MapScreen() {
  const [houses, setHouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "houses"));
        const houseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHouses(houseList);
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, []);

  // Filter houses based on searchQuery
  const filteredHouses = houses.filter((house) =>
    house.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.input}
          placeholder="Search for a house..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor="#666"
        />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: houses.length > 0 ? houses[0].latitude : 43.676,
          longitude: houses.length > 0 ? houses[0].longitude : -79.4107,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        {filteredHouses.map((house) =>
          house.latitude && house.longitude ? (
            <Marker
              key={house.id}
              coordinate={{
                latitude: house.latitude,
                longitude: house.longitude,
              }}
              title={house.address}
              description={`$${house.price}`}
              onPress={() => setSelectedHouse(house)}
            />
          ) : null
        )}
      </MapView>

      {/* Bottom Sheet Modal */}
      <Modal
        isVisible={!!selectedHouse}
        onBackdropPress={() => setSelectedHouse(null)}
        style={styles.bottomModal}
      >
        <HouseItemModal house={selectedHouse} onClose={() => setSelectedHouse(null)} />
      </Modal>      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    position: "absolute",
    top: 40,
    left: 20,
    right: 20,
    zIndex: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 45,
    fontSize: 16,
    color: "#333",
  },
  map: {
    flex: 1,
  },
  bottomModal: {
    justifyContent: "flex-end",
    margin: 0, // Ensures modal starts at the bottom
  },
});


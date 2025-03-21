import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, TextInput } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import HouseItemModal from "../components/HouseItemMap";
import Modal from "react-native-modal";
import { useUser } from "../UserContext"; // Import user context
import { useFocusEffect } from "@react-navigation/native"; // useFocusEffect for fetching when screen is focused

export default function MapScreen() {
  const [houses, setHouses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedHouse, setSelectedHouse] = useState(null);
  const [favorites, setFavorites] = useState(new Set());

  const { username } = useUser(); // Get logged-in user email

  // Fetch houses from Firestore
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

  // Fetch user's favorite houses from Firestore
  const fetchUserFavorites = useCallback(async () => {
    if (!username) return; // Exit if user is not logged in

    const buyersRef = collection(db, "buyers");
    const q = query(buyersRef, where("email", "==", username));

    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const userData = userDoc.data();
      setFavorites(new Set(userData.favoriteHouseIds || [])); // Ensure it's a Set
    }
  }, [username]);

  useFocusEffect(
    useCallback(() => {
      fetchUserFavorites(); // Fetch latest favorites whenever screen gains focus
    }, [])
  );
  

  const toggleFavorite = async (id) => {
    try {
      // Refetch favorites to ensure latest data
      await fetchUserFavorites();
  
      setFavorites((prevFavorites) => {
        const updatedFavorites = new Set(prevFavorites);
        if (updatedFavorites.has(id)) {
          updatedFavorites.delete(id);
        } else {
          updatedFavorites.add(id);
        }
  
        // Update Firestore after modifying the favorites list
        updateFirestoreFavorites(Array.from(updatedFavorites));
  
        return new Set(updatedFavorites);
      });
    } catch (error) {
      console.error("Error updating favorite house:", error);
    }
  };
  
  
  // Separate function to update Firestore
  const updateFirestoreFavorites = async (updatedFavorites) => {
    try {
      const buyersRef = collection(db, "buyers");
      const q = query(buyersRef, where("email", "==", username));
      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, {
          favoriteHouseIds: updatedFavorites, // Ensures latest state is used
        });
      } else {
        console.error("User not found in buyers collection.");
      }
    } catch (error) {
      console.error("Error updating favorite house:", error);
    }
  };
  
  

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
              pinColor={favorites.has(house.id) ? "gold" : "red"} // Highlight favorites
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
        <HouseItemModal
          house={selectedHouse}
          isFavorite={favorites.has(selectedHouse?.id)}
          toggleFavorite={toggleFavorite}
          onClose={() => setSelectedHouse(null)}
        />
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

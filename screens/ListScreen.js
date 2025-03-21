import React, { useState, useCallback, useEffect } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs, query, where, updateDoc } from "firebase/firestore";
import HouseItem from "../components/HouseItem";
import { useNavigation } from "@react-navigation/native";
import { useUser } from "../UserContext"; // Custom hook for user context
import { useFocusEffect } from "@react-navigation/native"; // useFocusEffect for fetching when screen is focused

export default function ListScreen({ navigation }) {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");
  const { username } = useUser(); // Get the logged-in user's email

  // Reset favorites when username changes (user logs out)
  useEffect(() => {
    if (!username) {
      setFavorites(new Set()); // Clear favorites when user logs out
    }
  }, [username]); // This effect will run when username changes

  // Fetch houses from Firestore
  const fetchHouses = useCallback(async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "houses"));
      const houseList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setHouses(houseList);
      setFilteredHouses(houseList);
    } catch (error) {
      console.error("Error fetching houses:", error);
    }
  }, []);

  // Fetch the user's favorite house IDs when the screen is focused
  const fetchUserFavorites = useCallback(async () => {
    if (!username) return; // If no username is found, exit early

    const buyersRef = collection(db, "buyers");
    const q = query(buyersRef, where("email", "==", username)); // Find the user by email
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) return;

    const userDoc = querySnapshot.docs[0]; // Assuming there is only one matching user
    const userData = userDoc.data();

    // Make sure favoriteHouseIds is an array (even if it's null or undefined)
    const userFavorites = new Set(userData.favoriteHouseIds || []);
    setFavorites(userFavorites);
  }, [username]);

  // Trigger fetch when screen is focused
  useFocusEffect(
    useCallback(() => {
      fetchHouses();
      fetchUserFavorites();
    }, [fetchHouses, fetchUserFavorites])
  );

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = houses.filter((house) =>
      house.address.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHouses(filtered);
  };

  const toggleFavorite = async (id) => {
    try {
      const newFavorites = new Set(favorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id); // Remove from favorites
      } else {
        newFavorites.add(id); // Add to favorites
      }

      setFavorites(newFavorites); // Update local state

      // Query the 'buyers' collection to find the document with the matching email
      const buyersRef = collection(db, "buyers");
      const q = query(buyersRef, where("email", "==", username)); // Find the user by email

      const querySnapshot = await getDocs(q);
      if (!querySnapshot.empty) {
        // Assuming there is only one user document with the given email
        const userDocRef = querySnapshot.docs[0].ref; // Get the reference to the document

        // Update the favoriteHouseIds field in the user's document
        await updateDoc(userDocRef, {
          favoriteHouseIds: Array.from(newFavorites),
        });
      } else {
        console.error("User not found in buyers collection.");
      }
    } catch (error) {
      console.error("Error updating favorite house:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Favorite Houses</Text>

      <TextInput
        style={styles.input}
        placeholder="Search for a house..."
        value={searchQuery}
        onChangeText={handleSearch}
      />

      {filteredHouses.length === 0 ? (
        <Text>No houses found</Text>
      ) : (
        <FlatList
          data={filteredHouses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HouseItem
              item={item}
              toggleFavorite={toggleFavorite}
              isFavorite={favorites.has(item.id)} // Check if the house is a favorite
              onPress={() => navigation.navigate("HouseDetail", { house: item })}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 20,
    paddingLeft: 10,
  },
});

import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet } from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import HouseItem from "../components/HouseItem"; // Import HouseItem component

export default function ListScreen() {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [favorites, setFavorites] = useState(new Set());
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchHouses = async () => {
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
    };

    fetchHouses();
  }, []);

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filtered = houses.filter((house) =>
      house.address.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredHouses(filtered);
  };

  const toggleFavorite = (id) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(id)) {
        newFavorites.delete(id);
      } else {
        newFavorites.add(id);
      }
      return newFavorites;
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>🏠 Favorite Houses</Text>
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
              isFavorite={favorites.has(item.id)}
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

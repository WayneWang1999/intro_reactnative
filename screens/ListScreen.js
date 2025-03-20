import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import Carousel from "react-native-reanimated-carousel"; // For image swap
import { AntDesign } from "@expo/vector-icons"; // For heart icons

const { width } = Dimensions.get("window");

export default function ListScreen() {
  const [houses, setHouses] = useState([]);
  const [filteredHouses, setFilteredHouses] = useState([]);
  const [isFavorite, setIsFavorite] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (text) => {
    setSearchQuery(text);
    // Filter houses based on the search query
    const filtered = houses.filter((house) =>
      house.address.toLowerCase().includes(text.toLowerCase()) // Filter by address
    );
    setFilteredHouses(filtered);
  };

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "houses"));
        const houseList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setHouses(houseList);
        setFilteredHouses(houseList); // Initialize filteredHouses with all houses
      } catch (error) {
        console.error("Error fetching houses:", error);
      }
    };

    fetchHouses();
  }, []);

  const toggleFavorite = async () => {
    // Add your favorite toggle logic here
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
            <View style={styles.card}>
              {item.imageUrl && item.imageUrl.length > 0 ? (
                <Carousel
                  loop
                  width={width - 32}
                  height={200}
                  autoPlay
                  autoPlayInterval={3000}
                  data={item.imageUrl} // Array of image URLs
                  renderItem={({ item }) => (
                    <Image
                      source={{ uri: item }}
                      style={styles.carouselImage}
                    />
                  )}
                />
              ) : (
                <Text>No Images Available</Text>
              )}

              {/* Wrap heart and price in a row */}
              <View style={styles.priceHeartRow}>
                <Text style={styles.price}>${item.price}</Text>
                <TouchableOpacity
                  onPress={toggleFavorite}
                  style={styles.heartButton}
                >
                  <AntDesign
                    name={isFavorite ? "heart" : "hearto"}
                    size={28}
                    color="red"
                  />
                </TouchableOpacity>
              </View>

              <Text style={styles.address}>{item.address}</Text>
              <Text style={styles.details}>
                Bedrooms: {item.bedrooms} | Bathrooms: {item.bathrooms} Area:{" "}
                {item.area}
              </Text>
              <Text style={styles.details}>{item.createTime}</Text>
            </View>
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
  card: {
    backgroundColor: "#fff",
    padding: 16,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 3,
    alignItems: "center",
  },
  carouselImage: {
    width: "100%",
    height: 200,
    borderRadius: 8,
    resizeMode: "cover",
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  details: {
    fontSize: 14,
    color: "gray",
    marginTop: 4,
    alignSelf: "flex-start",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  heartButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  priceHeartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
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

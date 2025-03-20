import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ActivityIndicator, FlatList } from "react-native";
import { useUser } from "../UserContext"; // Import the custom hook
import { getFirestore, collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import HouseItem from "../components/HouseItem"; // Import HouseItem component
import { useNavigation } from '@react-navigation/native'; // Import navigation hook

export default function FavoriteScreen() {
  const { username } = useUser(); // Get the logged-in user's email
  const [favoriteHouses, setFavoriteHouses] = useState([]); // Store house details
  const [loading, setLoading] = useState(true);
  const db = getFirestore(); // Initialize Firestore
  const navigation = useNavigation(); // For navigation

  useEffect(() => {
    if (!username) {
      setFavoriteHouses([]);  // Clear favorite houses if no user is logged in
      setLoading(false);      // Stop loading when username is null
      return;
    }

    const fetchFavorites = async () => {
      try {
        const buyersRef = collection(db, "buyers");
        const q = query(buyersRef, where("email", "==", username)); // Find the user by email
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
          const userData = querySnapshot.docs[0].data();
          const favoriteHouseIds = userData.favoriteHouseIds || [];

          if (favoriteHouseIds.length > 0) {
            const housePromises = favoriteHouseIds.map(async (houseId) => {
              const houseDocRef = doc(db, "houses", houseId);
              const houseDoc = await getDoc(houseDocRef);
              return houseDoc.exists() ? { id: houseDoc.id, ...houseDoc.data() } : null;
            });

            const houses = (await Promise.all(housePromises)).filter((house) => house !== null);
            setFavoriteHouses(houses);
          } else {
            setFavoriteHouses([]);
          }
        } else {
          setFavoriteHouses([]);
        }
      } catch (error) {
        console.error("Error fetching favorite houses:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFavorites();
  }, [username]); // This hook will run when `username` changes

  return (
    <View style={styles.container}>
      <Text style={styles.greeting}>Welcome, {username || "Guest"}!</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#007BFF" />
      ) : favoriteHouses.length > 0 ? (
        <FlatList
          data={favoriteHouses}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <HouseItem
              item={item}
              onPress={() => navigation.navigate("HouseDetail", { house: item })} // Navigate to house detail
            />
          )}
        />
      ) : (
        <Text style={styles.noFavorites}>No favorite houses found.</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
    backgroundColor: "#f9f9f9",
  },
  greeting: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  noFavorites: {
    fontSize: 18,
    color: "gray",
  },
});

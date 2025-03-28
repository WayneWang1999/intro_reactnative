import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { useUser } from "../UserContext"; // Import UserContext
import { useNavigation } from "@react-navigation/native"; // For navigation
import { getAuth, signOut } from "firebase/auth"; // Import Firebase auth

export default function ProfileScreen() {
  const { username, setUsername } = useUser(); // Get username and setUsername from context
  const navigation = useNavigation();
  const auth = getAuth(); // Get Firebase auth instance

  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out from Firebase
      setUsername(null); // Reset username in context
      navigation.navigate("AccountScreen"); // Navigate to the login screen
    } catch (error) {
      Alert.alert("Logout Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
      <Text style={styles.subHeader}>You're logged in.</Text>
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f7f7f7",
    padding: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "700",
    color: "#333",
    marginBottom: 10,
  },
  subHeader: {
    fontSize: 18,
    color: "#555",
    marginBottom: 30,
  },
  logoutButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  logoutButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
    textAlign: "center",
  },
});

import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from "react-native";
// import { auth } from '../firebaseConfig';  // Import the Firebase auth instance
import {
  getAuth,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Firebase Auth method
import { useUser } from "../UserContext";

import { useNavigation } from "@react-navigation/native"; // Import useNavigation hook

export default function AccountScreen() {
  const [email, setEmail] = useState("wayne@gmail.com");
  const [password, setPassword] = useState("111111");
  const { setUsername } = useUser(); // Get setUsername from the context
  const navigation = useNavigation(); // Get navigation object from the hook
  const auth = getAuth(); // Get Firebase auth instance

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // After successful login, set the email in the UserContext
      setUsername(email);

      Alert.alert("Login Successful", `Welcome, ${email}!`);
      navigation.navigate("Profile");
    } catch (error) {
      Alert.alert("Login Failed", error.message);
    }
  };

  const signUp = async () => {
    // Add the sign-up functionality here
    try {
      navigation.navigate("SignUp");
    } catch (error) {
      Alert.alert("Sign-Up Failed", error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Enter your email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Enter your password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCapitalize="none"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>Don't have an account?</Text>
        <TouchableOpacity onPress={signUp}>
          <Text style={styles.signupLink}>Create an account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30,
    backgroundColor: "#f7f7f7",
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 40,
    color: "#333",
  },
  input: {
    width: "100%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
  },
  button: {
    width: "100%",
    padding: 15,
    backgroundColor: "#007BFF",
    borderRadius: 8,
    marginBottom: 20,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    fontSize: 16,
    color: "#777",
  },
  signupLink: {
    fontSize: 16,
    color: "#007BFF",
    fontWeight: "bold",
    marginLeft: 5,
  },
});

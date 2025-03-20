import React from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SignUpScreen() {
  const navigation = useNavigation();

   const signUp = async () => {
      // Add the sign-up functionality here
      try {
  
       
        // Create a new user with email and password
        // await createUserWithEmailAndPassword(auth, email, password);
  
        // // After successful sign-up, set the email in the UserContext
        // setUsername(email);
  
        // Alert.alert('Sign-Up Successful', `Welcome, ${email}!`);
        // navigation.navigate('Favorite');
      } catch (error) {
        Alert.alert('Sign-Up Failed', error.message);
      }
    };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Sign Up</Text>

      <TextInput style={styles.input} placeholder="Email" />
      <TextInput style={styles.input} placeholder="Password" secureTextEntry />
      <TextInput style={styles.input} placeholder="Confirm Password" secureTextEntry />

      <Button title="Sign Up" onPress={() => alert('Account Created!')} />

      <Button title="Back to Login" onPress={() => navigation.goBack()} color="red" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  header: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
  input: { width: '80%', borderWidth: 1, padding: 10, marginBottom: 10 },
});

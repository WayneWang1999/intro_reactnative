import React, { useContext } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../UserContext';  // Import the custom hook

export default function FavoriteScreen() {
  const { username } = useUser();  // Access the username from the context

  return (
    <View style={styles.container}>
      {/* Ensure everything inside Text is properly wrapped */}
      <Text style={styles.greeting}>
        Welcome, {username || 'Guest'}!
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  greeting: {
    fontSize: 20,  // Optional styling
  },
});

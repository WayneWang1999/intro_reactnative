import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../UserContext';  // Import UserContext to access username

export default function ProfileScreen() {
  const { username } = useUser();  // Get username from context

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome, {username}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f7f7f7',
  },
  header: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
});

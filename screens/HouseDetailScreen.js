import React from 'react';
import { View, Text, StyleSheet } from 'react-native';


export default function HouseDetailScreen() {


  return (
    <View style={styles.container}>
      <Text style={styles.header}>Welcome!</Text>
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

import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";

const { width } = Dimensions.get("window");

export default function HouseDetailScreen({ route }) {
  // Retrieve the house data passed via the `route` prop
  const { house } = route.params;

  return (
    <ScrollView style={styles.container}>
      {/* House Images */}
      {house.imageUrl && house.imageUrl.length > 0 ? (
        <Carousel
          loop
          width={width - 32}
          height={200}
          autoPlay
          autoPlayInterval={3000}
          data={house.imageUrl}
          renderItem={({ item }) => ( // Fixed: Use item instead of house
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
        />
      ) : (
        <Text>No Images Available</Text>
      )}

      {/* House Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.houseTitle}>{house.address}</Text>
        <Text style={styles.price}>${house.price}</Text>
        <Text style={styles.description}>{house.description}</Text>

        {/* House Features */}
        <View style={styles.featuresContainer}>
          <Text style={styles.featureText}>
            {house.bedrooms} Bedrooms | {house.bathrooms} Bathrooms | {house.area} sqft
          </Text>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  carouselImage: { // Added missing style
    width: "100%",
    height: 200,
    borderRadius: 10,
    resizeMode: "cover",
  },
  detailsContainer: {
    paddingHorizontal: 10,
  },
  houseTitle: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 10,
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#007BFF",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 20,
  },
  featuresContainer: {
    marginTop: 20,
  },
  featureText: {
    fontSize: 16,
    color: "gray",
  },
});


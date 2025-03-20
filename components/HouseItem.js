import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

const HouseItem = ({ item, toggleFavorite, isFavorite }) => {
  return (
    <View style={styles.card}>
      {/* Carousel for images */}
      {item.imageUrl && item.imageUrl.length > 0 ? (
        <Carousel
          loop
          width={width - 32}
          height={200}
          autoPlay
          autoPlayInterval={3000}
          data={item.imageUrl}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={styles.carouselImage} />
          )}
        />
      ) : (
        <Text>No Images Available</Text>
      )}

      {/* Price and Favorite Button */}
      <View style={styles.priceHeartRow}>
        <Text style={styles.price}>${item.price}</Text>
        <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
          <AntDesign name={isFavorite ? "heart" : "hearto"} size={28} color="red" />
        </TouchableOpacity>
      </View>

      <Text style={styles.address}>{item.address}</Text>
      <Text style={styles.details}>
        Bedrooms: {item.bedrooms} | Bathrooms: {item.bathrooms} | Area: {item.area}
      </Text>
      <Text style={styles.details}>{item.createTime}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
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
});

export default HouseItem;

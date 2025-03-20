import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Carousel from "react-native-reanimated-carousel";
import { AntDesign } from "@expo/vector-icons";

const { width, height } = Dimensions.get("window");

export default function HouseItemModal({ house, onClose ,toggleFavorite, isFavorite}) {
  if (!house) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.bottomSheet}>
        {/* Close button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* House Images */}
        {house.imageUrl && house.imageUrl.length > 0 ? (
          <Carousel
            loop
            width={width - 60}
            height={200}
            autoPlay
            autoPlayInterval={3000}
            data={house.imageUrl}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        ) : (
          <Text>No Images Available</Text>
        )}

   
        {/* </Text>Price and Favorite Button */}
              <View style={styles.priceHeartRow}>
                <Text style={styles.price}>${house.price}</Text>
                <TouchableOpacity onPress={() => toggleFavorite(item.id)} style={styles.heartButton}>
                  <AntDesign name={isFavorite ? "heart" : "hearto"} size={28} color="red" />
                </TouchableOpacity>
              </View>
        
              <Text style={styles.address}>{house.address}</Text>
              <Text style={styles.details}>
                Bedrooms: {house.bedrooms} | Bathrooms: {house.bathrooms} | Area: {house.area}
              </Text>
              <Text style={styles.details}>{house.createTime}</Text>


      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end", // Push to bottom
    backgroundColor: "rgba(0,0,0,0.5)", // Transparent background
  },
  bottomSheet: {
    width: "100%",
    height: height * 0.4, // Adjust height as needed
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 16,
    alignItems: "center",
    elevation: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
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

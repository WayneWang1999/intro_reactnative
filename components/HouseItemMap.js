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
import { useNavigation } from "@react-navigation/native";

const { width, height } = Dimensions.get("window");

export default function HouseItemMap({ house, onClose, toggleFavorite, isFavorite }) {
  const navigation = useNavigation();

  if (!house) return null;

  return (
    <View style={styles.modalContainer}>
      <View style={styles.bottomSheet}>
        {/* Close Button */}
        <TouchableOpacity onPress={onClose} style={styles.closeButton}>
          <AntDesign name="close" size={24} color="black" />
        </TouchableOpacity>

        {/* House Images */}
        {house.imageUrl && house.imageUrl.length > 0 ? (
          <Carousel
            loop
            width={width - 40}
            height={200}
            autoPlay
            autoPlayInterval={3000}
            data={house.imageUrl}
            renderItem={({ item }) => (
              <Image source={{ uri: item }} style={styles.image} />
            )}
          />
        ) : (
          <Text style={styles.noImageText}>No Images Available</Text>
        )}

        {/* Price and Favorite Button */}
        <View style={styles.priceHeartRow}>
          <Text style={styles.price}>${house.price}</Text>
          <TouchableOpacity onPress={() => toggleFavorite(house.id)} style={styles.heartButton}>
            <AntDesign name={isFavorite ? "heart" : "hearto"} size={28} color="red" />
          </TouchableOpacity>
        </View>

        {/* House Details */}
        <Text style={styles.address}>{house.address}</Text>
        <Text style={styles.details}>
          Bedrooms: {house.bedrooms} | Bathrooms: {house.bathrooms} | Area: {house.area} sqft
        </Text>

        {/* View Details Button */}
        <TouchableOpacity
          style={styles.detailsButton}
          onPress={() => {
            onClose(); // Close modal before navigating
            navigation.navigate("HouseDetail", { house });
          }}
        >
          <Text style={styles.detailsButtonText}>View Details</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  bottomSheet: {
    width: "100%",
    height: height * 0.5,
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
    right: 1,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
  },
  noImageText: {
    textAlign: "center",
    fontSize: 16,
    color: "gray",
    marginVertical: 10,
  },
  address: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
    alignSelf: "flex-start",
  },
  priceHeartRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
  },
  heartButton: {
    padding: 5,
  },
  detailsButton: {
    backgroundColor: "#007BFF",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10,
  },
  detailsButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});


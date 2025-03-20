import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Expo icons, change if using another library

import { UserProvider, useUser } from "./UserContext"; // Import your custom hook

import ListScreen from "./screens/ListScreen";
import FavoriteScreen from "./screens/FavoriteScreen";
import AccountScreen from "./screens/AccountScreen";
import MapScreen from "./screens/MapScreen";
import ProfileScreen from "./screens/ProfileScreen";

import AccountStackNavigator from "./screens/AccountStackNavigator"; // Import the Stack

const Tab = createBottomTabNavigator();

export default function App() {
  //  const { username } = useUser(); // Get user data from context (username)

  // Determine if the user is logged in based on the username
  // const isLoggedIn = username !== null;

  return (
    <UserProvider>
      <NavigationContainer>
        <Tab.Navigator
          screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;

              if (route.name === "List") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "Map") {
                iconName = focused ? "map" : "map-outline";
              } else if (route.name === "Favorite") {
                iconName = focused ? "heart" : "heart-outline";
              } else if (route.name === "Account") {
                iconName = focused ? "person" : "person-outline";
              } else if (route.name === "Profile") {
                iconName = focused ? "person-circle" : "person-circle-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Map" component={MapScreen} />
          <Tab.Screen name="List" component={ListScreen} />
          <Tab.Screen name="Favorite" component={FavoriteScreen} />
          <Tab.Screen name="Account" component={AccountStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

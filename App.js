import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Expo icons, change if using another library

import { UserProvider, useUser } from "./UserContext"; // Import your custom hook

// Import the Stack
import AccountStackNavigator from "./screens/AccountStackNavigator";
import ListStackNavigator from "./screens/ListStackNavigator";
import MapStackNavigator from "./screens/MapStackNavigator";
import FavoriteStackNavigator from "./screens/FavoriteStackNavigator";

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
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="Map" component={MapStackNavigator} />
          <Tab.Screen name="List" component={ListStackNavigator} />
          <Tab.Screen name="Favorite" component={FavoriteStackNavigator} />
          <Tab.Screen name="Account" component={AccountStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

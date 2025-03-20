import React, { useContext } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons"; // Expo icons, change if using another library

import { UserProvider, useUser } from "./UserContext"; // Import your custom hook

// import ListScreen from "./screens/ListScreen";
// import FavoriteScreen from "./screens/FavoriteScreen";

// import MapScreen from "./screens/MapScreen";

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
              if (route.name === "ListStack") {
                iconName = focused ? "list" : "list-outline";
              } else if (route.name === "MapStack") {
                iconName = focused ? "map" : "map-outline";
              } else if (route.name === "FavoriteStack") {
                iconName = focused ? "heart" : "heart-outline";
              } else if (route.name === "AccountStack") {
                iconName = focused ? "person" : "person-outline";
              }

              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: "blue",
            tabBarInactiveTintColor: "gray",
            headerShown: false,
          })}
        >
          <Tab.Screen name="MapStack" component={MapStackNavigator} />
          <Tab.Screen name="ListStack" component={ListStackNavigator} />
          <Tab.Screen name="FavoriteStack" component={FavoriteStackNavigator} />
          <Tab.Screen name="AccountStack" component={AccountStackNavigator} />
        </Tab.Navigator>
      </NavigationContainer>
    </UserProvider>
  );
}

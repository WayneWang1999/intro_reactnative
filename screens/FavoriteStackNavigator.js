import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import FavoriteScreen from './FavoriteScreen';
import HouseDetailScreen from './HouseDetailScreen';



const Stack = createStackNavigator();

export default function FavoriteStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Favorite" component={FavoriteScreen} />
      <Stack.Screen name="HouseDetail" component={HouseDetailScreen} />


    </Stack.Navigator>
  );
}
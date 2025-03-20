import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ListScreen from './ListScreen';
import HouseDetailScreen from './HouseDetailScreen';
import FilterScreen from './FilterScreen';


const Stack = createStackNavigator();

export default function ListStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="List" component={ListScreen} />
      <Stack.Screen name="HouseDetail" component={HouseDetailScreen} />
      <Stack.Screen name="Filter" component={FilterScreen}/>

    </Stack.Navigator>
  );
}
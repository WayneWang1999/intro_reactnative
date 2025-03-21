import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import MapScreen from './MapScreen';
import HouseDetailScreen from './HouseDetailScreen';
import FilterScreen from './FilterScreen';


const Stack = createStackNavigator();

export default function MapStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="MapScreen" component={MapScreen} />
       <Stack.Screen 
           name="HouseDetail" 
           component={HouseDetailScreen} 
           options={{ headerShown: true }} 
         />
      <Stack.Screen name="Filter" component={FilterScreen}/>

    </Stack.Navigator>
  );
}
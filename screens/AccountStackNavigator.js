import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AccountScreen from './AccountScreen';
import SignUpScreen from './SignUpScreen';
import ProfileScreen from './ProfileScreen';


const Stack = createStackNavigator();

export default function AccountStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Account" component={AccountScreen} />
      <Stack.Screen name="SignUp" component={SignUpScreen} />
      <Stack.Screen name="Profile" component={ProfileScreen}/>
    </Stack.Navigator>
  );
}
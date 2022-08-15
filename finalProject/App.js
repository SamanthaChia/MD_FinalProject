import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';  
import MainRoot from './src/pages/MainRoot';
import MovieDetails from './src/pages/MovieDetails';
import ThemeContextProvider from './src/contexts/ThemeContext';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <ThemeContextProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{
          headerShown:false,
        }}>
          <Stack.Screen
            name="MainRoot"
            component={MainRoot}
            options={{ title: 'MainRoot' }}
          />
          <Stack.Screen
            name="MovieDetails"
            component={MovieDetails}
            options={{ title: 'MovieDetails' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContextProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Constants from 'expo-constants';
import Home from './Home';
import Favourites from './Favourites';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

class MainRoot extends Component{
    render() {
        return(
            <Tab.Navigator 
                screenOptions = {{
                    tabBarActiveTintColor: "#84DCC6",
                    tabBarInactiveTintColor: "#95A3B3",
                    headerShown: false,
                }}
                initialRouteName = "Home"
            >
                <Tab.Screen
                    options={{
                        tabBarLabel: "Home",
                        tabBarIcon:({ color, size }) => (
                            <MaterialCommunityIcons name="home" color={color} size={size} />
                        ),
                    }}
                    name="Home"
                    component={Home}
                    />

                <Tab.Screen
                    options={{
                        tabBarLabel: "Favourites",
                        tabBarIcon:({ color, size }) => (
                            <MaterialCommunityIcons name="cards-heart" color={color} size={size} />
                        ),
                    }} 
                    name="Favourites" 
                    component={Favourites}
                />

                <Tab.Screen 
                    options={{
                        tabBarLabel: "Settings",
                        tabBarIcon:({ color, size }) => (
                            <MaterialCommunityIcons name="cog" color={color} size={size} />
                        ),
                    }} 
                name="Settings" 
                component={Settings} 
                />
            </Tab.Navigator>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop: Constants.statusBarHeight,
    },
});

export default MainRoot;
import React, { Component } from 'react';
import { View, Text, StyleSheet, SafeAreaView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Constants from 'expo-constants';
import Home from './Home';
import Favourites from './Favourites';
import Settings from './Settings';

const Tab = createBottomTabNavigator();

class MainRoot extends Component{
    render() {
        return(
            <Tab.Navigator>
                <Tab.Screen name="Home" component={Home} />
                <Tab.Screen name="Favourites" component={Favourites} />
                <Tab.Screen name="Settings" component={Settings} />
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
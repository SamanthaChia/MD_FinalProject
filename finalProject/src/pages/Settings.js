import React, { Component } from 'react';
import { SafeAreaView, View, Text, Switch, StyleSheet } from 'react-native';
import Constants from "expo-constants";

export default class Settings extends Component {
    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <Text>Settings</Text>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
})
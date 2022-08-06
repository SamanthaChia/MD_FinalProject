import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

export default class Favourites extends Component {
    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <Text>Favourites</Text>
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
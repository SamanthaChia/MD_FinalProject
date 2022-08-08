import React from 'react';
import { View, StyleSheet, Text } from 'react-native';
import Constants from 'expo-constants';


function MovieDetails({navigation, route}){
    return(
        <View style={styles.container}>
            {/* Retrieve from navigation, using route parms, and retrieving the 
            params passed into details. */}
            <Text>{route.params.details.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        padding: 5,
        marginTop: Constants.statusBarHeight,
    },
});

export default MovieDetails;
import React from 'react';
import { View, StyleSheet, Text } from 'react-native';

function MovieDetails(props){
    return(
        <View>
            <Text>{props.item.title}</Text>
        </View>
    );
}

export default MovieDetails;
import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';

function NowPlayingMovies(props){

    const navigation = useNavigation();

    return(
        //  pass details for props through navigation, as details.
        <TouchableWithoutFeedback onPress= {() => navigation.navigate('MovieDetails', { details: props.item })}>
            <View style={styles.container}>
                <Image style={styles.poster} source={{uri:"http://image.tmdb.org/t/p/w342/" + props.item.poster_path}} />
                <Text>{props.item.title}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection:"column",
        flexWrap:"wrap",
        marginRight:10,
    },
    poster:{
        borderRadius:10,
        width:166,
        height:255,
        marginBottom:10,
    }
});

export default NowPlayingMovies;
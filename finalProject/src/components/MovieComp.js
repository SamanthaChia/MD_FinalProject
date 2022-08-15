import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback } from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from "../contexts/ThemeContext";

function MovieComp(props){

    const navigation = useNavigation();

    return(
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark} = context;
                return(
                    <TouchableWithoutFeedback onPress= {() => navigation.navigate('MovieDetails', { details: props.item })}>
                        <View style={styles.container}>
                            <Image style={styles.poster} source={{uri:"http://image.tmdb.org/t/p/w342/" + props.item.poster_path}} />
                            <Text style={{color:boolDarkMode ? light.bg : dark.bg}}>{props.item.title}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}
        </ThemeContext.Consumer>
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

export default MovieComp;
import React from "react";
import { View, Text, StyleSheet, Image} from 'react-native';

function MovieComp(props){
    return(
        <View style={styles.container}>
            <Image style={styles.poster} source={{uri:"http://image.tmdb.org/t/p/w342/" + props.item.poster_path}} />
            <Text>{props.item.title}</Text>
        </View>
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
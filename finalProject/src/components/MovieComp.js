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
    },
    poster:{
        width:315,
        height:497,
    }
});

export default MovieComp;
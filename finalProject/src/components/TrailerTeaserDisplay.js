import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";

function TrailerTeaserDisplay(props){
    const deviceWidth = Dimensions.get("window").width;
    var posterWidth = (deviceWidth - 50) /2;

    return(
        <View style={{marginRight: 5}}>
            <Image resizeMode="cover" style={{width: posterWidth, height: 100}} source={{uri:"http://image.tmdb.org/t/p/w342/" + props.poster}} />
            <Text style={styles.trailerName}>{props.trailerdata.name}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    trailerName:{
        flexWrap: "wrap",
        width: 155,
    },
});

export default TrailerTeaserDisplay;
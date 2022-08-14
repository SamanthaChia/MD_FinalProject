import React from "react";
import { View, Text, Image, StyleSheet, Dimensions } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function TrailerTeaserDisplay(props){
    const deviceWidth = Dimensions.get("window").width;
    var posterWidth = (deviceWidth - 50) /2;
    var leftPosition = (posterWidth - 24) /2;
    return(
        <View style={{marginRight: 5}}>
            <MaterialCommunityIcons 
                        style={{
                            position:"absolute", 
                            left: leftPosition,
                            top:38, 
                            zIndex: 1, 
                            }}
                        name="arrow-right-drop-circle"
                        size={24}
                        color={"#fff"}
            />
            <Image resizeMode="cover" style={{width: posterWidth, height: 100, marginBottom: 5}} source={{uri:"http://image.tmdb.org/t/p/w342/" + props.poster}} />
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
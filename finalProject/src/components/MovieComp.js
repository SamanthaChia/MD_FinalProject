import React from "react";
import { View, Text } from 'react-native';

function MovieComp(props){
    return(
        <View>
            <Text>{props.item.title}</Text>
        </View>
    );
}

export default MovieComp;
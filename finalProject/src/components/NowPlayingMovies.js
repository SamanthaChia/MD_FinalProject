import React from "react";
import { View, Text, StyleSheet, Image, TouchableWithoutFeedback, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from "../contexts/ThemeContext";


function NowPlayingMovies(props) {
    const deviceWidth = Dimensions.get("window").width;
    var widthVal = (deviceWidth - 60) / 2;

    const navigation = useNavigation();

    return (
        <ThemeContext.Consumer>
            {(context) => {
                const { boolDarkMode, light, dark } = context;
                return (
                    // pass details for props through navigation, as details.
                    <TouchableWithoutFeedback onPress={() => navigation.navigate('MovieDetails', { details: props.item })}>
                        <View style={styles.container}>
                            <Image style={[styles.poster, { width: widthVal }]} source={{ uri: "http://image.tmdb.org/t/p/w342/" + props.item.poster_path }} />
                            <View style={styles.descriptionBox}>
                                <Text style={{ width: widthVal, color: boolDarkMode ? light.bg : dark.bg }}>{props.item.title}</Text>
                                <Text style={[{ width: widthVal, color: boolDarkMode ? light.bg : dark.bg }, styles.genreText]}>
                                    {props.item.genre.map(
                                        (genre, index) =>
                                            genre + (index < props.item.genre.length - 1 ? ", " : "")
                                    )}
                                </Text>

                                <View style={styles.ratingAvg}>
                                    <MaterialCommunityIcons name="star" size={20} color="#EDD622" />
                                    <Text style={{ fontWeight: "bold", alignSelf: "center", color: boolDarkMode ? light.bg : dark.bg }}>{props.item.vote_average}</Text>
                                    <Text style={{ fontSize: 10, alignSelf: "flex-end", color: boolDarkMode ? light.bg : dark.bg }}> /10</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableWithoutFeedback>
                );
            }}

        </ThemeContext.Consumer>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
    },
    poster: {
        borderRadius: 10,
        height: 255,
        marginBottom: 10,
    },
    descriptionBox: {
        marginLeft: 10,
    },
    genreText: {
        fontSize: 13,
        fontWeight: "200",
        marginTop: 5,
    },
    ratingAvg: {
        flexDirection: "row",
        flexWrap: "wrap",
        marginTop: 5,
    }
});

export default NowPlayingMovies;
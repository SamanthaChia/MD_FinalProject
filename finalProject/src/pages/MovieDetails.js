import React from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GenreLabel from '../components/GenreLabel';

function MovieDetails({navigation, route}){
    const movieDetails = route.params.details;
    
    return(
        <View style={styles.container}>
            <ScrollView>
                <TouchableWithoutFeedback onPress = { () => navigation.pop()}>
                    <MaterialCommunityIcons 
                        style={{
                            position:"absolute", 
                            top:Constants.statusBarHeight + 10, 
                            left:10, 
                            zIndex: 1, 
                            paddingRight: 10,
                            paddingBottom: 20,
                            }}
                        name="arrow-left"
                        size={24}
                        color={"#fff"}
                    />
                </TouchableWithoutFeedback>
                <Image style={styles.poster} resizeMode={"cover"} source={{uri:"http://image.tmdb.org/t/p/w500/" + movieDetails.poster_path}} />
                {/* Retrieve from navigation, using route parms, and retrieving the 
                params passed into details. */}
                <View style={styles.movie_information}>
                    <View style={styles.outer_box}>
                        <View style={styles.title_genre}>
                            <Text>{movieDetails.title}</Text>
                            <Text>{movieDetails.release_date}</Text>
                        </View>
                        <View style={styles.averageScore}>
                            <Text>{movieDetails.vote_average}</Text>
                        </View>
                    </View>
                    <GenreLabel data={movieDetails.genre} />
                    <Text style={styles.header}>Movie Description</Text>
                    <Text>{movieDetails.overview}</Text>
                    <Text style={styles.header}>Cast</Text>
                    <Text style={styles.header}>Movie Trailers & Teasers</Text>
                </View>
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    poster:{
        height:230,
    },
    movie_information:{
        flex: 1,
        backgroundColor: "grey",
        padding: 20,
    },
    outer_box:{
        flex: 1,
        flexDirection: "row",
        justifyContent:"space-between",
        alignItems:"center"
    },
    title_genre:{
        flexWrap:"wrap",
        flexDirection:"column"
    },
    averageScore:{
        width:48,
        height:48,
        backgroundColor:"white",
        borderRadius: 24,
        justifyContent: "center",
        alignItems:"center",
    },
    header:{
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 10,
    }
});

export default MovieDetails;
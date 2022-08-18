import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableWithoutFeedback, Modal } from 'react-native';
import YoutubePlayer from "react-native-youtube-iframe";
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GenreLabel from '../components/GenreLabel';
import TrailerTeaser from '../models/TrailerTeaser';
import TrailerTeaserDisplay from '../components/TrailerTeaserDisplay';
import { ThemeContext } from '../contexts/ThemeContext';
import Cast from '../models/Cast';
import CastComp from '../components/CastComp';

class MovieDetails extends Component {
    // initialise
    baseURL = "https://api.themoviedb.org/3/movie/";
    apiKey = "a8b1207f53708946a64f6fe39f5f4881";
    movieDetails = null;

    constructor(props) {
        super(props);
        this.movieDetails = props.route.params.details;
    }

    state = {
        trailerTeasers: [],
        castDetails: [],
        modalVisible: false,
        activeMovieTrailerKey: "",
    };

    componentDidMount() {
        return (
            fetch(this.baseURL + this.movieDetails.id + '/videos?api_key=' + this.apiKey)
                .then((response) => response.json())
                .then((responseJson) => {
                    var items = [];
                    responseJson.results.map((movie) => {
                        items.push(new TrailerTeaser({
                            key: movie.key,
                            name: movie.name,
                            type: movie.type,
                        })
                        );
                    });

                    this.setState({ trailerTeasers: items });

                    // fetch details for credits
                    fetch(this.baseURL + this.movieDetails.id + '/credits?api_key=' + this.apiKey)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            var cDetails = [];
                            responseJson.cast.map((cast) => {
                                cDetails.push(new Cast({
                                    name: cast.name,
                                    id: cast.id,
                                    profile_path: cast.profile_path == null
                                        ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                                        : "http://image.tmdb.org/t/p/w92" + cast.profile_path,
                                })
                                );
                            });
                            this.setState({ castDetails: cDetails });
                        })
                        .catch((error) => console.error(error))
                }).catch((error) => console.error(error))

        );

    }


    render() {

        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { boolDarkMode, light, dark } = context;
                    return (
                        <View style={[styles.container, { backgroundColor: boolDarkMode ? dark.bg : light.bg }]}>
                            <Modal
                                style={styles.modal}
                                animationType="slide"
                                transparent={true}
                                statusBarTranslucent={true}
                                visible={this.state.modalVisible}
                                onRequestClose={() => {
                                    this.setState({ modalVisible: false });
                                }}
                            >
                                <View style={styles.modalBox}>
                                    <View style={styles.xBtn}>
                                        <TouchableWithoutFeedback onPress={() => this.setState({ modalVisible: false })}>
                                            <MaterialCommunityIcons
                                                name="close"
                                                size={20}
                                                color={"white"}
                                            />
                                        </TouchableWithoutFeedback>
                                    </View>
                                    <View style={{ width: "100%" }}>
                                        <YoutubePlayer
                                            height={300}
                                            play={true}
                                            videoId={this.state.activeMovieTrailerKey}
                                        />
                                    </View>
                                </View>
                            </Modal>
                            <ScrollView>
                                <TouchableWithoutFeedback onPress={() => this.props.navigation.pop()}>
                                    <MaterialCommunityIcons
                                        style={{
                                            position: "absolute",
                                            top: Constants.statusBarHeight + 10,
                                            left: 10,
                                            zIndex: 1,
                                            paddingRight: 10,
                                            paddingBottom: 20,
                                        }}
                                        name="arrow-left"
                                        size={24}
                                        color={"#fff"}
                                    />
                                </TouchableWithoutFeedback>
                                <Image style={styles.poster} resizeMode={"cover"} source={{ uri: "http://image.tmdb.org/t/p/w500/" + this.movieDetails.poster_path }} />
                                {/* Retrieve from navigation, using route parms, and retrieving the 
                            params passed into details. */}
                                <View style={styles.movie_information}>
                                    <View style={styles.outer_box}>
                                        <View style={styles.title_genre}>
                                            <Text style={[styles.title, { color: boolDarkMode ? light.bg : dark.bg }]}>{this.movieDetails.title}</Text>
                                            <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>{this.movieDetails.release_date}</Text>
                                        </View>
                                        <View style={[styles.averageScore, { backgroundColor: boolDarkMode ? light.bg : dark.bg }]}>
                                            <Text style={{ color: boolDarkMode ? dark.bg : light.bg }}>{this.movieDetails.vote_average}</Text>
                                        </View>
                                    </View>
                                    <GenreLabel data={this.movieDetails.genre} />
                                    <Text style={[styles.header, { color: boolDarkMode ? light.bg : dark.bg }]}>Movie Description</Text>
                                    <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>{this.movieDetails.overview}</Text>
                                    <Text style={[styles.header, { color: boolDarkMode ? light.bg : dark.bg }]}>Cast</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {
                                            this.state.castDetails.map((item) => {
                                                return (
                                                    <CastComp key={item.id} item={item} />
                                                )
                                            })
                                        }
                                    </ScrollView>

                                    <Text style={[styles.header, { color: boolDarkMode ? light.bg : dark.bg }]}>Movie Trailers & Teasers</Text>
                                    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} >
                                        {
                                            this.state.trailerTeasers.map((item) => {
                                                return (
                                                    <TrailerTeaserDisplay
                                                        key={item.key}
                                                        onPressFunction={() => this.setState({
                                                            modalVisible: true,
                                                            activeMovieTrailerKey: item.key
                                                        })}
                                                        poster={this.movieDetails.poster_path}
                                                        trailerdata={item}
                                                        modalVisible={this.state.modalVisible}
                                                    />
                                                )
                                            })
                                        }
                                    </ScrollView>
                                </View>
                            </ScrollView>
                        </View>
                    )
                }}
            </ThemeContext.Consumer>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    title: {
        fontSize: 23,
        fontWeight: "bold"
    },
    poster: {
        height: 230,
    },
    movie_information: {
        flex: 1,
        padding: 20,
    },
    outer_box: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    title_genre: {
        flexWrap: "wrap",
        flexDirection: "column"
    },
    averageScore: {
        width: 48,
        height: 48,
        backgroundColor: "white",
        borderRadius: 24,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        fontSize: 23,
        fontWeight: "bold",
        marginTop: 10,
    },
    trailerTeaserBox: {
        flexWrap: "wrap",
        flexDirection: "row",
    },
    modal: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
    modalBox: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "black"
    },
    xBtn: {
        backgroundColor: "#222",
        width: 48,
        height: 48,
        position: "absolute",
        top: Constants.statusBarHeight + 10,
        left: 20,
        borderRadius: 10,
        justifyContent: "center",
        alignContent: "center"
    },
    castContainer: {
        flexDirection: "row",
        flex: 1,
    },
});

export default MovieDetails;
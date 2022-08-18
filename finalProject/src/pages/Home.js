import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback, Dimensions, Image, Animated, TextInput } from 'react-native';
import { ThemeContext } from '../contexts/ThemeContext';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieComp from '../components/MovieComp';
import Movie from '../models/Movie';
import NowPlayingMovies from '../components/NowPlayingMovies';
import Autocomplete from "react-native-autocomplete-input";

export default class Home extends Component {
    // initialise
    deviceWidth = Dimensions.get("window").width;
    baseURL = "https://api.themoviedb.org/3/movie/";
    apiKey = "a8b1207f53708946a64f6fe39f5f4881";
    _isMount = false;
    genres = [];

    state = {
        isLoading: false,
        nowPlayingMovies: [],
        popularMovies: [],
        //for autocomplete
        queryResults: [],
        query: "",
        // for animation
        iconName: "magnify",
        isAnimating: false,
        fadeAnim: new Animated.Value(40),
    };

    constructor(props) {
        //set with props
        super(props);
        this.genres = props.genres;
    }

    searchData = (query) => {
        return fetch("https://api.themoviedb.org/3/search/movie?api_key=" + this.apiKey + "&language=en-US&query=" + query)
            .then((response) => response.json())
            .then((responseJson) => {
                const movieData = [];
                var allgenres = this.genres;
                responseJson.results.forEach((movie) => {
                    movie.genres = [];
                    movie.genre_ids.forEach((genreid) => {
                        var genreData = allgenres.filter((x) => x.id == genreid);
                        if (genreData.length != 0) {
                            movie.genres.push(genreData[0].name);
                        }
                    });
                    movieData.push(
                        new Movie({
                            id: movie.id,
                            title: movie.title,
                            poster_path: movie.poster_path == null
                                ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                                : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                            genre_ids: movie.genre_ids,
                            overview: movie.overview,
                            popularity: movie.popularity,
                            release_date: movie.release_date,
                            vote_average: movie.vote_average,
                            vote_count: movie.vote_count,
                            genre: movie.genres,
                        })
                    );
                    this.setState({ query: query, queryResults: movieData });
                });
            })
            .catch((error) => console.error(error));
    };

    //what will happen when view is mounted
    componentDidMount() {
        this._isMount = true;

        // retrieve data from tmdb api
        return (
            fetch(this.baseURL + 'popular?api_key=' + this.apiKey)
                .then((response) => response.json())
                .then((responseJson) => {
                    var popularMovieData = [];
                    var allGenres = this.genres;
                    responseJson.results.forEach((movie) => {
                        // movie.genres as an array to store it all in and push into data
                        movie.genres = [];
                        movie.genre_ids.forEach((genreId) => {
                            var genreData = allGenres.filter((x) => x.id === genreId);
                            if (genreData.length != 0) {
                                movie.genres.push(genreData[0].name);
                            }
                        });

                        popularMovieData.push(
                            new Movie({
                                id: movie.id,
                                title: movie.title,
                                poster_path: movie.poster_path == null
                                    ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                                    : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                                overview: movie.overview,
                                genre_ids: movie.genre_ids,
                                release_date: movie.release_date,
                                popularity: movie.popularity,
                                vote_count: movie.vote_count,
                                vote_average: movie.vote_average,
                                genre: movie.genres,
                            })
                        );
                    });

                    if (this._isMount) {
                        this.setState({
                            popularMovies: popularMovieData,
                        });
                    }

                    // Get the most newly created movie. This is a live response and will continuously change.
                    fetch(this.baseURL + "now_playing?api_key=" + this.apiKey)
                        .then((response) => response.json())
                        .then((responseJson) => {
                            var nowPlayingMoviesData = [];
                            var allGenres = this.genres;
                            responseJson.results.forEach((movie) => {
                                // movie.genres as an array to store it all in and push into data
                                movie.genres = [];
                                movie.genre_ids.forEach((genreId) => {
                                    var genreData = allGenres.filter((x) => x.id === genreId);
                                    if (genreData.length != 0) {
                                        movie.genres.push(genreData[0].name);
                                    }
                                });

                                nowPlayingMoviesData.push(new Movie({
                                    id: movie.id,
                                    title: movie.title,
                                    poster_path: movie.poster_path == null
                                        ? "https://lightning.od-cdn.com/25.2.6-build-2536-master/public/img/no-cover_en_US.jpg"
                                        : "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                                    overview: movie.overview,
                                    genre_ids: movie.genre_ids,
                                    release_date: movie.release_date,
                                    popularity: movie.popularity,
                                    vote_count: movie.vote_count,
                                    vote_average: movie.vote_average,
                                    genre: movie.genres,
                                })
                                );
                            });

                            if (this._isMount) {
                                this.setState({
                                    nowPlayingMovies: nowPlayingMoviesData,
                                });
                            }
                        })
                        .catch((error) => console.error(error));
                })

                .catch((error) => console.error(error))
        );
    }

    componentWillUnmount() {
        this._isMount = false;
    }

    handleSelect = () => {
        this.setState({ isAnimating: true });

        this.state.fadeAnim._value != this.deviceWidth - 40
            ? Animated.timing(this.state.fadeAnim, {
                toValue: this.deviceWidth - 40,
                duration: 500,
                useNativeDriver: false
            }).start(() => {
                this.setState({ iconName: "close" });
                this.setState({ isAnimating: false });
            })
            : Animated.timing(this.state.fadeAnim, {
                toValue: 40,
                duration: 500,
                useNativeDriver: false,
            }).start(() => {
                //resets everything to original state
                this.setState({ iconName: "magnify", query: "", queryResults: [] });
                this.setState({ isAnimating: false });
            });
    };

    renderRectangle = (context) => {
        const { boolDarkMode, light, dark } = context;
        const customStyle = {
            width: this.state.fadeAnim,
        };

        return (
            <Animated.View style={[styles.rectangle, customStyle]}>
                <TouchableWithoutFeedback
                    style={{
                        width: 40,
                        height: 40,
                        justifyContent: "center",
                        alignItems: "center",
                    }}
                    onPress={() => this.handleSelect()}
                >
                    <MaterialCommunityIcons name={this.state.iconName} color={boolDarkMode ? light.bg : dark.bg} size={24} />
                </TouchableWithoutFeedback>
            </Animated.View>
        );
    };

    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { boolDarkMode, light, dark } = context;

                    return (
                        <SafeAreaView style={[styles.container, { backgroundColor: boolDarkMode ? dark.bg : light.bg }]}>
                            <View style={styles.header}>
                                {!this.state.isAnimating && this.state.iconName == "magnify" ? (
                                    <Text
                                        style={[styles.appName, { color: boolDarkMode ? light.bg : dark.bg }]}
                                    >
                                        App Name
                                    </Text>
                                ) : (
                                    <View />
                                )}
                                <View style={{ flexWrap: "wrap" }}>
                                    {this.renderRectangle(context)}
                                </View>
                            </View>
                            {/* check that it is not animating currently and check that the icon name is close
                         before showing autocomplete */}
                            {!this.state.isAnimating && this.state.iconName == "close" ? (
                                <Autocomplete
                                    style={{
                                        backgroundColor: "transparent",
                                        color: boolDarkMode ? light.bg : dark.bg
                                    }}
                                    data={this.state.queryResults}
                                    placeholder="Enter Movie Name"
                                    autoFocus={true}
                                    placeholderTextColor={boolDarkMode ? light.bg : dark.bg}
                                    containerStyle={{
                                        paddingHorizontal: 20,
                                        position: "absolute",
                                        top: 15,
                                        paddingLeft: 60,
                                        height: 40,
                                        width: "100%",
                                    }}
                                    listStyle={{
                                        maxHeight: 300,
                                        zIndex: 999,
                                    }}
                                    inputContainerStyle={{
                                        borderWidth: 0,
                                        height: 40,
                                    }}
                                    onChangeText={(text) => {
                                        //text being the query being passed into searchData
                                        this.searchData(text);
                                    }}
                                    flatListProps={{
                                        keyExtractor: (item, i) => item.id.toString(),
                                        renderItem: ({ item }) => (
                                            <TouchableWithoutFeedback
                                                onPress={() => {
                                                    this.props.navigation.navigate("MovieDetails", {
                                                        details: item,
                                                    });
                                                }}
                                            >
                                                <View
                                                    style={{
                                                        flex: 1,
                                                        flexDirection: "row",
                                                        marginBottom: 10,
                                                        backgroundColor: boolDarkMode ? dark.bg : light.bg

                                                    }}
                                                >
                                                    <Image style={{ width: 38, height: 57 }} source={{ uri: item.poster_path }} />
                                                    <View
                                                        style={{
                                                            flexWrap: "wrap",
                                                            flexDirection: "column",
                                                            marginLeft: 5,
                                                            justifyContent: "center",
                                                        }}
                                                    >
                                                        <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>{item.title}</Text>
                                                        <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>{item.release_date}</Text>
                                                    </View>
                                                </View>
                                            </TouchableWithoutFeedback>
                                        )
                                    }}
                                />
                            ) : (
                                <View />
                            )}
                            <ScrollView scrollEnabled={this.state.query == "" ? true : false}>
                                <View style={styles.popularMoviesBox}>
                                    <Text style={[styles.headerTitle, { color: boolDarkMode ? light.bg : dark.bg }]}>Popular Movies</Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.props.navigation.navigate("ViewAll", {
                                                genres: this.genres,
                                                isPopular: true,
                                            })
                                        }}>
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                                            <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>View All</Text>
                                            <MaterialCommunityIcons name="chevron-right" size={20} style={{ color: boolDarkMode ? light.bg : dark.bg }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>

                                <ScrollView
                                    horizontal={true}
                                    scrollEnabled={this.state.query == "" ? true : false}
                                    showsHorizontalScrollIndicator={false}
                                >
                                    <View style={styles.popularHome}>
                                        {
                                            this.state.popularMovies.map((item, index) => {
                                                // key to remove key child warning 
                                                return index < 5 ? (
                                                    <MovieComp key={item.id} item={item} />
                                                ) :
                                                    (<View key={item.id} />
                                                    );
                                            })
                                        }
                                    </View>
                                </ScrollView>

                                <View style={styles.popularMoviesBox}>
                                    <Text style={[styles.headerTitle, { color: boolDarkMode ? light.bg : dark.bg }]}>Now Playing</Text>
                                    <TouchableWithoutFeedback
                                        onPress={() => {
                                            this.props.navigation.navigate("ViewAll", {
                                                genres: this.genres,
                                                isPopular: false,
                                            })
                                        }}
                                    >
                                        <View style={{ flexDirection: "row", flexWrap: "wrap", alignItems: "center" }}>
                                            <Text style={{ color: boolDarkMode ? light.bg : dark.bg }}>View All</Text>
                                            <MaterialCommunityIcons name="chevron-right" size={20} style={{ color: boolDarkMode ? light.bg : dark.bg }} />
                                        </View>
                                    </TouchableWithoutFeedback>
                                </View>
                                <View style={styles.nowPlayingMovies}>
                                    {
                                        this.state.nowPlayingMovies.map((item, index) => {

                                            // key to remove key child warning 
                                            return index < 5 ? (
                                                <NowPlayingMovies key={item.id} item={item} />
                                            ) :
                                                (<View key={item.id} />
                                                );
                                        })
                                    }
                                </View>
                            </ScrollView>
                        </SafeAreaView>
                    );
                }}
            </ThemeContext.Consumer>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 5,
        marginTop: Constants.statusBarHeight,
    },
    popularHome: {
        flexDirection: "row",
        flex: 1,
        paddingLeft: 20,
    },
    nowPlayingMovies: {
        paddingHorizontal: 20
    },
    header: {
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    appName: {
        fontSize: 25,
        fontWeight: "bold"
    },
    headerTitle: {
        fontWeight: "bold",
        fontSize: 20,
    },
    popularMoviesBox: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    rectangle: {
        height: 40,
    }
})
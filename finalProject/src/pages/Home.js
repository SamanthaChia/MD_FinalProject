import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet, TouchableWithoutFeedback } from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MovieComp from '../components/MovieComp';
import Movie from '../models/Movie';
import NowPlayingMovies from '../components/NowPlayingMovies';
import { ThemeContext } from '../contexts/ThemeContext';

export default class Home extends Component {
    // initialise
    baseURL = "https://api.themoviedb.org/3/movie/";
    apiKey = "a8b1207f53708946a64f6fe39f5f4881";
    _isMount = false;
    genres = [];

    state = {
        isLoading: false,
        nowPlayingMovies: [],
        popularMovies: [],
    };
    
    constructor(props){
        //set with props
        super(props);
        this.genres = props.genres;
    }

    //what will happen when view is mounted
    componentDidMount(){
        this._isMount = true;
        
        // retrieve data from tmdb api
        return(
            fetch(this.baseURL + 'popular?api_key=' + this.apiKey)
            .then(response => response.json())
            .then(responseJson => {
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

                    popularMovieData.push(new Movie({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
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
                
                if(this._isMount){
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
                            poster_path: movie.poster_path,
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
                    
                    if(this._isMount){
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

    componentWillUnmount(){
        this._isMount = false;
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {(context) => {
                    const { boolDarkMode, light, dark } = context;
                    return(
                        <SafeAreaView style={[styles.container,{backgroundColor:boolDarkMode ? dark.bg : light.bg}]}>
                        <View style={styles.header}>
                            <Text style={[styles.appName, {color:boolDarkMode ? light.bg : dark.bg}]} >App Name</Text>
                            <MaterialCommunityIcons name="magnify" size={27} style={{color:boolDarkMode ? light.bg : dark.bg}} />
                        </View>
                        <ScrollView>  
                            <View style={styles.popularMoviesBox}>
                                <Text style={[styles.headerTitle, {color:boolDarkMode ? light.bg : dark.bg}]}>Popular Movies</Text>
                                <TouchableWithoutFeedback
                                    onPress={() => {
                                        this.props.navigation.navigate("ViewAll", {
                                            genres: this.genres,
                                            isPopular: false,
                                        })
                                    }}>
                                    <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                            <Text style={{color:boolDarkMode ? light.bg : dark.bg}}>View All</Text>
                                            <MaterialCommunityIcons name="chevron-right" size={20} style={{color:boolDarkMode ? light.bg : dark.bg}}/>
                                    </View>
                                </TouchableWithoutFeedback>
                            </View>

                            <ScrollView 
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}>
                                <View style={styles.popularHome}>
                                    {
                                        this.state.popularMovies.map((item, index) => {
                                            // key to remove key child warning 
                                            return index < 5 ? (
                                                <MovieComp key={item.id} item={item} />
                                            ) :
                                            ( <View key={item.id} />
                                            );
                                        })
                                    }
                                </View>
                            </ScrollView>

                            <View style={styles.popularMoviesBox}>
                                <Text style={[styles.headerTitle, {color:boolDarkMode ? light.bg : dark.bg}]}>Now Playing</Text>
                                <View style={{flexDirection: "row", flexWrap: "wrap", alignItems: "center"}}>
                                        <Text style={{color:boolDarkMode ? light.bg : dark.bg}}>View All</Text>
                                        <MaterialCommunityIcons name="chevron-right" size={20} style={{color:boolDarkMode ? light.bg : dark.bg}}/>
                                </View>
                            </View>
                            <View style={styles.nowPlayingMovies}>
                                {
                                    this.state.nowPlayingMovies.map((item, index) => {

                                        // key to remove key child warning 
                                        return index < 5 ? (
                                        <NowPlayingMovies key={item.id} item={item} />
                                        ) :
                                        ( <View key={item.id} />
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
    container:{
        flex: 1,
        padding: 5,
        marginTop: Constants.statusBarHeight,
    },
    popularHome:{
        flexDirection: "row",
        flex: 1,
        paddingLeft: 20,
    },
    nowPlayingMovies:{
        paddingHorizontal: 20
    },
    header:{
        width: "100%",
        flexDirection:"row",
        justifyContent:"space-between",
        paddingHorizontal: 20,
        marginVertical: 10,
    },
    appName:{
        fontSize: 25,
        fontWeight: "bold"
    },
    headerTitle:{
        fontWeight: "bold",
        fontSize:20,
    },
    popularMoviesBox:{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        marginVertical: 10,
    }
})
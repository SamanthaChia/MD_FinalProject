import React, { Component } from 'react';
import { View, Text, StyleSheet, ActivityIndicator, TouchableWithoutFeedback, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { ThemeContext } from '../contexts/ThemeContext';
import Movie from '../models/Movie';
import NowPlayingMovies from '../components/NowPlayingMovies';

class ViewAll extends Component {
    baseURL = "https://api.themoviedb.org/3/movie/";
    apiKey = "a8b1207f53708946a64f6fe39f5f4881";

    state = {
        data: null,
        isLoading: false,
        total_pages : 1,
    };

    constructor(props){
        super(props);
        this.genres = props.route.params.genres;
    }

    fetchData = (page) => {
        this.setState({isLoading : true });
        if(this.state.total_pages >= page){
            return fetch(
                this.baseURL + (this.props.route.params.isPopular ? "popular" : "now_playing") + "?api_key=" + this.apiKey + "&page=" + page
            )
            .then((response) => response.json())
            .then((responseJson) => {
                const movieData = page == 1 ? [] : this.state.data;
                var allgenres = this.genres;
                responseJson.results.forEach((movie) => {
                    movie.genres = [];
                    movie.genre_ids.forEach((genreid) => {
                        var genreData = allgenres.filter((x) => x.id == genreid);
                        if (genreData.length != 0){
                            movie.genres.push(genreData[0].name);
                        }
                    });

                    var item = movieData.filter((x) => x.id == movie.id);
                    if(item.length == 0){
                        movieData.push(
                            new Movie({
                                id: movie.id,
                                title: movie.title,
                                poster_path: "http://image.tmdb.org/t/p/w342/" + movie.poster_path,
                                backdrop_path: "http://image.tmmdv.org/t/p/w500/" + movie.backdrop_path,
                                genre_ids: movie.genre_ids,
                                overview: movie.overview,
                                popularity: movie.popularity,
                                release_date: movie.release_date,
                                vote_average: movie.vote_average,
                                vote_count: movie.vote_count,
                                genre: movie.genres,
                            })
                        );
                    }
                });

                if(this.state.total_pages == 1){
                    this.setState({total_pages : responseJson.total_pages});
                }

                this.setState({
                    data: movieData,
                    page: page,
                    isLoading: false,
                });
            })
            .catch((error) => console.error(error));
        }
    };

    updatePage = () => {
        this.fetchData(this.state.page + 1);
    };

    componentDidMount() {
        this.fetchData(1);
    }

    render() {
        if (this.state.isLoading){
            <View style={{paddingVertical: 20}}>
                <ActivityIndicator animating={true} size={"large"} />
            </View>;
        }

        if (this.state.data == null){
            return <View></View>;
        } else{
            return(
                <ThemeContext.Consumer>
                    {(context) => {
                        const {boolDarkMode, light, dark} = context;
                        return(
                            <View style={[styles.container, {backgroundColor: boolDarkMode ? dark.bg : light.bg }]}>
                                <StatusBar style={boolDarkMode ? "light" : "dark"} />
                                <TouchableWithoutFeedback onPress = {() => this.props.navigation.pop()}>
                                        <View style={styles.backBtn}>
                                            <MaterialCommunityIcons name="chevron-left" color={boolDarkMode ? light.bg : dark.bg} size={25} />
                                            <Text style={[styles.headerText, {color:boolDarkMode ? light.bg : dark.bg}]}>View All</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                    <FlatList
                                        style={{paddingHorizontal: 20}}
                                        data = {this.state.data}
                                        keyExtractor={(item) => 
                                            item.id.toString() + this.state.page.toString()
                                        }
                                        onEndReached={this.updatePage}
                                        renderItem={({item}) => {
                                            return <NowPlayingMovies item={item} />;
                                        }}
                                    />
                            </View>
                        );
                    }}
                </ThemeContext.Consumer>
            );
        }
        return <View></View>;
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        paddingTop: Constants.statusBarHeight + 10,
    },
    backBtn:{
        flexDirection: "row",
        flexWrap: "wrap",
        alignItems: "center",
        paddingLeft: 10,
        marginBottom: 10,
    },
    headerText:{
        fontWeight: "bold",
        fontSize: 23,
    },
})

export default ViewAll;
import React, { Component } from 'react';
import { SafeAreaView, View, ScrollView, Text, StyleSheet } from 'react-native';
import MovieComp from '../components/MovieComp';
import Movie from '../models/Movie';

export default class Home extends Component {
    _isMount = false;

    state = {
        isLoading: false,
        recentMovies: [],
        popularMovies: [],
    };

    componentDidMount(){
        this._isMount = true;
        
        // retrieve data from tmdb api
        return(
            fetch('https://api.themoviedb.org/3/movie/popular?api_key=a8b1207f53708946a64f6fe39f5f4881')
            .then(response => response.json())
            .then(responseJson => {
                var popularMovieData = [];
                responseJson.results.forEach((movie) => {
                    popularMovieData.push(new Movie({
                        id: movie.id,
                        title: movie.title,
                        poster_path: movie.poster_path,
                        overview: movie.overview,
                        genre_ids: movie.genre_ids,
                        release_date: movie.release_date,
                        popularity: movie.popularity,
                        vote_count: movie.vote_count,
                        vote_average: movie.vote_average
                        })
                    );
                });
                this.setState({
                    popularMovies: popularMovieData,
                })
            })
            .catch((error) => console.error(error))
            )
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <ScrollView 
                    horizontal={true}
                    showsHorizontalScrollIndicator={false}>
                    <View style={styles.popularHome}>
                        {
                            this.state.popularMovies.map((item) => {
                                return(
                                    // key to remove unique key id warning
                                <MovieComp item={item} />
                                )
                            })
                        }
                    </View>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    popularHome:{
        flexDirection: "row",
        flex: 1,
    }
})
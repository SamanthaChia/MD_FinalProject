import React, { Component } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';

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
                console.log(responseJson.results);
            })
            .catch((error) => console.error(error))
            )
    }

    componentWillUnmount(){
        this._isMount = false;
    }

    render() {
        return (
            <SafeAreaView style = {styles.container}>
                <Text>Home</Text>
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
})
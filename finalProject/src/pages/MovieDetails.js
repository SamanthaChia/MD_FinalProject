import React, { Component, useState } from 'react';
import { View, StyleSheet, Text, Image, ScrollView, TouchableWithoutFeedback, Modal, Alert} from 'react-native';
import Constants from 'expo-constants';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GenreLabel from '../components/GenreLabel';
import TrailerTeaser from '../models/TrailerTeaser';
import TrailerTeaserDisplay from '../components/TrailerTeaserDisplay';

class MovieDetails extends Component{
    movieDetails = null;

    constructor(props){
        super(props);
        this.movieDetails = props.route.params.details;
    }

    state = {
        trailerTeasers: [],
        modalVisible: false,
    };

    componentDidMount(){
        return (
            fetch('https://api.themoviedb.org/3/movie/'+ this.movieDetails.id +'/videos?api_key=a8b1207f53708946a64f6fe39f5f4881')
                .then((response) => response.json())
                .then((responseJson) => {
                    var items = [];
                    responseJson.results.map((movie) => {
                        items.push(new TrailerTeaser({
                            key: movie.key,
                            name: movie.name,
                            type:movie.type,
                        })
                        );
                    });

                    this.setState({trailerTeasers: items});

                }).catch((error) => console.error(error))
        );

    }


   render(){

    return(
        <View style={styles.container}>
            <Modal 
                style={styles.modal}
                animationType="slide"
                transparent={true}
                statusBarTranslucent={true}
                visible={this.state.modalVisible}
                onRequestClose={()=>{
                    this.setState({ modalVisible: false});
                }}
            >
                <View style={{flex: 1,height :120, backgroundColor:"red"}}>

                </View>
            </Modal>
            <ScrollView>
                <TouchableWithoutFeedback onPress = { () => this.props.navigation.pop()}>
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
                <Image style={styles.poster} resizeMode={"cover"} source={{uri:"http://image.tmdb.org/t/p/w500/" + this.movieDetails.poster_path}} />
                {/* Retrieve from navigation, using route parms, and retrieving the 
                params passed into details. */}
                <View style={styles.movie_information}>
                    <View style={styles.outer_box}>
                        <View style={styles.title_genre}>
                            <Text style={styles.title}>{this.movieDetails.title}</Text>
                            <Text>{this.movieDetails.release_date}</Text>
                        </View>
                        <View style={styles.averageScore}>
                            <Text>{this.movieDetails.vote_average}</Text>
                        </View>
                    </View>
                    <GenreLabel data={this.movieDetails.genre} />
                    <Text style={styles.header}>Movie Description</Text>
                    <Text>{this.movieDetails.overview}</Text>
                    <Text style={styles.header}>Cast</Text>
                    <Text style={styles.header}>Movie Trailers & Teasers</Text>
                    <View style={styles.trailerTeaserBox}>
                        {
                            this.state.trailerTeasers.map((item) => {
                                return (
                                        <TrailerTeaserDisplay 
                                            key={item.key}
                                            onPressFunction={()=> this.setState({modalVisible:true}) }
                                            poster={this.movieDetails.poster_path}
                                            trailerdata={item}
                                            modalVisible={this.state.modalVisible}
                                        />
                                )
                            })
                        }
                    </View>
                </View>
            </ScrollView>
        </View>
    );
   }
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    title:{
      fontSize: 23,
      fontWeight: "bold"  
    },
    poster:{
        height:230,
    },
    movie_information:{
        flex: 1,
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
    },
    trailerTeaserBox:{
        flexWrap: "wrap",
        flexDirection: "row",
    },
    modal:{
        position:"absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
    },
});

export default MovieDetails;
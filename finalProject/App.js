import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  const [movieData, setMovieData] = useState(null);

  useEffect(() => {
    (async() => {
      fetch('https://api.themoviedb.org/3/movie/550?api_key=a8b1207f53708946a64f6fe39f5f4881&language=en-US', {
       method:"GET",
       headers:{
        Accept:'application/json',
        'Content-Type': 'application/json'
       }
      })
      .then((response) => response.json())
      .then((json) => {
        setMovieData(json);
        console.log(movieData);
      })
      .catch((error) => {
        console.log(error);
      });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <Text> Title: {movieData.original_title}</Text>
      <Text> Overview: {movieData.overview}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { styles } from '../styles/styles';
import { API_KEY, BASE_URL } from '../utils/constants';
import globalStyles from '../globalStyles';

const GenreMovieScreen = ({ route, navigation }) => {
  const { genreId, genreName } = route.params; // รับค่า genreId จาก params
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movies based on selected genre
  useEffect(() => {
    const url = `${BASE_URL}/discover/movie?api_key=${API_KEY}&with_genres=${genreId}`;
    axios
      .get(url)
      .then((response) => {
        setMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, [genreId]);

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={globalStyles.headerText}>{genreName} Movies</Text>

      <FlatList
        data={movies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate('MovieDetail', {
                movieId: item.id,
                movieTitle: item.title, // ส่งชื่อหนังไปด้วย
              })
            }
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default GenreMovieScreen;

// ใน HomeScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { styles } from '../styles/styles';
import { API_KEY, BASE_URL } from '../utils/constants';
import globalStyles from '../globalStyles';

const HomeScreen = ({ navigation }) => { // รับ navigation เป็น prop
  const [popularMovies, setPopularMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch popular movies
  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`)
      .then((response) => {
        setPopularMovies(response.data.results);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });
  }, []);

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
      <Text style={globalStyles.headerText}>Popular Movies</Text>
      <FlatList
        data={popularMovies}
        renderItem={({ item }) => (
          <MovieCard 
            movie={item} 
            onPress={() => navigation.navigate('MovieDetail', { 
              movieId: item.id, 
              movieTitle: item.title // ส่งชื่อหนังไปด้วย
            })} 
          />
        )}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={styles.row}
      />
    </View>
  );
};

export default HomeScreen;

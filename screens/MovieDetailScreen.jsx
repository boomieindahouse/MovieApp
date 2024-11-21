// ในไฟล์ MovieDetailScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, Image, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_KEY, BASE_URL } from '../utils/constants';
import movieDetailStyles from '../styles/movieDetailStyles';  // นำเข้า style

const MovieDetailScreen = ({ route, navigation }) => {
  const { movieId, movieTitle } = route.params; // รับข้อมูลจาก params
  const [movieDetails, setMovieDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch movie details by ID
  useEffect(() => {
    axios
      .get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}&language=th`)
      .then((response) => {
        setMovieDetails(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError(err);
        setIsLoading(false);
      });

    // Update header title with movie title
    navigation.setOptions({
      title: movieTitle, // ใช้ชื่อหนังจาก params
      headerBackTitle: 'Back', // ตั้งค่าให้ปุ่มย้อนกลับแสดงเป็น "Back" เสมอ
    });
  }, [movieId, movieTitle, navigation]);

  if (isLoading) {
    return (
      <View style={movieDetailStyles.centered}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={movieDetailStyles.centered}>
        <Text>Error: {error.message}</Text>
      </View>
    );
  }

  return (
    <View style={movieDetailStyles.container}>
      {movieDetails && (
        <>
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}` }}
            style={movieDetailStyles.movieImage}
          />
          <Text style={movieDetailStyles.movieTitle}>{movieDetails.title}</Text>
          <Text style={movieDetailStyles.movieOverview}>{movieDetails.overview}</Text>
        </>
      )}
    </View>
  );
};

export default MovieDetailScreen;

import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { styles } from '../styles/styles';

const MovieCard = ({ movie }) => {
  return (
    <TouchableOpacity style={styles.movieCard}>
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

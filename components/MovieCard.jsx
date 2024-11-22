import React from 'react';
import { TouchableOpacity, Text, Image } from 'react-native';
import { styles } from '../styles/styles';

const MovieCard = ({ movie, onPress }) => {
  return (
    <TouchableOpacity
      key={movie.id} // ส่ง key โดยตรง ไม่ผ่าน spread
      style={styles.movieCard}
      onPress={onPress}
    >
      <Image
        source={{ uri: `https://image.tmdb.org/t/p/w500${movie.poster_path}` }}
        style={styles.movieImage}
      />
      <Text style={styles.movieTitle}>{movie.title}</Text>
    </TouchableOpacity>
  );
};

export default MovieCard;

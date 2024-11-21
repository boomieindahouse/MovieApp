import React from 'react';
import { FlatList } from 'react-native';
import MovieCard from './MovieCard';

const MovieList = ({ movies }) => {
  return (
    <FlatList
      data={movies}
      renderItem={({ item }) => <MovieCard movie={item} />}
      keyExtractor={(item) => item.id.toString()}
      numColumns={2}
    />
  );
};

export default MovieList;

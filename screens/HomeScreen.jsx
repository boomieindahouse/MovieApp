import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import MovieCard from '../components/MovieCard';
import { styles } from '../styles/styles';
import { API_KEY, BASE_URL } from '../utils/constants';
import globalStyles from '../globalStyles';
import ModalDropdown from 'react-native-modal-dropdown';

const HomeScreen = ({ navigation }) => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [genres, setGenres] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch genres from the API
    useEffect(() => {
        axios
            .get(`${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
            .then((response) => {
                setGenres(response.data.genres);
            })
            .catch((err) => {
                setError(err);
            });
    }, []);

    // Fetch popular movies
    useEffect(() => {
        setIsLoading(true);
        const url = `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US`;

        axios
            .get(url)
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

            {/* Dropdown for Genre selection */}
            <ModalDropdown
                options={['All Movies', ...genres.map((genre) => genre.name)]} // Display genres in dropdown
                onSelect={(index, value) => {
                    const genreId = genres.find((genre) => genre.name === value)?.id;
                    if (genreId) {
                        // Navigate to GenreMovieScreen and pass the genre ID
                        navigation.navigate('GenreMovieScreen', {
                            genreId: genreId,
                            genreName: value,
                        });
                    } else {
                        // If 'All Movies' is selected, stay on the current screen
                        navigation.navigate('HomeScreen');
                    }
                }}
                style={styles.dropdownStyle}
                textStyle={styles.dropdownTextStyle}
                dropdownStyle={styles.modalDropdown}
            />

            <FlatList
                data={popularMovies}
                renderItem={({ item }) => (
                    <MovieCard
                        movie={item}
                        onPress={() =>
                            navigation.navigate('MovieDetail', {
                                movieId: item.id,
                                movieTitle: item.title,
                            })
                        }
                    />
                )}
                keyExtractor={(item) => item.id.toString()} // จัดการ key ในระดับ FlatList
                numColumns={2}
                columnWrapperStyle={styles.row}
            />
        </View>
    );
};

export default HomeScreen;

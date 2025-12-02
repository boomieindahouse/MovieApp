import React, { useState, useEffect } from "react";
import { View, Text, FlatList, ActivityIndicator } from "react-native";
import axios from "axios";
import MovieCard from "../components/MovieCard";
import { styles } from "../styles/styles";
import { API_KEY, BASE_URL, ROUTES } from "../utils/constants";
import globalStyles from "../globalStyles";
import RNPickerSelect from "react-native-picker-select";
import { Ionicons } from "@expo/vector-icons";

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
      <Text style={globalStyles.headerText}>Select Genre</Text>
      {/* Dropdown for Genre selection */}
      <RNPickerSelect
        onValueChange={(value) => {
          if (value) {
            const genre = genres.find((g) => g.id === value);
            navigation.navigate(ROUTES.GENRE, {
              genreId: value,
              genreName: genre ? genre.name : "",
            });
          } else {
            navigation.navigate(ROUTES.HOME);
          }
        }}
        value={null}
        items={[
          { label: "All Movies", value: null },
          ...genres.map((genre) => ({ label: genre.name, value: genre.id })),
        ]}
        useNativeAndroidPickerStyle={false}
        Icon={() => {
          return <Ionicons name="chevron-down" size={24} color="gray" />;
        }}
        style={{
          inputIOS: {
            height: 50, // Increased height
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 20,
            textAlign: "center",
            color: "black",
            width: "100%", // Ensure full width
            justifyContent: "center",
          },
          inputAndroid: {
            height: 50, // Increased height
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 5,
            paddingHorizontal: 10,
            marginBottom: 20,
            textAlign: "center",
            color: "black",
            width: "100%", // Ensure full width
            justifyContent: "center",
          },
          iconContainer: {
            top: 12,
            right: 15,
          },
        }}
        placeholder={{}}
      />
      <Text style={globalStyles.headerText}>Popular Movies</Text>

      <FlatList
        data={popularMovies}
        renderItem={({ item }) => (
          <MovieCard
            movie={item}
            onPress={() =>
              navigation.navigate("MovieDetail", {
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

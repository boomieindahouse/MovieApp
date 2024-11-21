import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import GenreMoviesScreen from './screens/GenreMoviesScreen';
import MovieDetailScreen from './screens/MovieDetailScreen';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="What Should I ดู">
        <Stack.Screen
          name="What Should I ดู"
          component={HomeScreen}
          options={{ title: 'Popular Movies' }}
        />
        <Stack.Screen
          name="GenreMovieScreen"
          component={GenreMoviesScreen}
          options={({ route }) => ({
            title: route.params?.genreName ? `${route.params.genreName} Movies` : 'What should I ดู',
            headerBackTitle: 'Back', // กำหนดข้อความของปุ่มย้อนกลับ
          })}
        />
        <Stack.Screen
          name="MovieDetail"
          component={MovieDetailScreen}
          options={({ route }) => ({
            title: route.params?.movieTitle,
            headerBackTitle: 'Back', // กำหนดข้อความของปุ่มย้อนกลับ
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

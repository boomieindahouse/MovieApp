import HomeScreen from '../screens/HomeScreen';
import GenreMoviesScreen from '../screens/GenreMoviesScreen';
import MovieDetailScreen from '../screens/MovieDetailScreen';
import { ROUTES } from '../utils/constants';

const routes = [
  {
    name: ROUTES.HOME,
    component: HomeScreen,
    options: { title: 'Popular Movies' },
  },
  {
    name: ROUTES.GENRE,
    component: GenreMoviesScreen,
    options: ({ route: { params } }) => ({
      title: params?.genreName ? `${params.genreName} Movies` : 'What Should I ดู',
      headerBackTitle: 'Back',
    }),
  },
  {
    name: ROUTES.DETAIL,
    component: MovieDetailScreen,
    options: ({ route: { params } }) => ({
      title: params?.movieTitle,
      headerBackTitle: 'Back',
    }),
  },
];

export default routes;

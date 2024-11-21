// ในไฟล์ styles/movieDetailStyles.js
import { StyleSheet } from 'react-native';

const movieDetailStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  movieImage: {
    width: '80%',
    height: 500,
    borderRadius: 8,
    marginBottom: 16,
    alignSelf: 'center',
  },
  movieTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  movieOverview: {
    fontSize: 16,
    color: '#555',
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default movieDetailStyles;

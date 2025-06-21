import { useEffect, useState } from 'react'
import './App.css'
import Search from './components/Search'
import axios from 'axios'
import Spinner from './components/Spinner';
import MovieCard from './components/MovieCard';
import { useDebounce } from 'react-use'
import { getTrendingMovies, updateSearchCount } from './appwrite';

const API_URL = import.meta.env.VITE_API_BASE_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }

}
const App = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState('');
  
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [isTrendingMoviesLoading, setIsTrendingMoviesLoading] = useState(false);
  const [errorMessageTrending, setErrorMessageTrending] = useState('');
  
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // debouncing the search term to prevent too many api requests
  useDebounce( () => setDebouncedSearchTerm(searchTerm), 500, [searchTerm] );

  const fetchMovies = async (query = '') => {
    setIsLoading(true);
    setErrorMessage('');
    try {
      const endpoint = query ? 
      `${API_URL}/search/movie?query=${encodeURIComponent(query)}`
      :`${API_URL}/discover/movie?sort_by=popularity.desc`
      const response = await axios.get(endpoint, API_OPTIONS)
      if (response.data === "False") {
        setErrorMessage(response.data.Error || "something went wrong while fetching movies");
        setMovieList([]);
      } else {
        setMovieList(response.data.results);
      }
      if (query && response.data.results.length > 0) {
        await updateSearchCount(query, response.data.results[0]);
      }
      return;
    } catch (error) {
      console.log("Error fetching movies: ", error);
      setErrorMessage("Error fetching movies. Please try again later...");
      return;
    } finally {
      setIsLoading(false);
    }
  }

  const loadTrendingMovies = async () => {
    setIsTrendingMoviesLoading(true);
    setErrorMessageTrending('');
    try {
      const movies = await getTrendingMovies();
      setTrendingMovies(movies);
    } catch (error) {
      console.log(`Error fetching trending movies: ${error}`);
      setErrorMessageTrending("Error fetching trending movies. Please try again later...");
    } finally {
      setIsTrendingMoviesLoading(false);
    }
  }
  useEffect(() => {
    fetchMovies(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    loadTrendingMovies()
  }, []);
  return (
    <main>
      <div className="pattern" />

      <div className="wrapper">
        <header>
          <img src="./hero-img.png" alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient"> Movies </span> You'll Enjoy
          </h1>

          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        </header>

        {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            { isTrendingMoviesLoading ? (
              <Spinner />
            ) : errorMessageTrending ? (
              <p className="text-red-500"> { errorMessageTrending } </p>
            ) : (
            <ul>
              {trendingMovies.map((movie, index) => (
                <li key={movie.$id}>
                  <p>{index + 1}</p>
                  <img src={movie.poster} alt="movie.title" />
                </li>
              ))}
            </ul>
            )
            }
          </section> 
        )}

        <section className="all-movies">
          <h2>
            All Movies
          </h2>
          
          { isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500"> { errorMessage } </p>
          ) : (
            <ul>
              { movieList.map((movie) => (
                <MovieCard key={movie.id} movie={movie}/>
              ))}
            </ul>
          )
          }
        </section>
      </div>
    </main>
  )
}

export default App

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_KEY = 'XYZ';
const DEFAULT_SEARCH = 'Batman';

const Movie = () => {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState(DEFAULT_SEARCH);

  const fetchMovies = async (query) => {
    try {
      const response = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
      if (response.data.Search) {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchMovies(search);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    fetchMovies(search);
  };

  return (
    <div className="movie-container">
      <h1>🎬 Movie Search</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={search}
          placeholder="Search for a movie..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="movies-wrapper">
        <div className="movies-grid">
          {movies.length > 0 ? (
            movies.map((movie) => (
              <div key={movie.imdbID} className="movie-card">
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))
          ) : (
            <p>No movies found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Movie;

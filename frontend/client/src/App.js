import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";
import "./App.css";
import Header from "./components/Header";
import MovieList from "./components/MovieList";
import MovieDetails from "./components/MovieDetails";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [isSearching, setIsSearching] = useState(false);

  const fetchPopularMovies = async () => {
    try {
      const response = await axios.get(
        "http://56.228.18.148:8000/api/popular-movies"
        //"http://localhost:8000/api/popular-movies"
      );
      setMovies(response.data);
      setIsSearching(false);
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  const searchMovies = async (query) => {
    setSearchQuery(query);

    if (!query.trim()) {
      fetchPopularMovies();
      return;
    }

    setIsSearching(true);
    try {
      const response = await axios.get(
        `http://56.228.18.148:8000/api/search-movies?query=${encodeURIComponent(
          query
        )}`
      );
      /*
            const response = await axios.get(
              `http://localhost:8000/api/search-movies?query=${encodeURIComponent(
                query
              )}`
            );
            */
      setMovies(response.data);
    } catch (error) {
      console.error("Error searching movies:", error);
      // Fallback to popular movies on error
      fetchPopularMovies();
    }
  };

  const goHome = () => {
    setSearchQuery("");
    setIsSearching(false);
    fetchPopularMovies();
  };

  useEffect(() => {
    fetchPopularMovies();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header
          onSearch={searchMovies}
          onHome={goHome}
          isSearching={isSearching}
        />
        <Routes>
          <Route path="/" element={<MovieList movies={movies} />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

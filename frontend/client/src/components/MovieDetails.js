import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `http://56.228.18.148:8000/api/movie/${id}`
        );
        /*
        const response = await axios.get(
          `http://localhost:8000/api/movie/${id}`
        );
        */
        setMovie(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movie details:", error);
        setError("Failed to load movie details");
        setLoading(false);
      }
    };

    fetchMovieDetails();
  }, [id]);

  const handleLike = async () => {
    if (!movie) return;

    try {
      const response = await axios.post(
        "http://56.228.18.148:8000/api/movies/like",
        movie
      );
      /*
      const response = await axios.post(
        "http://localhost:8000/api/movies/like",
        movie
      );
      */
      console.log(response.data.message);
      alert(`You liked ${movie.title}!`);
    } catch (error) {
      console.error("Error liking movie:", error);
      alert("Failed to like movie.");
    }
  };

  if (loading) {
    return (
      <div className="movie-details">
        <div className="loading">Loading movie details...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="movie-details">
        <div className="error">{error}</div>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Movies
        </button>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className="movie-details">
        <div className="error">Movie not found</div>
        <button onClick={() => navigate("/")} className="back-button">
          Back to Movies
        </button>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://via.placeholder.com/500x750?text=No+Image";

  const backdropUrl = movie.backdrop_path
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;

  return (
    <div className="movie-details">
      {backdropUrl && (
        <div
          className="movie-backdrop"
          style={{ backgroundImage: `url(${backdropUrl})` }}
        />
      )}

      <div className="movie-content">
        <button onClick={() => navigate("/")} className="back-button">
          ← Back to Movies
        </button>

        <div className="movie-info">
          <div className="movie-poster">
            <img src={posterUrl} alt={`${movie.title} poster`} />
          </div>

          <div className="movie-text">
            <h1>{movie.title}</h1>
            {movie.tagline && <p className="tagline">{movie.tagline}</p>}

            <div className="movie-meta">
              <span className="release-date">
                {movie.release_date
                  ? new Date(movie.release_date).getFullYear()
                  : "N/A"}
              </span>
              <span className="rating">
                ⭐ {movie.vote_average?.toFixed(1) || "N/A"}
              </span>
              <span className="runtime">
                {movie.runtime ? `${movie.runtime} min` : ""}
              </span>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="genres">
                {movie.genres.map((genre) => (
                  <span key={genre.id} className="genre">
                    {genre.name}
                  </span>
                ))}
              </div>
            )}

            <div className="overview">
              <h3>Overview</h3>
              <p>{movie.overview || "No description available."}</p>
            </div>

            <button onClick={handleLike} className="like-button">
              Like This Movie
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;

import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const posterUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;

  const handleLike = async (e) => {
    e.stopPropagation();
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

  const handleCardClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  return (
    <div className="movie-card" onClick={handleCardClick}>
      <img src={posterUrl} alt={`${movie.title} poster`} />
      <h3>{movie.title}</h3>
      <button onClick={handleLike} className="like-button">
        Like
      </button>
    </div>
  );
};

export default MovieCard;

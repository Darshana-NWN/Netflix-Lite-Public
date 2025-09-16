import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "./Header.css";

const Header = ({ onSearch, onHome, isSearching }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSearch = () => {
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleHomeClick = () => {
    setSearchQuery("");
    if (onHome) {
      onHome();
    }
    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    if (onHome) {
      onHome();
    }
  };

  const hasSearchQuery = searchQuery.trim().length > 0;

  return (
    <div className="header">
      <h1 className="header_title" onClick={handleHomeClick}>
        Netflix-Lite
      </h1>
      <div className="search-container">
        <input
          className="header_searchInput"
          type="text"
          placeholder="Search for a movie..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button className="search-button" onClick={handleSearch}>
          Search
        </button>
        {hasSearchQuery && (
          <button className="clear-button" onClick={handleClearSearch}>
            Clear
          </button>
        )}
        {(isSearching || hasSearchQuery) && (
          <button className="home-button" onClick={handleHomeClick}>
            Home
          </button>
        )}
      </div>
    </div>
  );
};

export default Header;

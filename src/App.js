import { useEffect, useState, useRef } from "react";
import "./App.css";
import SearchIcon from "./assets/search.svg";
import MovieCard from "./MovieCard";

import Lottie from "lottie-react";
import animationData from "./assets/logo.json";
import tryAgain from "./assets/TryAgain.json";
import FilterIcon from "./assets/filter.svg";
import InfoIcon from "./assets/info.svg";
import NoImageIcon from "./assets/No-Image-Placeholder.png";

const API_URL = "https://www.omdbapi.com?apikey=869822d9";

const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sort, setSort] = useState(false);
  const [searchHistory, setSearchHistory] = useState(new Set());
  const [movieTitle, setMovieTitle] = useState("");

  const lottieRef = useRef(null);

  const searchMovies = async (searchTitle) => {
    const title = searchTitle || "Star Wars";
    const response = await fetch(`${API_URL}&s=${title}`);
    const data = await response.json();
    setMovieTitle(searchTitle);
    setSearchHistory(new Set([...searchHistory, title]));
    setMovies(data.Search);
  };

  useEffect(() => {
    searchMovies();
  }, []);

  return (
    <div className="App">
      <div className="title">
        <Lottie
          lottieRef={lottieRef}
          onLoopComplete={() => {
            lottieRef.current.setSpeed(0.6);
          }}
          animationData={animationData}
          className="lottie-animation"
          style={{ width: 140 }}
        />
        <h1>MovieRoom</h1>
      </div>

      <div className="search">
        <input
          placeholder="Search for movies"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              searchMovies(searchTerm);
            }
          }}
        />
        <img
          src={SearchIcon}
          alt="search"
          onClick={() => searchMovies(searchTerm)}
        />
      </div>
      <div className="accessibilityContainer">
        <div className="searchHistory">
          {[...searchHistory]
            .slice(-5)
            .reverse()
            .map((item, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(item);
                  searchMovies(item);
                }}
              >
                {item}
              </button>
            ))}
        </div>
        <div className="sortWrapper">
          <span>Sort By: {sort ? "Latest" : "Oldest"}</span>
          <img
            src={FilterIcon}
            alt="search"
            onClick={() => setSort((prev) => !prev)}
          />
        </div>
      </div>
      <p className="resultText">
        Showing <span>{movies ? movies.length : 0}</span> results for:{" "}
        {movieTitle ? movieTitle : "Star Wars"}
      </p>
      {movies?.length > 0 ? (
        <div className="container">
          {(sort
            ? [...movies].sort((a, b) => b.Year - a.Year)
            : [...movies].sort((a, b) => a.Year - b.Year)
          ).map((movie, index) => (
            <MovieCard
              key={index}
              movie={movie}
              InfoIcon={InfoIcon}
              NoImageIcon={NoImageIcon}
            />
          ))}
        </div>
      ) : (
        <div className="empty">
          <Lottie
            lottieRef={lottieRef}
            loop={false}
            animationData={tryAgain}
            className="lottie-animation"
            style={{ width: 100 }}
          />
          <h2>
            No movies found. Please try again with a different movie title.
          </h2>
        </div>
      )}
    </div>
  );
};

export default App;

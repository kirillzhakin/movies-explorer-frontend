import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies(props) {
  const [isChecked, setIsShortMoviesChecked] = useState(false);
  const [movies, setMovies] = useState([]);
  const [searchWord, setSearchWord] = useState("");
  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const saved = true;

  useEffect(() => {
    setMovies(props.movies);
    setNotFoundMovies(props.notFoundMovies);
    setIsLoading(props.isLoading);
  }, [props.isLoading, props.movies, props.notFoundMovies]);

  function handleSearch(searchWord) {
    setSearchWord(searchWord);
  }

  const handleSearchCheck = (movies, ef, searchWord) => {
    const filterRegex = new RegExp(searchWord, "gi");
    return movies.filter((movie) => {
      if (ef) {
        return (
          movie.duration <= SHORT_MOVIE_DURATION &&
          filterRegex.test(movie.nameRU)
        );
      } else {
        return filterRegex.test(movie.nameRU);
      }
    });
  };

  function handleShortMoviesChecked(e) {
    const ef = e.target.checked;
    if (ef) {
      const allMovies = JSON.parse(localStorage.getItem("movies"));
      const searchSavedResult = handleSearchCheck(allMovies, ef, searchWord);
      setIsShortMoviesChecked(true);
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult);
        setNotFoundMovies(false);
      }
    } else {
      const allMovies = JSON.parse(localStorage.getItem("movies"));
      const searchSavedResult = handleSearchCheck(allMovies, ef, searchWord);
      setIsShortMoviesChecked(false);
      if (searchSavedResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else {
        setMovies(searchSavedResult);
        setNotFoundMovies(false);
      }
    }
  }

  return (
    <main className="content">
      <SearchForm
        onSearchMovies={props.onSearchMovies}
        onShortMoviesCheck={handleShortMoviesChecked}
        onSearchSavedMovies={props.onSearchSavedMovies}
        isChecked={isChecked}
        saved={saved}
        onSearch={handleSearch}
      />
      <MoviesCardList
        saved={saved}
        movies={movies}
        onMovieDelete={props.onMovieDelete}
        isLoading={isLoading}
        notFoundMovies={notFoundMovies}
      />
    </main>
  );
}
export default SavedMovies;

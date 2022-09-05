import React, { useEffect, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function Movies({
  onMovieDelete,
  onMoviesLike,
  onSubmit,
  movies,
  savedMovies,
  isLoading,
  loadingError,
  searchKeyword,
}) {
  const [checkBoxActive, setCheckBoxActive] = useState(false);
  const [isShort, setIsShort] = useState(false);

  const saved = false;

  function checkBoxClick() {
    setCheckBoxActive(!checkBoxActive);
    localStorage.setItem("checkBox", !checkBoxActive);
  }

  useEffect(() => {
    const checkBoxLocal = localStorage.getItem("checkBox");
    if (checkBoxLocal === "true") {
      setIsShort(isShort);
      setCheckBoxActive(true);
    }
  }, []);

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < SHORT_MOVIE_DURATION);

  return (
    <main className="content">
      <SearchForm
        isLoading={isLoading}
        onSubmit={onSubmit}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
        isShort={checkBoxActive}
      />
      <MoviesCardList
        movies={checkBoxActive ? filterShortMovies(movies) : movies}
        onMovieDelete={onMovieDelete}
        onMoviesLike={onMoviesLike}
        isLoading={isLoading}
        loadingError={loadingError}
        savedMovies={savedMovies}
        checkBox={checkBoxClick}
        saved={saved}
      />
    </main>
  );
}
export default Movies;

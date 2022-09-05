import React, { useMemo, useState } from "react";
import SearchForm from "../SearchForm/SearchForm";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

function SavedMovies({
  onMovieDelete,
  isLoading,
  savedMovies,
  loadingError,
  searchKeyword,
}) {
  const [checkBoxActive, setCheckBoxActive] = useState(false);
  const [filter, setFilter] = useState("");

  const saved = true;

  const filterShortMovies = (filterMovies) =>
    filterMovies.filter((m) => m.duration < SHORT_MOVIE_DURATION);

  function checkBoxClick() {
    setCheckBoxActive(!checkBoxActive);
  }

  const filteredMovies = useMemo(
    () =>
      savedMovies.filter((m) =>
        m.nameRU.toLowerCase().includes(filter.toLowerCase())
      ),
    [filter, savedMovies]
  );

  return (
    <main className="content">
      <SearchForm
        isLoading={isLoading}
        onSubmit={setFilter}
        checkBoxClick={checkBoxClick}
        searchKeyword={searchKeyword}
      />
      <MoviesCardList
        savedMovies={savedMovies}
        movies={
          checkBoxActive ? filterShortMovies(filteredMovies) : filteredMovies
        }
        onMovieDelete={onMovieDelete}
        isLoading={isLoading}
        loadingError={loadingError}
        saved={saved}
      />
    </main>
  );
}
export default SavedMovies;

import React, { useEffect, useState } from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm(props) {
  const [search, setSearch] = useState("");

  function handleSearchChange(e) {
    setSearch(e.target.value);
    props.onSearch(e.target.value);
    handleValue(e);
  }
  function handleValue(e) {
    props.onSearch(e.target.value);
  }

  function handleSearchMovies(e) {
    e.preventDefault();
    props.onSearchMovies(search);
  }

  function handleSearchSavedMovies(e) {
    e.preventDefault();
    props.onSearchSavedMovies(search);
  }

  return (
    <section className="search">
      <div className="search__container">
        <form
          className="form"
          onSubmit={props.saved ? handleSearchSavedMovies : handleSearchMovies}
        >
          <input
            className="form__input"
            type="text"
            placeholder="Фильм"
            required
            value={search || ""}
            onChange={handleSearchChange}
          />
          <button className="form__submit" type="submit">
            Найти
          </button>
        </form>
        <div className="search__short-films">
          <FilterCheckbox
            onChange={props.onShortMoviesCheck}
            isChecked={props.isChecked}
          />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}
export default SearchForm;

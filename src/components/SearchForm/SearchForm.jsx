import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="form">
          <input
            className="form__input"
            type="text"
            placeholder="Фильм"
            required
          />
          <button className="form__submit" type="submit">
            Найти
          </button>
        </form>
        <div className="search__short-films">
          <FilterCheckbox />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}
export default SearchForm;

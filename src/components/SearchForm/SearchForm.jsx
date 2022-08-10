import React from "react";

import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";

import "./SearchForm.css";

function SearchForm() {
  return (
    <section className="search">
      <div className="search__container">
        <form className="form">
          <div className="form__top">
            <button className="form__submit" type="submit"></button>
          </div>
          <div className="form__bottom">
            <input className="form__input" type="text" placeholder="Фильм" />
          </div>
        </form>
        <div className="search__short-films">
          <p className="search__text">Короткометражки</p>
          <FilterCheckbox />
        </div>
      </div>
    </section>
  );
}
export default SearchForm;

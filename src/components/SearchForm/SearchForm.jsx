import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import "./SearchForm.css";

function SearchForm({
  isLoading,
  onSubmit,
  checkBoxClick,
  searchKeyword,
  isShort,
}) {
  const location = useLocation();
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (searchKeyword.length && location.pathname === "/movies") {
      setSearch(searchKeyword);
    }
  }, []);

  function handleChange(e) {
    console.log(e.target.value);
    setSearch(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!search) {
      setError("Нужно ввести ключевое слово");
      setTimeout(() => {
        setError("");
      }, 2000);
    } else {
      onSubmit(search);
    }
  }

  return (
    <section className="search">
      <div className="search__container">
        <form className="form" onSubmit={handleSubmit} noValidate>
          <div className="form__container">
            <input
              className="form__input"
              type="text"
              placeholder="Фильм"
              required
              value={search || ""}
              onChange={handleChange}
              disabled={isLoading}
            />
            <button className="form__submit" type="submit" disabled={isLoading}>
              Найти
            </button>
          </div>
          {error && <span className="form__error">{error}</span>}
        </form>

        <div className="search__short-films">
          <FilterCheckbox
            checkBoxClick={checkBoxClick}
            isShort={isShort}
            disabled={isLoading}
          />
          <p className="search__text">Короткометражки</p>
        </div>
      </div>
    </section>
  );
}
export default SearchForm;

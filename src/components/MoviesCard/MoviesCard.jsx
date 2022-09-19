import React from "react";

import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

function MoviesCard() {
  let location = useLocation();

  return (
    <section className="element">
      <video className="element__video" poster="">
        <source src="" type="video/mp4" />
      </video>
      <div className="element__container">
        <h2 className="element__title">Фильм</h2>

        {location.pathname === "/saved-movies" && (
          <button
            className="element__delete"
            aria-label="Удалить"
            type="button"
          ></button>
        )}
        {location.pathname === "/movies" && (
          <button
            className="element__like"
            aria-label="Нравится"
            type="button"
          ></button>
        )}
      </div>
      <p className="element__time">1ч 42м</p>
    </section>
  );
}
export default MoviesCard;

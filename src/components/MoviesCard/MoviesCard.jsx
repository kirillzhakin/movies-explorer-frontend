import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";

import "./MoviesCard.css";

import { MOVIES_URL } from "../../utils/constants";

function MoviesCard(props) {
  let location = useLocation();

  const movie = {
    country: props.movie.country || " ",
    director: props.movie.director || " ",
    duration: props.movie.duration || 0,
    year: props.movie.year || " ",
    description: props.movie.description || " ",
    image: `${MOVIES_URL}${props.movie.image?.url}` || " ",
    trailerLink: props.movie.trailerLink || " ",
    nameRU: props.movie.nameRU || " ",
    nameEN: props.movie.nameEN || " ",
    thumbnail:
      `${MOVIES_URL}${props.movie.image?.formats?.thumbnail?.url}` || " ",
    movieId: props.movie.id,
  };

  const savedMovies = JSON.parse(localStorage.getItem("savedMovies"));
  const currentMovie = savedMovies?.find(
    (movie) => movie.nameRU === props.movie.nameRU
  );
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (currentMovie) {
      setIsLiked(true);
    }
  }, [location]);

  const cardLikeButtonClassName = `element__like ${
    isLiked ? "element__like_active" : ""
  }`;

  function handleLikeAddClick() {
    props.onMoviesLike(movie);
    setIsLiked(true);
  }

  function handleDeleteClick() {
    props.onMovieDelete(props.movie._id);
    setIsLiked(false);
  }

  function handleDisLike() {
    props.onMovieDelete(currentMovie._id);
    setIsLiked(false);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч" + minutes + "м";
  }

  return (
    <section className="element">
      <div className="element__video">
        <a
          href={props.movie.trailerLink}
          className="element__link"
          target="blank"
        >
          <img
            alt={props.movie.nameRU}
            className="element__img"
            src={
              props.saved
                ? props.movie.image
                : `${MOVIES_URL}${props.movie.image?.url}`
            }
          />
        </a>
      </div>

      <div className="element__container">
        <h2 className="element__title">{props.movie.nameRU}</h2>

        {location.pathname === "/saved-movies" && (
          <button
            className="element__delete"
            onClick={handleDeleteClick}
            aria-label="Удалить"
            type="button"
          ></button>
        )}
        {location.pathname === "/movies" && (
          <button
            className={cardLikeButtonClassName}
            onClick={isLiked ? handleDisLike : handleLikeAddClick}
            aria-label="Нравится"
            type="button"
          ></button>
        )}
      </div>
      <p className="element__time">{getTimeFromMins(props.movie.duration)}</p>
    </section>
  );
}
export default MoviesCard;

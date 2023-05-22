import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./MoviesCard.css";
import { MOVIES_URL } from "../../utils/constants";

function MoviesCard({
  onMoviesLike,
  onMovieDelete,
  savedMovies,
  movie,
  saved,
}) {
  let location = useLocation();

  const film = {
    country: movie.country || " ",
    director: movie.director || " ",
    duration: movie.duration || 0,
    year: movie.year || " ",
    description: movie.description || " ",
    image: `${MOVIES_URL}${movie.image?.url}` || " ",
    trailerLink: movie.trailerLink || " ",
    nameRU: movie.nameRU || " ",
    nameEN: movie.nameEN || " ",
    thumbnail: `${MOVIES_URL}${movie.image?.formats?.thumbnail?.url}` || " ",
    movieId: movie.id,
  };

  const currentMovie = savedMovies?.find(
    (movi) => movi.nameRU === movie.nameRU
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
    onMoviesLike(film);
    setIsLiked(true);
  }

  function handleDeleteClick() {
    onMovieDelete(movie._id);
    setIsLiked(false);
  }

  function handleDisLike() {
    onMovieDelete(currentMovie._id);
    setIsLiked(false);
  }

  function getTimeFromMins(mins) {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    return hours + "ч" + minutes + "м";
  }

  return (
    <section className="element">
      <a href={movie.trailerLink} className="element__video" target="blank">
        <img
          alt={movie.nameRU}
          className="element__img"
          src={saved ? movie.image : `${MOVIES_URL}${movie.image.url}`}
        />
      </a>

      <div className="element__container">
        <h2 className="element__title">{movie.nameRU}</h2>

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
      <p className="element__time">{getTimeFromMins(movie.duration)}</p>
    </section>
  );
}
export default MoviesCard;

import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import {
  ADDING_CARDS,
  NUMBER_OF_CARD,
  WINDOW_WIDTH,
} from "../../utils/constants";

function MoviesCardList(props) {
  let location = useLocation();

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
  }, []);

  const [initialCardsCurrent, setInitialCardsCurrent] = useState(() => {
    const windowSize = window.innerWidth;
    if (windowSize < WINDOW_WIDTH.SMALL) {
      return NUMBER_OF_CARD.MIN;
    } else if (windowSize <= WINDOW_WIDTH.MEDIUM) {
      return NUMBER_OF_CARD.MEAN;
    } else if (windowSize < WINDOW_WIDTH.LARGE) {
      return NUMBER_OF_CARD.MAX;
    } else if (windowSize > WINDOW_WIDTH.LARGE) {
      return NUMBER_OF_CARD.MAX;
    }
  });
  const [moreCards] = useState(() => {
    const windowSize = window.innerWidth;
    if (windowSize <= WINDOW_WIDTH.MEDIUM) {
      return ADDING_CARDS.MIN;
    } else if (windowSize >= WINDOW_WIDTH.MEDIUM + 1) {
      return ADDING_CARDS.MAX;
    }
  });

  function handleScreenWidth() {
    const windowSize = window.innerWidth;
    if (windowSize < WINDOW_WIDTH.SMALL) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MIN);
    } else if (windowSize <= WINDOW_WIDTH.MEDIUM) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MEAN);
    } else if (windowSize < WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX);
    } else if (windowSize > WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX);
    }
  }

  const displayMovies = props.movies?.slice(0, initialCardsCurrent);

  function handleMoviesIncrease() {
    setInitialCardsCurrent((prevState) => {
      return prevState + moreCards;
    });
  }

  return (
    <section className="elements">
      {props.notFoundMovies && <span className="elements__not-found">Ничего не найдено</span>}
      <div className="elements__container">
        {displayMovies?.map((movie) => {
          return (
            <MoviesCard
              onMovieDelete={props.onMovieDelete}
              saved={props.saved}
              onMoviesLike={props.onMoviesLike}
              key={props.saved ? movie._id : movie.id}
              movie={movie}
            />
          );
        })}
      </div>
      {location.pathname !== "/saved-movies" && (
        <button
          className={`elements__button ${
            props.movies?.length === displayMovies?.length
              ? "elements__button_invisible"
              : ""
          }`}
          onClick={handleMoviesIncrease}
        >
          Еще
        </button>
      )}
    </section>
  );
}
export default MoviesCardList;

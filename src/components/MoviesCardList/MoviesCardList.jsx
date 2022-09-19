import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import MoviesCard from "../MoviesCard/MoviesCard";
import "./MoviesCardList.css";

import {
  ADDING_CARDS,
  NUMBER_OF_CARD,
  WINDOW_WIDTH,
} from "../../utils/constants";

function MoviesCardList({
  onMoviesLike,
  onMovieDelete,
  savedMovies,
  movies,
  loadingError,
  saved,
}) {
  let location = useLocation();

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

  const [moreCards, setMoreCards] = useState(() => {
    const windowSize = window.innerWidth;
    if (windowSize < WINDOW_WIDTH.SMALL) {
      return ADDING_CARDS.MIN;
    } else if (windowSize <= WINDOW_WIDTH.MEDIUM) {
      return ADDING_CARDS.MIN;
    } else if (windowSize < WINDOW_WIDTH.LARGE) {
      return ADDING_CARDS.MEAN;
    } else if (windowSize > WINDOW_WIDTH.LARGE) {
      return ADDING_CARDS.MAX;
    }
  });

  useEffect(() => {
    window.addEventListener("resize", handleScreenWidth);
    return () => {
      window.removeEventListener("resize", handleScreenWidth);
    };
  }, []);

  function handleScreenWidth() {
    const windowSize = window.innerWidth;

    if (windowSize < WINDOW_WIDTH.SMALL) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MIN);
      setMoreCards(ADDING_CARDS.MIN);
    } else if (windowSize <= WINDOW_WIDTH.MEDIUM) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MEAN);
      setMoreCards(ADDING_CARDS.MIN);
    } else if (windowSize < WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX);
      setMoreCards(ADDING_CARDS.MEAN);
    } else if (windowSize > WINDOW_WIDTH.LARGE) {
      setInitialCardsCurrent(NUMBER_OF_CARD.MAX);
      setMoreCards(ADDING_CARDS.MAX);
    }
  }

  const displayMovies = movies?.slice(0, initialCardsCurrent);

  function handleMoviesIncrease() {
    setInitialCardsCurrent((prevState) => {
      return prevState + moreCards;
    });
  }

  return (
    <section className="elements">
      <span className="elements__not-found">{loadingError}</span>

      <div className="elements__container">
        {displayMovies?.map((movie) => {
          return (
            <MoviesCard
              onMoviesLike={onMoviesLike}
              onMovieDelete={onMovieDelete}
              savedMovies={savedMovies}
              key={movie.id}
              movie={movie}
              saved={saved}
            />
          );
        })}
      </div>
      {location.pathname !== "/saved-movies" && (
        <button
          className={`elements__button ${
            movies?.length === displayMovies?.length
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

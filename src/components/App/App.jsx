import React, { useEffect, useReducer, useState } from "react";
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";
import Layout from "../Layout/Layout";
import Main from "../Main/Main";
import Movies from "../Movies/Movies";
import SavedMovies from "../SavedMovies/SavedMovies";
import Login from "../Login/Login";
import Register from "../Register/Register";
import Profile from "../Profile/Profile";
import Preloader from "../Preloader/Preloader";
import Error from "../Error/Error";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { movi } from "../../utils/MoviesApi";
import { main } from "../../utils/MainApi";
import { SHORT_MOVIE_DURATION } from "../../utils/constants";

import "./App.css";
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  let location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: "", email: "" });
  const [currentUser, setCurrentUser] = useState({});

  const [allMovies, setAllMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);

  const [notFoundMovies, setNotFoundMovies] = useState(false);
  const [isShortMoviesChecked, setIsShortMoviesChecked] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [profileMessage, setProfileMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);

  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  //Регистрация
  function handleRegister(name, email, password) {
    console.log("регистрация:", name, email, password);
    setRegisterErrorMessage("");
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((userData) => {
        setUserData({ name: userData.name, email: userData.email });
        handleLogin(email, password);
      })
      .catch((res) => {
        if (res.statusText === "Bad Request") {
          setRegisterErrorMessage("Введены невалидные данные");
        } else if (res.status === 409) {
          setRegisterErrorMessage("Такой E-mail уже существует");
        } else {
          setRegisterErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Вход
  function handleLogin(email, password) {
    setRegisterErrorMessage("");
    setIsLoading(true);
    auth
      .login(email, password)
      .then((res) => {
        if (res.token) {
          localStorage.setItem("token", res.token);
          setIsLoggedIn(true);
          setLoginErrorMessage("");
          main
            .getUserInfo(res.token)
            .then((userData) => {
              setCurrentUser(userData);
            })
            .catch((res) => {
              setLoginErrorMessage(
                `Что-то пошло не так...Ошибка ${res.status}`
              );
            });
          navigate("/movies");
        }
      })
      .catch((res) => {
        if (res.statusText === "Bad Request") {
          setLoginErrorMessage("Введены невалидные данные");
        } else if (res.status === 409) {
          setLoginErrorMessage("Такой E-mail уже существует");
        } else {
          setLoginErrorMessage(`Что-то пошло не так...Ошибка ${res.status}`);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Редактирование профиля
  function handleUpdateUser(name, email) {
    console.log("профиль", name, email);
    const token = localStorage.getItem("token");
    main
      .setUserInfo(token, name, email)
      .then((name, email) => {
        setCurrentUser(name, email);
        setProfileMessage("Профиль успешно обновлен!");
        setIsSuccess(true);
      })
      .catch((res) => {
        setIsSuccess(false);
        if (res.statusText === "Bad Request") {
          setProfileMessage("Введены невалидные данные");
        } else if (res.status === 409) {
          setProfileMessage("Такой E-mail уже существует");
        } else {
          setProfileMessage(
            `При обновлении профиля произошла, ошибка ${res.status}`
          );
        }
      });
  }

  function handleShortMoviesChecked(e) {
    setIsShortMoviesChecked(e.target.checked);
  }

  // Поиск фильмов
  const searchMovies = (word) => {
    setIsLoading(true);
    setMovies([]);
    setNotFoundMovies(false);

    if (allMovies.length === 0) {
      movi
        .getInitialMovies()
        .then((movies) => {
          setAllMovies(movies);
          const searchResult = handleSearchMovies(movies, word);
          if (searchResult.length === 0) {
            setNotFoundMovies(true);
            setMovies([]);
          } else {
            localStorage.setItem("movies", JSON.stringify(searchResult));
            setMovies(JSON.parse(localStorage.getItem("movies")));
            setNotFoundMovies(false);
          }
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте еще раз`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else {
      const searchResult = handleSearchMovies(allMovies, word);
      if (searchResult.length === 0) {
        setNotFoundMovies(true);
        setMovies([]);
        setIsLoading(false);
      } else if (searchResult.length !== 0) {
        localStorage.setItem("movies", JSON.stringify(searchResult));
        setMovies(JSON.parse(localStorage.getItem("movies")));
        setIsLoading(false);
        setNotFoundMovies(false);
      }
    }
  };

  // Добавить фильм в избранное
  function handleAddMovies(movie) {
    const token = localStorage.getItem("token");
    main
      .addMovies(movie, token)
      .then((saveMovie) => {
        const movies = [...savedMovies, saveMovie];
        localStorage.setItem("savedMovies", JSON.stringify(movies));
        setSavedMovies((prevState) => [...prevState, saveMovie]);
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      });
  }

  //Удаленить фильм из избранного
  function handleMovieDelete(movieId) {
    const token = localStorage.getItem("token");
    main
      .deleteMovies(movieId, token)
      .then(() => {
        const newSavedMovies = savedMovies.filter((deletedMovie) => {
          console.log(savedMovies, deletedMovie);
          return deletedMovie._id !== movieId;
        });
        setSavedMovies(newSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      });
  }

  //фильтр названия фильмов
  const handleSearchMovies = (movies, word) => {
    const filterRegex = new RegExp(word, "gi");
    return movies.filter((movie) => {
      if (isShortMoviesChecked) {
        return (
          movie.duration <= SHORT_MOVIE_DURATION &&
          filterRegex.test(movie.nameRU)
        );
      } else {
        return filterRegex.test(movie.nameRU);
      }
    });
  };

  //поиск по сохраненным фильтрам
  function searchSavedMovies(word) {
    const allSavedMovies = JSON.parse(localStorage.getItem("savedMovies"));
    const searchSavedResult = handleSearchMovies(allSavedMovies, word);
    if (searchSavedResult.length === 0) {
      setNotFoundMovies(true);
      setSavedMovies([]);
      setIsLoading(false);
    } else {
      setSavedMovies(searchSavedResult);
      setIsLoading(false);
      setNotFoundMovies(false);
    }
  }

  //Выход
  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("movies");
    localStorage.removeItem("savedMovies");
    setIsLoggedIn(false);
    setAllMovies([]);
    setMovies([]);
    setSavedMovies([]);
    setNotFoundMovies(false);
    setCurrentUser("");
    navigate("/");
  }

  // Функция очистки сообщений об ошибки
  function clearErrorMessages() {
    setRegisterErrorMessage("");
    setLoginErrorMessage("");
  }

  // Бургер меню вкл/выкл
  function handleMenuClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  //Токен
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((userData) => {
          console.log(userData);
          setUserData({ name: userData.name, email: userData.email });
          setCurrentUser(userData);
          setIsLoggedIn(true);
          navigate("/movies");
        })
        .catch((err) => {
          console.log(`${err}`);
        });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/saved-movies") {
      const token = localStorage.getItem("token");
      setIsLoading(true);
      main
        .getSavedMovies(token)
        .then((savedMovies) => {
          setSavedMovies(savedMovies);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте еще раз`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    if (location.pathname === "/movies") {
      const token = localStorage.getItem("token");
      const searchedMovies = JSON.parse(localStorage.getItem("movies"));
      setIsLoading(true);
      Promise.all([main.getUserInfo(token), main.getSavedMovies(token)])
        .then(([userData, movies]) => {
          setCurrentUser(userData);
          localStorage.setItem("savedMovies", JSON.stringify(movies));
          setSavedMovies(movies);
          setMovies(searchedMovies);
          setIsLoading(true);
        })
        .catch((err) => {
          console.log(`Ошибка ${err}, попробуйте еще раз`);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, []);

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? <Preloader /> : null}
        
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isMenu={isLoggedIn}
                isMenuOpen={isMenuOpen}
                handleMenuClick={handleMenuClick}
                onClose={closeMenu}
              />
            }
          >
            <Route index path="/" element={<Main />} />

            <Route
              index
              path="/movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Movies
                    onMovieDelete={handleMovieDelete}
                    onMoviesLike={handleAddMovies}
                    movies={movies}
                    isLoading={isLoading}
                    isShortMoviesChecked={isShortMoviesChecked}
                    onShortMoviesCheck={handleShortMoviesChecked}
                    onSearchMovies={searchMovies}
                    notFoundMovies={notFoundMovies}
                  />
             
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/saved-movies"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <SavedMovies
                    movies={savedMovies}
                    isLoading={isLoading}
                    onMovieDelete={handleMovieDelete}
                    isShortMoviesChecked={isShortMoviesChecked}
                    onShortMoviesCheck={handleShortMoviesChecked}
                    onSearchSavedMovies={searchSavedMovies}
                    notFoundMovies={notFoundMovies}
                  />
    
                </ProtectedRoute>
              }
            />
            <Route
              index
              path="/profile"
              element={
                <ProtectedRoute isLoggedIn={isLoggedIn}>
                  <Profile
                    userData={userData}
                    handleSignOut={handleSignOut}
                    onUpdateUser={handleUpdateUser}
                    isSuccess={isSuccess}
                    profileMessage={profileMessage}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                <Register
                  onRegister={handleRegister}
                  errorMessage={registerErrorMessage}
                  onClear={clearErrorMessages}
                />
              }
            />
            <Route
              path="/signin"
              element={
                <Login
                  onLogin={handleLogin}
                  errorMessage={loginErrorMessage}
                  onClear={clearErrorMessages}
                />
              }
            />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

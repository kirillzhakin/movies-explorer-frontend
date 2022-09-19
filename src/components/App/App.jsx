import React, { useEffect, useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  useLocation,
  Navigate,
} from "react-router-dom";
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

import "./App.css";
import * as auth from "../../utils/auth";

function App() {
  const navigate = useNavigate();
  let location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState({});
  const [allMovies, setAllMovies] = useState(
    JSON.parse(localStorage.getItem("loadedMovies")) || []
  );
  const [movies, setMovies] = useState([]);
  const [savedMovies, setSavedMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState(
    JSON.parse(localStorage.getItem("filteredMovies")) || []
  );
  const [searchKeyword, setSearchKeyword] = useState(
    localStorage.getItem("searchKeyword") || ""
  );
  const [loadingError, setLoadingError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingForm, setIsLoadingForm] = useState(false);
  const [profileMessage, setProfileMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(true);
  const [registerErrorMessage, setRegisterErrorMessage] = useState("");
  const [loginErrorMessage, setLoginErrorMessage] = useState("");

  //Регистрация
  function handleRegister(name, email, password) {
    setRegisterErrorMessage("");
    setIsLoading(true);
    auth
      .register(name, email, password)
      .then((userData) => {
        if (userData) {
          handleLogin(email, password);
        }
      })
      .catch((res) => {
        if (res === "Ошибка: 400") {
          setRegisterErrorMessage("Введены невалидные данные");
        } else if (res === "Ошибка: 409") {
          setRegisterErrorMessage("Такой E-mail уже существует");
        } else {
          setRegisterErrorMessage(`Что-то пошло не так...${res}`);
        }
        setTimeout(() => {
          setRegisterErrorMessage("");
        }, 3000);
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
              if (userData) {
                setCurrentUser(userData);
              }
            })
            .catch((res) => {
              setLoginErrorMessage(`Что-то пошло не так...${res}`);
            });
          navigate("/movies");
        }
      })
      .catch((res) => {
        if (res === "Ошибка: 400") {
          setLoginErrorMessage("Введены невалидные данные");
        } else if (res === "Ошибка: 401") {
          setLoginErrorMessage("Неправильные почта или пароль");
        } else {
          setLoginErrorMessage(`Что-то пошло не так...${res}`);
        }
        setTimeout(() => {
          setLoginErrorMessage("");
        }, 3000);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }

  //Токен
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      auth
        .checkToken(token)
        .then((res) => {
          if (res) {
            main
              .getUserInfo(token)
              .then((userData) => {
                if (userData) {
                  setCurrentUser(userData);
                }
              })
              .catch((res) => {
                setLoginErrorMessage(`Что-то пошло не так...${res}`);
              });
          }
          setIsLoggedIn(true);
          navigate(location.pathname, { replace: true });
        })
        .catch((err) => {
          console.log(`${err}`);
          localStorage.removeItem("token");
          setIsLoggedIn(false);
          navigate("/");
        });
    }
  }, []);

  //Редактирование профиля
  function handleUpdateUser(name, email) {
    const token = localStorage.getItem("token");
    setIsLoadingForm(true);
    main
      .setUserInfo(token, name, email)
      .then((name, email) => {
        setCurrentUser(name, email);
        setProfileMessage("Профиль успешно обновлен!");
        setIsSuccess(true);
        setTimeout(() => {
          setProfileMessage("");
        }, 2000);
      })
      .catch((res) => {
        setIsSuccess(false);
        if (res === "Ошибка: 400") {
          setProfileMessage("Введены невалидные данные");
        } else if (res === "Ошибка: 409") {
          setProfileMessage("Такой E-mail уже существует");
        } else {
          setProfileMessage(`При обновлении профиля произошла, ${res}`);
        }
        setTimeout(() => {
          setProfileMessage("");
        }, 3000);
      })
      .finally(() => {
        setIsLoadingForm(false);
      });
  }

  function getInitialMovies() {
    movi
      .getInitialMovies()
      .then((data) => {
        setAllMovies(data);
        localStorage.setItem("loadedMovies", JSON.stringify(data));
      })
      .catch((err) => {
        localStorage.removeItem("loadedMovies");
        console.log(`Ошибка ${err}, попробуйте еще раз`);
        setLoadingError(
          "Во время запроса произошла ошибка. " +
            "Возможно, проблема с соединением или сервер недоступен. " +
            "Подождите немного и попробуйте ещё раз"
        );
        setTimeout(() => {
          setLoadingError("");
        }, 3000);
      });
  }

  function getSavedMovies() {
    const token = localStorage.getItem("token");
    main
      .getSavedMovies(token)
      .then((data) => {
        setSavedMovies(data);
        localStorage.setItem("savedMovies", JSON.stringify(data));
      })
      .catch((err) => {
        localStorage.removeItem("savedMovies");
        console.log(`Ошибка ${err}, попробуйте еще раз`);
        setLoadingError(
          "Во время запроса произошла ошибка. " +
            "Возможно, проблема с соединением или сервер недоступен. " +
            "Подождите немного и попробуйте ещё раз"
        );
        setTimeout(() => {
          setLoadingError("");
        }, 3000);
      });
  }

  // Запрос данных с сервера
  useEffect(() => {
    if (isLoggedIn && allMovies.length === 0) {
      getInitialMovies();
    }
    if (isLoggedIn && savedMovies.length === 0) {
       getSavedMovies();
    }
    if (filteredMovies.length) {
      setMovies(filteredMovies);
    }
    
  }, [allMovies, filteredMovies, savedMovies, isLoggedIn]);

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
          return deletedMovie._id !== movieId;
        });
        setSavedMovies(newSavedMovies);
        localStorage.setItem("savedMovies", JSON.stringify(newSavedMovies));
      })
      .catch((err) => {
        console.log(`Ошибка ${err}, попробуйте еще раз`);
      });
  }

  //Выход
  function handleSignOut() {
    localStorage.removeItem("token");
    localStorage.removeItem("loadedMovies");
    localStorage.removeItem("savedMovies");
    localStorage.removeItem("checkBox");
    localStorage.removeItem("searchKeyword");
    localStorage.removeItem("filteredMovies");
    setIsLoggedIn(false);
    setCurrentUser("");
    setMovies([]);
    setAllMovies([]);
    setSavedMovies([]);
    setSearchKeyword("");
    setFilteredMovies([]);
    setLoadingError("");
    navigate("/");
  }

  function searchMovies(movie, name) {
    return movie.filter((m) =>
      m.nameRU.toLowerCase().includes(name.toLowerCase())
    );
  }
  // Поиск фильмов
  function handleSearchMovies(name) {
    setIsLoading(true);
    const newMovies = searchMovies(allMovies, name);
    if (newMovies.length === 0) {
      localStorage.setItem("filteredMovies", JSON.stringify(newMovies));
      setFilteredMovies(newMovies);
      localStorage.setItem("searchKeyword", name);
      setSearchKeyword(name);
      setLoadingError("Ничего не найдено");
      setTimeout(() => {
        setLoadingError("");
      }, 3000);

      setMovies(newMovies);
      setIsLoading(false);
    } else if (newMovies.length !== 0) {
      setMovies(newMovies);
      localStorage.setItem("filteredMovies", JSON.stringify(newMovies));
      setFilteredMovies(newMovies);
      localStorage.setItem("searchKeyword", name);
      setSearchKeyword(name);
      setIsLoading(false);
    }
  }

  // Функция очистки сообщений об ошибкe
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

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        {isLoading ? <Preloader /> : null}

        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isLoggedIn={isLoggedIn}
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
                    onSubmit={handleSearchMovies}
                    movies={movies}
                    savedMovies={savedMovies}
                    isLoading={isLoading}
                    loadingError={loadingError}
                    searchKeyword={searchKeyword}
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
                    onMovieDelete={handleMovieDelete}
                    isLoading={isLoading}
                    movies={savedMovies}
                    savedMovies={savedMovies}
                    loadingError={loadingError}
                    searchKeyword={searchKeyword}
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
                    handleSignOut={handleSignOut}
                    onUpdateUser={handleUpdateUser}
                    isLoadingForm={isLoadingForm}
                    isSuccess={isSuccess}
                    profileMessage={profileMessage}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path="/signup"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Register
                    isLoading={isLoading}
                    onRegister={handleRegister}
                    errorMessage={registerErrorMessage}
                    onClear={clearErrorMessages}
                  />
                )
              }
            />
            <Route
              path="/signin"
              element={
                isLoggedIn ? (
                  <Navigate to="/" />
                ) : (
                  <Login
                    isLoading={isLoading}
                    onLogin={handleLogin}
                    errorMessage={loginErrorMessage}
                    onClear={clearErrorMessages}
                  />
                )
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

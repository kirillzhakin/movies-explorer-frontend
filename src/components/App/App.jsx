import React, { useState } from "react";

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
import { Route, Routes } from "react-router-dom";

import "./App.css";
import "../../vendor/fonts/fonts.css";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function handleMenuClick() {
    setIsMenuOpen(true);
  }

  function closeMenu() {
    setIsMenuOpen(false);
  }

  const [isLoad, setIsLoad] = useState(false);

  return (
    <CurrentUserContext.Provider>
      <div className="page">
        {isLoad ? <Preloader /> : null}
        <Routes>
          <Route
            path="/"
            element={
              <Layout
                isMenuOpen={isMenuOpen}
                handleMenuClick={handleMenuClick}
                onClose={closeMenu}
              />
            }
          >
            <Route index path="/" element={<Main />} />

            <Route index path="/movies" element={<Movies />} />
            <Route index path="/saved-movies" element={<SavedMovies />} />
            <Route index path="/profile" element={<Profile />} />

            <Route path="/signup" element={<Register />} />
            <Route path="/signin" element={<Login />} />
          </Route>

          <Route path="*" element={<Error />} />
        </Routes>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;

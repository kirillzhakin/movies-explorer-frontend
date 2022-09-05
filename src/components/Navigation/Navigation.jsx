import React from "react";

import { NavLink } from "react-router-dom";

import "./Navigation.css";

function Navigation(props) {
  return (
    <header className="navigation">
      <div className="navigation__container">
        <NavLink
          className="navigation__logo"
          type="button"
          aria-label="Главная"
          to="/"
        ></NavLink>

        <button
          className="navigation__burger"
          aria-label="Меню"
          type="button"
          onClick={props.handleMenuClick}
        />

        <div
          className={`navigation__menu ${
            props.isMenuOpen && "navigation__menu_opened"
          }`}
        >
          <div className="navigation__box">
            <button
              className="navigation__close"
              aria-label="Выход"
              type="button"
              onClick={props.onClose}
            ></button>

            <ul className="navigation__menu-nav">
              <li>
                <NavLink
                  className="navigation__button"
                  type="button"
                  aria-label="Главная"
                  to="/"
                >
                  Главная
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navigation__button navigation__button_movies"
                  type="button"
                  aria-label="Фильмы"
                  to="/movies"
                >
                  Фильмы
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="navigation__button navigation__button_movies"
                  type="button"
                  aria-label="Сохранённые фильмы"
                  to="/saved-movies"
                >
                  Сохранённые фильмы
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="navigation__button navigation__button_profile"
                  type="button"
                  aria-label="Аккаунт"
                  to="/profile"
                >
                  Аккаунт
                </NavLink>
              </li>
            </ul>
          </div>
        </div>

        <ul className="navigation__nav">
          <li>
            <NavLink
              className="navigation__button"
              type="button"
              aria-label="Фильмы"
              to="/movies"
            >
              Фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navigation__button navigation__button_movies"
              type="button"
              aria-label="Сохранённые фильмы"
              to="/saved-movies"
            >
              Сохранённые фильмы
            </NavLink>
          </li>
          <li>
            <NavLink
              className="navigation__button navigation__button_profile"
              type="button"
              aria-label="Аккаунт"
              to="/profile"
            >
              Аккаунт
            </NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Navigation;

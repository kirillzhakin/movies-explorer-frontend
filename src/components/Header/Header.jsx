import React from "react";

import Logo from "../../images/logo__COLOR_main-1.svg";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
  return (
    <header className="header">
      <img className="header__img" src={Logo} alt="Лого" />
      <ul className="header__nav">
        <li>
          <Link
            className="header__button header__button_reg"
            type="button"
            aria-label="Регистрация"
            to="/signup"
          >
            Регистрация
          </Link>
        </li>
        <li>
          <Link
            className="header__button header__button_enter"
            type="button"
            aria-label="Войти"
            to="/signin"
          >
            Войти
          </Link>
        </li>
      </ul>
    </header>
  );
}

export default Header;

import React from "react";

import { Link } from "react-router-dom";

import "./AuthForm.css";

function AuthForm() {
  return (
    <form className="login__form">
      <Link
        className="login__logo"
        type="button"
        aria-label="Главная"
        to="/"
      ></Link>

      <h1 className="login__title">Рады видеть!</h1>

      <label className="login__label">E-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        className="login__input"
        required
      />
      <label className="login__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="login__input"
        required
        minLength={3}
      />
      <div className="login__error">Что-то пошло не так...</div>

      <button type="submit" name="submit" className="login__button">
        Войти
      </button>
    </form>
  );
}

export default AuthForm;

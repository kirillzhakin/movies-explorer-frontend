import React from "react";

import { Link } from "react-router-dom";

import "./RegForm.css";

function RegForm() {
  return (
    <form className="register__form">
      <Link
        className="register__logo"
        type="button"
        aria-label="Главная"
        to="/"
      ></Link>

      <h1 className="register__title">Добро пожаловать!</h1>

      <label className="register__label">Имя</label>
      <input
        type="text"
        name="name"
        id="name"
        className="register__input"
        required
      />
      <label className="register__label">E-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        className="register__input"
        required
      />
      <label className="register__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="register__input register__input_password"
        required
        minLength={3}
        maxLength={8}
      />
      <div className="register__error">Что-то пошло не так...</div>

      <button type="submit" name="submit" className="register__button">
        Зарегестрироваться
      </button>
    </form>
  );
}

export default RegForm;

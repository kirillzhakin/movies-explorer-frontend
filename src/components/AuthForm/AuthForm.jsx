import React from "react";
import { Link } from "react-router-dom";
import { useFormWithValidation } from "../../utils/FormValidation";

import "./AuthForm.css";

function AuthForm(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onLogin(values.email, values.password);
  }

  return (
    <form className="login__form" onSubmit={handleSubmit}>
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
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="login__error">{errors.email}</span>
      <label className="login__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="login__input"
        required
        minLength={3}
        maxLength={8}
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="login__error">{errors.password}</span>
      <span className="login__error">{props.errorMessage}</span>

      <button
        type="submit"
        name="submit"
        className={`login__button  ${isValid ? "" : "login__button_disabled"}`}
        disabled={!isValid}
      >
        Войти
      </button>
    </form>
  );
}

export default AuthForm;

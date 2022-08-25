import React from "react";
import { Link } from "react-router-dom";
import "./RegForm.css";
import { useFormWithValidation } from "../../utils/FormValidation";

function RegForm(props) {
  const { values, handleChange, errors, isValid } = useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onRegister(values.name, values.email, values.password);
  }

  return (
    <form className="register__form" onSubmit={handleSubmit}>
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
        pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
        value={values.name || ""}
        onChange={handleChange}
      />
      <span className="register__error">{errors.name}</span>
      <label className="register__label">E-mail</label>
      <input
        type="email"
        name="email"
        id="email"
        className="register__input"
        required
        value={values.email || ""}
        onChange={handleChange}
      />
      <span className="register__error">{errors.email}</span>
      <label className="register__label">Пароль</label>
      <input
        type="password"
        name="password"
        id="password"
        className="register__input register__input_password"
        required
        minLength={3}
        maxLength={8}
        value={values.password || ""}
        onChange={handleChange}
      />
      <span className="register__error">{errors.password}</span>
      <span className="register__error">{props.errorMessage}</span>
      <button
        type="submit"
        name="submit"
        className={`register__button ${
          isValid ? "" : "register__button_disabled"
        }`}
        disabled={!isValid}
      >
        Зарегестрироваться
      </button>
    </form>
  );
}

export default RegForm;

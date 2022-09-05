import React from "react";
import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { CurrentUserContext } from "../../contexts/CurrentUserContext";
import { useFormWithValidation } from "../../utils/FormValidation";

import "./Profile.css";

function Profile(props) {
  const [isFormDisabled, setIsFormDisabled] = useState(false);

  const currentUser = useContext(CurrentUserContext);

  const { values, handleChange, errors, isValid, setValues, setIsValid } =
    useFormWithValidation();

  function handleSubmit(e) {
    e.preventDefault();
    props.onUpdateUser(values.name, values.email);
  }

  useEffect(() => {
    props.isLoadingForm ? setIsFormDisabled(true) : setIsFormDisabled(false);
  }, [props.isLoadingForm]);

  useEffect(() => {
    setValues(currentUser);
  }, [currentUser, setValues]);

  useEffect(() => {
    if (
      values.name === currentUser.name &&
      values.email === currentUser.email
    ) {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [values]);

  return (
    <form className="profile" noValidate onSubmit={handleSubmit}>
      <h2 className="profile__title">Привет, {currentUser.name}!</h2>
      <div className="profile__container profile__container_top">
        <p className="profile__data">Имя</p>
        <input
          type="text"
          name="name"
          id="name"
          className="profile__user"
          required
          minLength={2}
          pattern="[а-яА-Яa-zA-ZёË\- ]{1,}"
          value={values.name || ""}
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <span className="profile__error">
        {errors.name ? `${errors.name} Формат: а-яА-Яa-zA-Z ` : ""}
      </span>
      <div className="profile__container profile__container_bottom">
        <p className="profile__data">E-mail</p>
        <input
          type="email"
          name="email"
          id="email"
          className="profile__user"
          required
          pattern="^([A-Za-z0-9_\-.])+@([A-Za-z0-9_\-.])+\.([A-Za-z]{2,4})$"
          value={values.email || ""}
          onChange={handleChange}
          disabled={isFormDisabled}
        />
      </div>
      <span className="profile__error">
        {errors.email ? `${errors.email} Формат: email@mail.ru ` : ""}
      </span>
      <span
        className={`profile__message ${
          props.isSuccess
            ? "profile__message_type_success"
            : "profile__message_type_error"
        }`}
      >
        {props.profileMessage}
      </span>
      <ul className="profile__nav">
        <li>
          <button
            type="submit"
            name="submit"
            className={`profile__button profile__button_redact ${
              isValid ? "" : "profile__button_disabled"
            }`}
            disabled={!isValid || isFormDisabled}
          >
            Редактировать
          </button>
        </li>
        <li>
          <Link
            className="profile__button profile__button_exit"
            to="/"
            onClick={props.handleSignOut}
          >
            Выйти из аккаунта
          </Link>
        </li>
      </ul>
    </form>
  );
}

export default Profile;

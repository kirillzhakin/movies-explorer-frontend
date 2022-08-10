import React from "react";
import { Link } from "react-router-dom";

import "./Profile.css";

function Profile() {
  return (
    <div className="profile">
      <h2 className="profile__title">Привет, Кирилл!</h2>
      <div className="profile__container profile__container_top">
        <p className="profile__data">Имя</p>
        <p className="profile__user">Кирилл</p>
      </div>
      <div className="profile__container profile__container_bottom">
        <p className="profile__data">E-mail</p>
        <p className="profile__user">kirillzhakin@mail.ru</p>
      </div>
      <ul className="profile__nav">
        <li>
          <Link className="profile__button" to="/signup">
            Редактировать
          </Link>
        </li>
        <li>
          <Link className="profile__button profile__button_exit" to="/">
            Выйти из аккаунта
          </Link>
        </li>
      </ul>
    </div>
  );
}

export default Profile;

import React from "react";

import { Link } from "react-router-dom";
import RegForm from "../RegForm/RegForm";

import "./Register.css";

function Register() {
  return (
    <div className="register">
      <RegForm />
      <div className="register__signin">
        <p className="register__signin-parag">Уже зарегистрированы?</p>
        <Link className="register__nav" to="/signin">
          Войти
        </Link>
      </div>
    </div>
  );
}

export default Register;

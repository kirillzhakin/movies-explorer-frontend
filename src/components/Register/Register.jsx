import React from "react";
import { Link } from "react-router-dom";
import RegForm from "../RegForm/RegForm";

import "./Register.css";

function Register(props) {
  return (
    <div className="register">
      <RegForm
        onRegister={props.onRegister}
        errorMessage={props.errorMessage}
        onClear={props.onClear}
      />
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

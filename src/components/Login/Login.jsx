import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../AuthForm/AuthForm";

import "./Login.css";

function Login(props) {
  return (
    <div className="login">
      <AuthForm
        onLogin={props.onLogin}
        errorMessage={props.errorMessage}
        onClear={props.onClear}
      />
      <div className="login__signup">
        <p className="login__signup-parag">Еще не зарегистрированы?</p>
        <Link className="login__nav" to="/signup">
          Регистрация
        </Link>
      </div>
    </div>
  );
}

export default Login;

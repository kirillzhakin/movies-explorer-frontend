import React from "react";
import { useNavigate } from "react-router-dom";

import "./Error.css";

function Error() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  return (
    <>
      <div className="error">
        <h2 className="error__title">404</h2>
        <h3 className="error__text">Страница не найдена</h3>
        <button className="error__nav" onClick={goBack}>
          Назад
        </button>
      </div>
    </>
  );
}

export default Error;

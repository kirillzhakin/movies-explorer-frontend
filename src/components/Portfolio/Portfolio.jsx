import React from "react";
import "./Portfolio.css";

import arrow from "../../images/font-main.svg";

function Portfolio() {
  return (
    <section className="portfolio">
      <p className="portfolio__text">Портфолио</p>

      <ul className="portfolio__links">
        <li className="portfolio__link-box">
          <a
            href="https://github.com/kirillzhakin/how-to-learn"
            className="portfolio__link"
            target="blank"
          >
            Статичный сайт
            <img src={arrow} alt="Стрелка" className="portfolio__img" />
          </a>
        </li>
        <li className="portfolio__link-box">
          <a
            href="https://github.com/kirillzhakin/russian-travel"
            className="portfolio__link"
            target="blank"
          >
            Адаптивный сайт
            <img src={arrow} alt="Стрелка" className="portfolio__img" />
          </a>
        </li>
        <li className="portfolio__link-box">
          <a
            href="https://github.com/kirillzhakin/react-mesto-auth"
            className="portfolio__link"
            target="blank"
          >
            Одностраничное приложение
            <img src={arrow} alt="Стрелка" className="portfolio__img" />
          </a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

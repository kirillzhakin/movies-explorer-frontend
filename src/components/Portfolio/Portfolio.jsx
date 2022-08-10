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
            href="https://github.com/kirillzhakin/first-project"
            className="portfolio__link"
          >
            Статичный сайт
          </a>
          <img src={arrow} alt="Стрелка" className="portfolio__img" />
        </li>
        <li className="portfolio__link-box">
          <a
            href="https://github.com/kirillzhakin/second-project"
            className="portfolio__link"
          >
            Адаптивный сайт
          </a>
          <img src={arrow} alt="Стрелка" className="portfolio__img" />
        </li>
        <li className="portfolio__link-box">
          <a
            href="https://github.com/kirillzhakin/mesto"
            className="portfolio__link"
          >
            Одностраничное приложение
          </a>
          <img src={arrow} alt="Стрелка" className="portfolio__img" />
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;

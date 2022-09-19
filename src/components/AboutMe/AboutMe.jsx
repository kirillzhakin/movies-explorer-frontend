import React from "react";
import "./AboutMe.css";

function AboutMe() {
  return (
    <section className="aboutme" id="aboutme">
      <h3 className="aboutme__about">Студент</h3>
      <div className="aboutme__container">
        <div className="aboutme__summury">
          <p className="aboutme__name">Кирилл</p>
          <p className="aboutme__work">Фронтенд-разработчик, 38 лет</p>
          <p className="aboutme__text">
            Я родился и живу в Кургане, закончил факультет транспортных систем
            КГУ. У меня есть жена, дочь, еще дочь и сын. Люблю кодить.
          </p>

          <ul className="aboutme__social-icons">
            <li>
              <a
                href="https://vk.com"
                className="aboutme__social-icons_link"
                target="blank"
              >
                VK
              </a>
            </li>

            <li>
              <a
                href="https://github.com"
                className="aboutme__social-icons_link"
                target="blank"
              >
                Github
              </a>
            </li>
          </ul>
        </div>

        <img
          className="aboutme__img"
          src={require("../../images/К.jpg")}
          alt="Фото"
        />
      </div>
    </section>
  );
}

export default AboutMe;

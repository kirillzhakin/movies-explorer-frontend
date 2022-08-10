import React from "react";
import "./AboutProject.css";

function AboutProject() {
  return (
    <section className="project" id="project">
      <h3 className="project__about">О проекте</h3>
      <div className="project__container">
        <p className="project__text project__text_head project__text_order_1">
          Дипломный проект включал 5 этапов
        </p>
        <p className="project__text project__text_head project__text_order_2">
          На выполнение диплома ушло 5 недель
        </p>
        <p className="project__text project__text_order_3">
          Составление плана, работу над бэкендом, вёрстку, добавление
          функциональности и финальные доработки.
        </p>
        <p className="project__text project__text_order_4">
          У каждого этапа был мягкий и жёсткий дедлайн, которые нужно было
          соблюдать, чтобы успешно защититься.
        </p>
      </div>

      <div className="project__calendar">
        <div className="project__box project__box_green">1 неделя</div>
        <div className="project__box project__box_gray">4 недели</div>
        <div className="project__box">Back-end</div>
        <div className="project__box">Front-end</div>
      </div>
    </section>
  );
}

export default AboutProject;

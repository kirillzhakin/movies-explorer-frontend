import React from "react";
import "./Techs.css";

function Techs() {
  return (
    <section className="techs" id="techs">
      <h3 className="techs__about">Технологии</h3>
      <p className="techs__text-seven">7 технологий</p>
      <p className="techs__text">
        На курсе веб-разработки мы освоили технологии, которые применили в
        дипломном проекте.
      </p>

      <div className="techs__container">
        <div className="techs__box">HTML</div>
        <div className="techs__box">CSS</div>
        <div className="techs__box">JS</div>
        <div className="techs__box">React</div>
        <div className="techs__box">Git</div>
        <div className="techs__box">Express.js</div>
        <div className="techs__box">mongoDB</div>
      </div>
    </section>
  );
}

export default Techs;

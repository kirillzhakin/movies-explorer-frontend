import React from "react";

import { HashLink } from "react-router-hash-link";

import "./NavTab.css";

function NavTab() {
  return (
    <section className="navtab">
      <ul className="navtab__nav">
        <li>
          <HashLink
            className="navtab__button"
            type="button"
            aria-label="О проекте"
            to="/#project"
            smooth
          >
            О проекте
          </HashLink>
        </li>
        <li>
          <HashLink
            className="navtab__button"
            type="button"
            aria-label="Технологии"
            to="/#techs"
            smooth
          >
            Технологии
          </HashLink>
        </li>
        <li>
          <HashLink
            className="navtab__button"
            type="button"
            aria-label="Студент"
            to="/#aboutme"
            smooth
          >
            Студент
          </HashLink>
        </li>
      </ul>
    </section>
  );
}

export default NavTab;

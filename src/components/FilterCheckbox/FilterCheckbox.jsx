import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox({ checkBoxClick, isShort }) {
  return (
    <section className="checkbox">
      <input
        type="checkbox"
        id="switch"
        className="checkbox__input"
        onChange={checkBoxClick}
        checked={isShort}
      />
      <label htmlFor="switch" className="checkbox__label"></label>
    </section>
  );
}
export default FilterCheckbox;

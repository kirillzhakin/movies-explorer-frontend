import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox(props) {
  return (
    <section className="checkbox">
      <input
        type="checkbox"
        id="switch"
        className="checkbox__input"
        onChange={props.onChange}
        checked={props.isChecked}
      />
      <label htmlFor="switch" className="checkbox__label"></label>
    </section>
  );
}
export default FilterCheckbox;

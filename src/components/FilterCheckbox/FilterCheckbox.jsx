import React from "react";

import "./FilterCheckbox.css";

function FilterCheckbox() {
  return (
    <section className="checkbox">
      <input type="checkbox" id="switch" className="checkbox__input" />
      <label for="switch" className="checkbox__label"></label>
    </section>
  );
}
export default FilterCheckbox;

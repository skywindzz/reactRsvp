import React from "react";
import PropTypes from "prop-types";

const ConfirmFilter = props => (
  <div>
    <h2>Invitees</h2>
    <label>
      <input
        type="checkbox"
        onChange={props.toggleFilter}
        checked={props.isFiltered}
      />{" "}
      Hide those who haven't responded
    </label>
  </div>
);

ConfirmFilter.propTypes = {
  toggleFilter: PropTypes.func.isRequired,
  isFiltered: PropTypes.bool.isRequired
};

export default ConfirmFilter;

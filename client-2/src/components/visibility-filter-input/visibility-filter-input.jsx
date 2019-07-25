import React from "react";

import { connect } from "react-redux";

import Form from "react-bootstrap/Form";

import { setFilter } from "../../actions/actions";
import { setSortColumn } from "../../actions/actions";
import "./visibility-filter-input.scss";

function VisibilityFilterInput(props) {
  return (
    <div className="filterControl">
      <Form.Control
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        placeholder="Type your search here"
      />
      <Form.Control
        as="select"
        className="optionFilter"
        onChange={event => props.setSortColumn(event.target.value)}
        value={props.sortColumn}
      >
        <option>Title</option>
        <option>Genre</option>
        <option>Director</option>
      </Form.Control>
    </div>
  );
}

export default connect(
  ({ visibilityFilter, sortColumn }) => ({ visibilityFilter, sortColumn }),
  { setFilter, setSortColumn }
)(VisibilityFilterInput);

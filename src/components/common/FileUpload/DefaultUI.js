import React from "react";
import PropTypes from "prop-types";

const styles = {
  border: "2px dashed #ccc",
  textAlign: "center",
  padding: "50px"
};

const statusTargetedStyles = {
  ready: {
    backgroundColor: "#fff"
  },
  dragenter: {
    backgroundColor: "#eee"
  },
  dragover: {
    backgroundColor: "#f5f5f5"
  },
  drop: {
    backgroundColor: "#ccc"
  }
};

const DefaultUI = ({ status }) => (
  <div style={{ ...styles, ...statusTargetedStyles[status] }}>
    <p>Drag and drop an image file here or click.</p>
  </div>
);

DefaultUI.propTypes = {
  status: PropTypes.string.isRequired
};

export default DefaultUI;

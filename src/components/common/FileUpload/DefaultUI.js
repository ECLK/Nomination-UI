import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneOutline from '@material-ui/icons/DoneOutline';
import PropTypes from "prop-types";

const defaultStyles = {
  border: "2px dashed #ccc",
  textAlign: "center",
  padding: "50px",
  height: "150px",
  "min-width": "400px",
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

const showFlagToStyle = (flag) => (
  {display: flag ? "" : "none"}
);

const DefaultUI = ({status, progress}) => {
  const uploading = status === "uploading";

  return <div style={{...defaultStyles, ...statusTargetedStyles[status]}}>
    <p style={showFlagToStyle(status === "ready")}>
      Drag and drop an image file here or click.
    </p>
    <div style={showFlagToStyle(status === "uploaded")}>
      <DoneOutline color="secondary"/>
      <a download={"filename"} href={"ok"}>filename</a>
    </div>
    <p style={showFlagToStyle(uploading)}> Uploading... </p>
    {uploading && <LinearProgress variant="determinate" value={progress}/> }
  </div>
};

DefaultUI.propTypes = {
  status: PropTypes.string.isRequired
};

export default DefaultUI;

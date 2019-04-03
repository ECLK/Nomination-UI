import React from "react";
import LinearProgress from '@material-ui/core/LinearProgress';
import DoneOutline from '@material-ui/icons/DoneOutline';
import PropTypes from "prop-types";
import AttachIcon from '@material-ui/icons/AttachFile';


const defaultStyles = {
  border: "#ccc",
  textAlign: "center",
  padding: "10px",
  height: "50px",
  width: "10px",
};

const statusTargetedStyles = {
  ready: {
    backgroundColor: "#a80b71"
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

  // return <AttachIcon style={{...defaultStyles, ...statusTargetedStyles[status]}}>
  return <AttachIcon>
    <p style={showFlagToStyle(status === "ready")}>
      {/* Drag and drop an image file here or click. */}
    </p>
    <div style={showFlagToStyle(status === "uploaded")}>
      <DoneOutline color="secondary"/>
      <a download={"filename"} href={"ok"}>filename</a>
    </div>
    <p style={showFlagToStyle(uploading)}> Uploading... </p>
    {uploading && <LinearProgress variant="determinate" value={progress}/> }
  </AttachIcon>
};

DefaultUI.propTypes = {
  status: PropTypes.string.isRequired
};

export default DefaultUI;

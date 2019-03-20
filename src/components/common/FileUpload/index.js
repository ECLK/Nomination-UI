import React, {Component} from "react";
import PropTypes from "prop-types";
import DefaultUI from "./DefaultUI";
import axios from "axios";

class FileUpload extends Component {
  constructor(props) {
    super(props);
    const { allowedTypes, allowedSize, multiple } = props;

    this.state = {
      status: "ready",
      progress: 0,
      allowedTypes,
      allowedSize,
      multiple
    };
  }

  onDragEnter = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });
  };

  onDragOver = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });
  };

  onDrop = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });

    // Fetch files
    const { files } = evt.dataTransfer;
    this.uploadFiles(files);
  };

  onClickFileInput = () => {
    this.fileUploadInput.value = null;
  };

  onSelectFiles = evt => {
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type
    });

    // Fetch files
    const { files } = evt.target;
    this.uploadFiles(files);
  };

  reset = () => {
    this.setState({
      status: "ready"
    });
  };

  clickFileInput = () => {
    this.fileUploadInput.click();
  };

  uploadFiles = files => {
    let error = false;
    const errorMessages = [];

    const data = {
      error: null,
      files
    };

    const { allowedTypes, allowedSize } = this.state;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i += 1) {
        const file = files[i];

        // Validate file type
        if (allowedTypes && allowedTypes.length > 0) {
          if (!allowedTypes.includes(file.type)) {
            error = true;
            errorMessages.push("Invalid file type(s)");
          }
        }

        // Validate fileSize
        if (allowedSize && allowedSize > 0) {
          if (file.size / 1048576 > allowedSize) {
            error = true;
            errorMessages.push("Invalid file size(s)");
          }
        }
      }
    }

    if (error) {
      data.error = errorMessages;
      data.files = null;
      this.reset();
    } else {
      const formData = new FormData();
      this.setState({status: "uploading", progress: 0});
      formData.append("file", data.files[0]);
      axios.post('http://localhost:9001/ec-election/file-upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },

        onUploadProgress: (progressEvent) => {
          let percentCompleted = (progressEvent.loaded * 100) / progressEvent.total;
          this.setState(
            {progress: percentCompleted}
          );
          console.log(percentCompleted);
        }


      }).then((response) => {
        this.setState(
          {
            status: "uploaded",
            name: response.name
          }
        );
      });
    }

    // const { onUploadFiles } = this.props;
    // onUploadFiles(data);


  };

  render() {
    const { renderUI } = this.props;
    const {status, progress} = this.state;
    const props = {
      status,
      progress,
    };

    return (
      <div onClick={this.clickFileInput}>
        <div onDragEnter={this.onDragEnter}
             onDragOver={this.onDragOver}
             onDrop={this.onDrop}
             style={{position: "relative"}}>
          {renderUI && typeof renderUI === "function" ? (renderUI(props)) : (<DefaultUI {...props} />)}

          <input
            ref={fpi => (this.fileUploadInput = fpi)}
            type="file"
            onClick={this.onClickFileInput}
            onChange={this.onSelectFiles}
            multiple={this.state.multiple}
            style={{
              position: "absolute",
              left: "45%",
              top: "45%",
              visibility: "hidden"
            }}
          />
        </div>
      </div>
    );
  }
}

FileUpload.propTypes = {
  allowedTypes: PropTypes.array,
  allowedSize: PropTypes.number,
  multiple: PropTypes.bool,
  renderUI: PropTypes.func
};

FileUpload.defaultProps = {
  allowedTypes: [],
  allowedSize: null,
  multiple: false,
  renderUI: null
};

export default FileUpload;

import React, { Component } from "react";
import FileUpload from "@99xt/react-fileupload";

class FileUploadComponent extends Component {
  onUploadFiles(evt) {
    if (evt.error) {
      throw evt.error;
    }

    const files = evt.files;
    // You can run upload script here
    console.log(files);
  }

  render() {
    const allowedTypes = [];
    const allowedSize = 15; // MB
    const multiple = true;

    return (
      <div>
        <h1>react-fileupload Demo</h1>

        {/* with default UI */}
        <FileUpload
          allowedTypes={allowedTypes}
          allowedSize={allowedSize}
          multiple={multiple}
          onUploadFiles={this.onUploadFiles}
        />

        {/* with custom UI */}
        <FileUpload
          allowedTypes={allowedTypes}
          allowedSize={allowedSize}
          multiple={multiple}
          onUploadFiles={this.onUploadFiles}
          renderUI={props => {
            const { status } = props;
            return (
              <div style={{ border: "2px dashed #ccc", padding: "50px" }}>
                <p>Click or drag n drop your file(s) here.</p>
                <p>Drag n drop status: {status}</p>
              </div>
            );
          }}
        />
      </div>
    );
  }
}

export default FileUploadComponent;

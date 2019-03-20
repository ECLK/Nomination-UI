import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileUpload from "../common/FileUpload";
import Divider from '@material-ui/core/Divider';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },

});


class TextFields extends React.Component {

  constructor(props) {
        super(props);
    this.state = {}
  }

  handleChange(files) {
        this.setState({
          files: files
        });
  }


  handleUpload = (event) => {
    const data = new FormData();
    const config = {headers: {'Content-Type': 'multipart/form-data'}};
    var filesArray = this.state.files;
  };

    render() {
        const {classes} = this.props;
        var names = ['Jake', 'Jon', 'Thruster'];
      return (
        <div>

          <span>Download form : </span> <a download={"nomination.pdf"}>nomination.pdf</a> <br/>
          <span>Signed form : </span><FileUpload/> <br/>
          <Divider variant="middle"/>
          <br/>
          <span>Supporting doc 1 : </span><FileUpload/> <br/>
          <span>Supporting doc 1 : </span><FileUpload/> <br/>
        </div>);
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

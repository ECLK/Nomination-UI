import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import FileUpload from "../common/FileUpload";
import Divider from '@material-ui/core/Divider';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    divider: {
      marginBottom:30
    },

});


class TextFields extends React.Component {

  constructor(props) {
        super(props);
       const {status} = this.props;
    this.state = {
      status: status,
    }
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
        const {classes,onSelectFiles,doneElement,supportdoc,closeElement} = this.props;
        const supportingDocs = [{
          "id": "31232",
          "doc": "Scan of Security Deposit Payment Slip",
        }, {
          "id": "b20dd58c-e5bb-469d-98c9-8711d6da1879",
          "doc": "Completed & Signed Nomination Form",
        }, {
          "id": "3fac66f2-302c-4d27-b9ae-1d004037a9ba",
          "doc": "Declaration of Female Representation",
        }
      ];

        const supportingDocItems = supportingDocs.map(docs => (
          <div>
          <Grid container spacing={12}>
          <Grid item lg={1}>

          {
             supportdoc.map(sdoc => (
              sdoc.id === docs.id ? doneElement : ' '
            ))
          }           
          
            </Grid>
            <Grid item lg={2}>
              <span>
              <Typography variant="subtitle1" >{docs.doc}</Typography>
            </span>
            </Grid>
            <Grid item lg={1}>
              <span ><FileUpload  value={docs.id} doneElement={doneElement} onSelectFiles={onSelectFiles} /></span>
              
            </Grid>
            <Grid item lg={1}>
            {
             supportdoc.map(sdoc => (
              sdoc.id === docs.id ? 
              <Typography variant="caption" gutterBottom>
            {sdoc.originalname}{closeElement}
           </Typography>
               : ' '
            ))
          } 
            </Grid>
            {/* {docs.id === 'b20dd58c-e5bb-469d-98c9-8711d6da1879' ?
            <Grid item lg={5}>
              <span><FileUpload   style={{textAlign: 'right'}} value={docs.id} doneElement={doneElement} onSelectFiles={onSelectFiles} /></span>
            </Grid> : ' ' } */}
          </Grid>
          <Divider className={classes.divider} variant="middle"/>
          </div>
          ));

      return (
        <div>
        {supportingDocItems}
        </div>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

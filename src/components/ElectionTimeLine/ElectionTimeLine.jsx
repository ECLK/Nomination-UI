import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';






const styles = theme => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing.unit * 3,
  },
  Typography: {
    margin: theme.spacing.unit * 1,
  },
  legend: {
    marginBottom: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 2,

  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: theme.spacing.unit * 4,

  },
  textField: {
    marginRight: theme.spacing.unit,
    marginBottom: theme.spacing.unit * 2,
    textAlign: 'left',
    width: 250,
  },
  objectionGrid: {
    marginTop: theme.spacing.unit * 5,

  },

});

class CheckboxesGroup extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: false,
    // nominationStart:'',
    // nominationEnd:'',
    // objectionStart:'',
    // objectionEnd:'',

  };

  // handleChange = name => event => {
  //   this.setState({ [name]: event.target.value });
  //   console.log("***************",this.state)
  // };
  

  render() {
    const { classes,values, handleChange  } = this.props;
    const { gilad, jason, antoine } = this.state;
    const error = [gilad, jason, antoine].filter(v => v).length !== 2;

    return (
      <div className={classes.root}>
        <FormControl component="fieldset" className={classes.formControl}>
          <FormLabel className={classes.legend} component="legend">Nomination Time Line</FormLabel>
          <FormGroup>
          <Typography className={classes.Typography} variant="subtitle1" gutterBottom>
                Nomination Start
          </Typography>
          <Typography className={classes.Typography} variant="subtitle1" gutterBottom>
                Nomination End
          </Typography>
           
          </FormGroup>
          <FormLabel className={classes.legend} component="legend">Objection Time Line</FormLabel>
          <FormGroup>
          <Typography className={classes.Typography} variant="subtitle1" gutterBottom>
                Objection Start
          </Typography>
          <Typography className={classes.Typography} variant="subtitle1" gutterBottom>
                Objection End
          </Typography>
           
          </FormGroup>
        </FormControl>
        
        <FormControl required error={error} component="fieldset" className={classes.formControl}>
          {/* <FormLabel component="legend"></FormLabel> */}
          <FormGroup>
          <form className={classes.container} noValidate> 
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                 <Grid item lg={3}>
                    <TextField
                        id="nominationStart"
                        // label="Next appointment"
                        type="datetime-local"
                        defaultValue={values.nominationStart}
                        className={classes.textField}
                        name="nominationStart"
                        value={this.state.nominationStart}
                        onChange={handleChange('nominationStart')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />       
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                        id="datetime-local"
                        // label="Next appointment"
                        type="datetime-local"
                        defaultValue={values.nominationEnd}
                        className={classes.textField}
                        name="nominationEnd"
                        value={this.state.nominationEnd}
                        onChange={handleChange('nominationEnd')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />       
                    </Grid>
                </Grid>
                <Grid className={classes.objectionGrid} container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                 <Grid item lg={3}>
                    <TextField
                        id="datetime-local"
                        // label="Next appointment"
                        type="datetime-local"
                        defaultValue={values.objectionStart}
                        className={classes.textField}
                        name="objectionStart"
                        value={this.state.objectionStart}
                        onChange={handleChange('objectionStart')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />       
                    </Grid>
                </Grid>
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                        id="datetime-local"
                        // label="Next appointment"
                        type="datetime-local"
                        defaultValue={values.objectionEnd}
                        className={classes.textField}
                        name="objectionEnd"
                        value={this.state.objectionEnd}
                        onChange={handleChange('objectionEnd')}
                        InputLabelProps={{
                        shrink: true,
                        }}
                    />       
                    </Grid>
                </Grid>
            </form>  
          </FormGroup>
          {/* <FormHelperText>You can display an error</FormHelperText> */}
        </FormControl>

      </div>
    );
  }
}

CheckboxesGroup.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(CheckboxesGroup);

import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DatePicker from '../DatePicker';
import axios from 'axios';
import InputLabel from '@material-ui/core/InputLabel';
import "react-datepicker/dist/react-datepicker.css";
import NominationStep1 from '../NominationStep1/NominationStep1';

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
    },
    dense: {
        marginTop: 19,
    },
    menu: {
        width: 200,
    },
    button: {
        margin: theme.spacing.unit,
    },
    input: {
        display: 'none',
    },
});

const paymentStatus = [
    {
      value: 'PENDING',
      label: 'PENDING',
    },
    {
      value: 'APPROVED',
      label: 'APPROVED',
    },
    {
      value: 'REJECTED',
      label: 'REJECTED',
    },
  ];
class TextFields extends React.Component {
    state = {
      open: true,
      payments: {
          
      },
      depositor:'test',
      depositAmount:'test',
      depositeDate:'test',
      paymentStatus:'test',

    };

    handleChange = (name) => event => {
        this.setState({
            // payments:{
                [name]:event.target.value,
            // } 
        });
    };

    componentDidMount() {
        var candidateCount = localStorage.getItem('candidate');
      axios.get(`nominations/1/payments`)
        .then(res => {
          const payments = res.data;
          const depositor=res.data.depositor;
          const depositAmount=res.data.depositAmount;
          const depositeDate=res.data.depositeDate;
          const paymentStatus=res.data.paymentStatus;

          this.setState({ depositor });
          this.setState({ depositAmount });
          this.setState({ depositeDate });
          this.setState({ paymentStatus });


        })
    }

    render() {
        const {classes} = this.props;

        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                            label="Depositor Name"
                            value={this.state.depositor}
                            onChange={this.handleChange('depositor')}
                        />  
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Deposited Amount"
                            className={classes.textField}
                            value={this.state.depositAmount}
                            onChange={this.handleChange('depositAmount')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={localStorage.getItem('candidate')}
                            onChange={this.handleChange('candidateCount')}
                            margin="normal"
                        />
                    </Grid>

                </Grid>
                <Grid container spacing={8}>
                    <Grid item lg={3}>
                        <TextField
                            id="date"
                            label="Diposited Date"
                            type="date"
                            value={this.state.depositeDate}
                            // defaultValue="2017-05-24"
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3}>
                         <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            className={classes.textField}
                            value={this.state.paymentStatus}
                            onChange={this.handleChange('paymentStatus')}
                            SelectProps={{
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            // helperText="Please select your currency"
                            margin="normal"
                            >
                            {paymentStatus.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>       
                    </Grid>
                </Grid>
               

                {/* <Grid container spacing={8}>
                    <Grid item lg={3}>
                    <Button variant="contained" color="primary" className={classes.button}>
                        Cancel
                    </Button>
                    <Button variant="contained" color="secondary" className={classes.button}>
                        Send
                    </Button>
                    </Grid>
                </Grid> */}

            </form>
        );
    }
}

TextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TextFields);

import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import "react-datepicker/dist/react-datepicker.css";
import Select from '@material-ui/core/Select';




const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
        paddingLeft: 25
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

const designation = [
    {
      value: 'teamLeader',
      label: 'Team Leader',
    },
    {
      value: 'secretory',
      label: 'Secretory',
    },
    {
      value: 'other',
      label: 'Other',
    },
  ];

  const currencies = [
    {
      value: 'USD',
      label: '$',
    },
    {
      value: 'EUR',
      label: '€',
    },
    {
      value: 'BTC',
      label: '฿',
    },
    {
      value: 'JPY',
      label: '¥',
    },
  ];
class NominationPayments extends React.Component {
    state = {
      open: true,
   
    //   candidateCount:localStorage.getItem('candidate')

    };
    

    

    componentDidMount() {
    //     console.log(this)
    //     var candidateCount = localStorage.getItem('candidate');
    //   axios.get(`nominations/135183e2-a0ca-44a0-9577-0d2b16c3217f/payments`)
    //     .then(res => {
    //       const payments = res.data;
    //       const depositor=res.data.depositor;
    //       const depositAmount=res.data.depositAmount;
    //       const depositeDate=res.data.depositeDate;
    //       const paymentStatus=res.data.paymentStatus;


    //       console.log("payments",payments);
    //       this.setState({ depositor });
    //       this.setState({ depositAmount });
    //       this.setState({ depositeDate });
    //       this.setState({ paymentStatus });
    //     })
    // setPaymentStatus();

    // const { handleSubmit } = this.props;
       
}

// handleChanged = name => event => {
//     const {handleChange} = this.props;

//     this.setState({
//       [name]: event.target.value,
//     });
//     {handleChange('depositeDate')}
//   };

      


    
    render() {
        const {classes, depositor,handleChange,getNominationPayments} = this.props;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>
                    <Grid item lg={3}>
                    <TextField
                            label="Depositor Name"
                            value={getNominationPayments.depositor}
                            onChange={handleChange("depositor")}
                        />  
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Deposited Amount"
                            className={classes.textField}
                            value={getNominationPayments.amount}
                            onChange={handleChange('depositAmount')}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={localStorage.getItem('candidate')}
                            onChange={handleChange('candidateCount')}
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
                            value={getNominationPayments.depositeDate}
                            // defaultValue="2017-05-24"
                            onChange={handleChange('depositeDate')}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>
                    <Grid item lg={3}>
                         {/* <TextField
                            id="standard-select-currency"
                            select
                            label="Designation"
                            className={classes.textField}
                            value={nominationPayments.designation}
                             onChange={this.handleChanged}
                            SelectProps={{
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            // helperText="Please select your currency"
                            margin="normal"
                            >
                            {designation.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>    */}
                            {/* <TextField
                            id="standard-select-designation"
                            select
                            label="Select"
                            className={classes.textField}
                            value={this.state.designation}
                            onChange={this.handleChanged('designation')}
                            SelectProps={{
                                MenuProps: {
                                className: classes.menu,
                                },
                            }}
                            helperText="Please select your designation"
                            margin="normal"
                            >
                            {designation.map(option => (
                                <MenuItem key={option.value} value={option.value}>
                                {option.label}
                                </MenuItem>
                            ))}
                            </TextField>     */}
                            
                    </Grid>
                    {/* <Grid item lg={3}>
                         <TextField
                            id="standard-select-currency"
                            select
                            label="Select"
                            className={classes.textField}
                            value={nominationPayments.paymentStatus}
                            onChange={handleChange('paymentStatus')}
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
                    </Grid> */}
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

NominationPayments.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NominationPayments);



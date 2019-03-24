import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import "react-datepicker/dist/react-datepicker.css";
import { handleChangePayment } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';



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
  
    constructor(props) {
        super(props)

        this.state = {
            open: true,
            depositor:'',
            depositAmount:'',
            depositeDate:'',  
        }
      }

    //   handleChange = (e) => {
    //     const evtTarget = e.target;
    //     const { name } = evtTarget;
    //     const { handleChange, setFieldTouched } = this.props;
    //     handleChange(e);
    //     setFieldTouched(name, true, false);
    // }
      
    
    render() {
        const {classes,NumberFormatCustom,CandidateList,NominationPayments} = this.props;
        const {  numberformat } = this.state;
        const {
            values: { depositAmount, depositor },
            errors,
            touched,
            handleChange,
            isValid,
          } = this.props;
    //     const  change = (name, e) => {
    //         // e.persist();
    //         // debugger;
    //         handleChange(e);
    //         setFieldTouched(name, true, false);
    //  };
    //  const change = (e) => {
    //      const {handleChange} = this.props;
    //      const evtTraget = e.target;
    //      const { name } = evtTraget;
    //      handleChange(e);
    //      debugger;
    //     setFieldTouched(name, true, false);
    //   };
   debugger;
        return (
            <form className={classes.container} noValidate autoComplete="off">
                <Grid container direction="row" justify="flex-start" alignItems="stretch" spacing={8}>                
                    <Grid item lg={3}>
                        <TextField
                            id="formatted-numberformat-input"
                            label="Deposited Amount"
                            className={classes.textField}
                            prefix={'Rs '}
                            value={NominationPayments.depositAmount}
                            helperText={touched.depositAmount ? errors.depositAmount : ""}
                            error={touched.depositAmount && Boolean(errors.depositAmount)}
                            onChange={handleChange('depositAmount')}
                            // onChange={change.bind(null, "depositAmount")}
                            // onChange={this.handleChange}
                            margin="normal"
                            InputProps={{
                                inputComponent: NumberFormatCustom,
                              }}
                        />
                    </Grid>
                    <Grid item lg={3}>
                    <TextField
                            label="Depositor Name"
                            className={classes.textField}
                            value={NominationPayments.depositor}
                            onChange={handleChange("depositor")}
                            // onChange={change.bind(null, "depositor")}
                            // onChange={this.handleChange}
                            helperText={touched.depositor ? errors.depositor : ""}
                            error={touched.depositor && Boolean(errors.depositor)}
                            margin="normal"
                        />  
                    </Grid>
                    <Grid item lg={3}>
                        <TextField
                            id="standard-name"
                            label="Candidate Count"
                            className={classes.textField}
                            value={CandidateList.length}
                            onChange={handleChange('candidateCount')}
                            // onChange={change.bind(null, "candidateCount")}
                            // onChange={this.handleChange}
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
                            value={NominationPayments.depositeDate}
                            onChange={handleChange('depositeDate')}
                            // onChange={change.bind(null, "depositeDate")}
                            // onChange={this.handleChange}
                            className={classes.textField}
                            InputLabelProps={{
                                shrink: true,
                            }}
                            margin="normal"
                        />
                    </Grid>                             
                </Grid>
            </form>
        );
    }
}

NominationPayments.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
    const {handleChangePayment} = Nomination;
    const CandidateList = Nomination.getNominationCandidates;

    return {handleChangePayment,CandidateList};
  };

  const mapActionsToProps = {
    handleChangePayment
  };
  
 
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationPayments));



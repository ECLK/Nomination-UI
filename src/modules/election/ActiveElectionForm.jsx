import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import ElectionTimeLine from '../../components/ElectionTimeLine/ElectionTimeLine';
import ElectionPayment from '../../components/ElectionPayment/ElectionPayment';
import ElectionWeightage from '../../components/ElectionWeightage/ElectionWeightage';
import AllowNomination from './AllowNomination';

import { setCallElectionData, postCallElectionData } from './state/ElectionAction';
import { connect } from 'react-redux';


const styles = theme => ({
  root: {
    width: '90%',
    paddingLeft: 24
  },
  button: {
    marginTop: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  actionsContainer: {
    marginBottom: theme.spacing.unit * 2,
  },
  resetContainer: {
    padding: theme.spacing.unit * 3,
  },
});

function getSteps() {
  return ['TIME LINE', 'ALLOW NOMINATION'];
}



class VerticalLinearStepper extends React.Component {
 
  constructor(props){
    super(props);
    const {CallElectionData} = this.props;

    this.state = {
      activeStep: 0,
      nominationStart: '2017-05-24T10:30',
      nominationEnd: '2017-05-24T10:30',
      objectionStart: '2017-05-24T10:30',
      objectionEnd: '2017-05-24T10:30',
      // depositAmount: 'Amount',
      // WeightagePrefarence: '%',
      // WeightageVote: '%',
      electionName:CallElectionData.electionName,
      electionModule:CallElectionData.electionModule,
      values: '',
      rowData:''
    };
    
}

// componentDidUpdate (oldState){
//   const {CallElectionData,setCallElectionData} = this.props;
//       console.log(CallElectionData.electionName);
//   if(oldState.setCallElectionData !== setCallElectionData){

//     this.setState({electionName:setCallElectionData.electionName});   
//     this.setState({electionModule:setCallElectionData.electionModule});   
//     // var ddate = parseInt(NominationPayments.depositeDate);
//     // this.setState({depositeDate:moment(new Date(NominationPayments.depositeDate)).format('YYYY-MM-DD')});}
   

// }}

    // componentDidMount() {
    //   const { setCallElectionData } = this.props;
    // console.log(setCallElectionData.electionName);
    // debugger;
    //   // axios.get(`http://localhost:9001/ec-election/nominations/1/candidates`)
    //   //   .then(res => {
    //   //     const nominations = res.data;
    //   //     this.setState({ nominations });
    //   //   })
    // }

  handleNext = () => {
    let activeStep;
    const { setElectionTimeLine } = this.props;


    if (activeStep === 1) {
      setElectionTimeLine(this.state);
    }
    const { setCallElectionData } = this.props;

    this.setState(state => ({
      activeStep: state.activeStep + 1,
    }));

    if (this.state.activeStep === 0) {
      setCallElectionData(this.state);
    }

  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
    });
  };

  handleSubmit = () => {
    const { postCallElectionData, CallElectionData, electionData } = this.props;
    postCallElectionData(CallElectionData, electionData);
  };

  handleChange = input => e => {
    this.setState({ [input]: e.target.value });
  }

  getStepContent(step, values) {
    switch (step) {
      case 0:
        return <ElectionTimeLine
          handleChange={this.handleChange}
          values={values}
        />;
      // case 1:
      //   return <ElectionPayment
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      // case 2:
      //   return <ElectionWeightage
      //     handleChange={this.handleChange}
      //     values={values}
      //   />;
      case 1:
        return <AllowNomination
          handleChange={this.handleChange}
          values={values}
        />;
      default:
        return 'Unknown step';
    }
  }

  render() {
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
    const { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence } = this.state;
    const values = { nominationStart, nominationEnd, objectionStart, objectionEnd, depositAmount, WeightageVote, WeightagePrefarence }



    return (
      <div className={classes.root}>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((label, index) => {
            return (

              <Step key={label}>
                <StepLabel>{label}</StepLabel>
                <StepContent>
                  <Typography>{this.getStepContent(activeStep, values)}</Typography>
                  <div className={classes.actionsContainer}>
                    <div>
                      <Button
                        disabled={activeStep === 0}
                        onClick={this.handleBack}
                        className={classes.button}
                      >
                        Back
                      </Button>
                      <Button
                        variant="contained"
                        color="primary"
                        onClick={this.handleNext}
                        className={classes.button}
                      // onClick={activeStep === 3 ? this.handleSubmit : this.handleNext}

                      >
                        {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                      </Button>
                    </div>
                  </div>
                </StepContent>
              </Step>
            );
          })}
        </Stepper>

        {activeStep === steps.length && (
          <Paper square elevation={0} className={classes.resetContainer}>
            <Typography>All steps completed - Submited for approval</Typography>
            <Button onClick={this.handleReset} className={classes.button}>
              Reset
            </Button>
            <Button color="primary" onClick={this.handleSubmit} className={classes.button}>
              Submit
            </Button>
          </Paper>
        )}
      </div>
    );
  }
}

VerticalLinearStepper.propTypes = {
  classes: PropTypes.object,
};

const mapStateToProps = ({ Election }) => {

  const { setCallElectionData, postCallElectionData } = Election;
  const CallElectionData = Election.CallElectionData;
  const electionData = Election.electionData;

  return { setCallElectionData, CallElectionData, electionData, postCallElectionData }
};

const mapActionsToProps = {
  setCallElectionData,
  postCallElectionData
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(VerticalLinearStepper));


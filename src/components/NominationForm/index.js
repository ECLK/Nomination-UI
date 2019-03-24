import React from 'react';
import PropTypes, { array } from 'prop-types';
import NumberFormat from 'react-number-format';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepButton from '@material-ui/core/StepButton';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import NominationStep1 from '../NominationStep1/NominationStep1';
import NominationStep2 from '../NominationStep2';
import NominationStep3 from '../NominationStep3/NominationStep3';
import NominationStep5 from '../NominationStep5/NominationStep2';
import NominationStep2Update from '../NominationStep2Update';
import { postNominationPayments, updateNominationPayments,postNominationSupportDocs } from '../../modules/nomination/state/NominationAction';
import { connect } from 'react-redux';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import DoneOutline from '@material-ui/icons/DoneOutline';
import CloseIcon from '@material-ui/icons/Cancel';
import moment from 'moment';
import axios from "axios";


const styles = theme => ({
  root: {
    width: '90%',
    marginTop:10,
    padding: 24,
    paddingLeft: 26,
  },
  button: {
    marginRight: theme.spacing.unit,
  },
  completed: {
    display: 'inline-block',
  },
  instructions: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
  },
  pageContent: {
    padding: 24,
},
paperContent:{
  padding: 24,
},
done: {
  textAlign: 'right',
  paddingRight: 8,
},
});

function getSteps() {
  return ['Candidate Details', 'Payment Details', 'Review', 'Nomination Supporting Documents'];
}


class NominationForm extends React.Component {
 
  constructor(props) {
    super(props)
    const { allowedTypes, allowedSize, multiple } = props;

    this.state = {
      activeStep: 0,
      completed: {},
      props:'',
      language:'',
      depositor:'',
      depositAmount:'',
      depositeDate:'',  
        filePath:'upload',
        status:'PENDING',
        nominationId:this.props.customProps,
        payments:[],
        allowedTypes,
        allowedSize,
        multiple,
        status: "ready",
        filename:'',
        supportDocId:'3',
        supportdoc:[]
    }    
  }

  onSelectFiles = evt => {
   
    evt.preventDefault();
    evt.stopPropagation();

    this.setState({
      status: evt.type,
      supportDocId: evt.target.id
    });

    // Fetch files
    const { files } = evt.target;
    this.uploadFiles(files);
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
      
        const obj = {'id':this.state.supportDocId, 'filename':response.data.filename, 'originalname':response.data.originalname};
        const newArray = this.state.supportdoc.slice(); // Create a copy
        newArray.push(obj); // Push the object
        this.setState(
          {
            status: "uploaded",
            supportdoc: newArray
          }
        );
      });
    }
  };

  componentDidUpdate (oldState){
    const {NominationPayments} = this.props;
    if(oldState.NominationPayments !== NominationPayments){

      this.setState({depositor:NominationPayments.depositor});   
      this.setState({depositAmount:NominationPayments.depositAmount});   
      var ddate = parseInt(NominationPayments.depositeDate);
      this.setState({depositeDate:moment(new Date(NominationPayments.depositeDate)).format('YYYY-MM-DD')});}
  }

  handleChange = (name) => event => {
    this.setState({
            [name]:event.target.value,
    });   
  };

  // handleReset = event => {
  //   debugger;
  //   this.setState({
  //           // [name]:event.target.value,
  //   });   
  // };

  handleReset(){
    debugger;
    // const obj = {'id':this.state.supportDocId, 'filename':response.data.filename, 'originalname':response.data.originalname};
    // const newArray = this.state.supportdoc.slice(); // Create a copy
    // newArray.push(obj); // Push the object
    // this.setState(
    //   { 
    //     status: "uploaded",
    //     supportdoc: newArray
    //   }
    // );
  }

  NumberFormatCustom(props) {
    const { inputRef, onChange, ...other } = props;
  
    return (
      <NumberFormat
        {...other}
        getInputRef={inputRef}
        onValueChange={values => {
          onChange({
            target: {
              value: values.value,
            },
          });
        }}
        thousandSeparator
        prefix="Rs "
      />
    );
  }
   showFlagToStyle = (flag) => (
    {display: flag ? "" : "none"}
  );

  getStepContent(step,props) {
    const { classes } = this.props;

    const doneElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
    <DoneOutline  color="secondary"/>
    {/* <a download={"filename"} href={"ok"}>filename</a> */}
    </div>);
      const closeElement = (<div className={classes.done} style={this.showFlagToStyle(this.state.status === "uploaded")}>
      <CloseIcon  color="red"/>
      {/* <a download={"filename"} href={"ok"}>filename</a> */}
      </div>);
    
    const { nominationPayments,NominationPayments, customProps,nominationStatus,division,candidateCount } = this.props;
    switch (step) {
      case 0:
        return <NominationStep1 customProps={customProps}/>;
      case 1:
      if(nominationStatus==="DRAFT"){
        return <NominationStep2Update NominationPayments={this.state} customProps={customProps} NumberFormatCustom={this.NumberFormatCustom} handleChange={this.handleChange} />;
      }else if(nominationStatus==="SUBMIT"){
        return <NominationStep2 NominationPayments={this.state} customProps={customProps} NumberFormatCustom={this.NumberFormatCustom} handleChange={this.handleChange} />;
      }else{
        return <NominationStep2 nominationPayments={nominationPayments} handleChange={this.handleChange} />;
      }
      case 2:
        return <NominationStep5 division={division} candidateCount={candidateCount} NominationPayments={this.state} />;
      case 3:
      return <NominationStep3 supportdoc={this.state.supportdoc} closeElement={closeElement} doneElement={doneElement} onSelectFiles={this.onSelectFiles}  />;
      default:
        return 'Unknown step';
    }
  }

  
  totalSteps = () => {
    return getSteps().length;
  };
  

  handleNext = () => {
    const {postNominationPayments,updateNominationPayments,NominationPayments, nominationStatus, customProps,postNominationSupportDocs}=this.props;
    let activeStep;
   
    if (this.isLastStep() && !this.allStepsCompleted()) {
      // It's the last step, but not all steps have been completed,
      // find the first step that has been completed
      const steps = getSteps();
      activeStep = steps.findIndex((step, i) => !(i in this.state.completed));
    } else {
      activeStep = this.state.activeStep + 1;
    }
    this.setState({
      activeStep,
    });
    
    if (activeStep === 0 ){
        console.log("activeStep",activeStep);
      postNominationSupportDocs(this.state);   
  }
    
    if (activeStep === 2 && NominationPayments==''){
      console.log("activeStep",activeStep);

      postNominationPayments(this.state);   
  }else if(activeStep === 2 && NominationPayments!==''){
    updateNominationPayments(NominationPayments.id,this.state);   
  }
  };

  handleBack = () => {
    this.setState(state => ({
      activeStep: state.activeStep - 1,
    }));
  };



  handleStep = step => () => {
    this.setState({
      activeStep: step,
    });
  };

  handleComplete = () => {
    const { completed } = this.state;
    completed[this.state.activeStep] = true;
    this.setState({
      completed,
    });
    this.handleNext();
  };

  handleReset = () => {
    this.setState({
      activeStep: 0,
      completed: {},
    });
  };

  completedSteps() {
    return Object.keys(this.state.completed).length;
  }

  isLastStep() {
    return this.state.activeStep === this.totalSteps() - 1;
  }

  allStepsCompleted() {
    return this.completedSteps() === this.totalSteps();
  }

  render() {
    
    const { classes } = this.props;
    const steps = getSteps();
    const { activeStep } = this.state;
   
    return (
      <div className={classes.root}>
      <Paper className={classes.pageContent} elevation={1}>

        <Stepper nonLinear activeStep={activeStep}>
          {steps.map((label, index) => {
            return (
              <Step key={label}>
                <StepButton
                  onClick={this.handleStep(index)}
                  completed={this.state.completed[index]}
                >
                  {label}
                </StepButton>
              </Step>
            );
          })}
        </Stepper>
        <div>
          {this.allStepsCompleted() ? (
            <div>
              <Typography className={classes.instructions}>
                All steps completed - you&apos;re finished
              </Typography>
              <Button onClick={this.handleReset}>Reset</Button>
            </div>
          ) : (
            <div>
              <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                                {/* {getStepContent(activeStep)} */}
                                                {this.getStepContent(activeStep,this.props)}
                                            </Grid>
                                        </Grid>
              {/* <Typography className={classes.instructions}>{this.getStepContent(activeStep,this.props)}</Typography> */}
              <div>
                <Button
                  disabled={activeStep === 0}
                  onClick={this.handleBack}
                  className={classes.button}
                >
                  Back
                </Button>
                {activeStep !== 3 ?
                <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Next
                </Button> : ' '
                }
              
                    {activeStep === 3 ? 
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      Submit For Approval
                    </Button> : ' '
                    }
                  
                   {/* {activeStep !== steps.length &&
                  (this.state.completed[this.state.activeStep] ? (
                    <Typography variant="caption" className={classes.completed}>
                      Step {activeStep + 1} already completed
                    </Typography>
                  ) : (
                    <Button variant="contained" color="primary" onClick={this.handleComplete}>
                      {this.completedSteps() === this.totalSteps() - 1 ? 'Finish' : 'Complete Step'}
                    </Button>
                  ))} */}
              </div>
            </div>
          )}
        </div>
        </Paper>
      </div>
    );
  }
}

NominationForm.propTypes = {
  classes: PropTypes.object,
};


const mapStateToProps = ({Nomination}) => {
  const {nominationPayments} = Nomination;
  const NominationPayments = Nomination.getNominationPayments;
  const {updateNominationPayments} = Nomination;
  const {postNominationSupportDocs} = Nomination;

  
  
  return {nominationPayments,updateNominationPayments,NominationPayments,postNominationSupportDocs};
};

const mapActionsToProps = {
  postNominationPayments,
  updateNominationPayments,
  postNominationSupportDocs
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationForm));



import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from '../../components/AdminMenu/AdminMenu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import CandidateForm from './CandidateForm';
import DivisionConfig from './DivisionConfig';
import DeleteIcon from '@material-ui/icons/Delete';
import ElectionConfig from './ElectionConfig';
import Dialog from '@material-ui/core/Dialog';
import IconButton from "@material-ui/core/IconButton";
import TrashIcon from "@material-ui/icons/Delete";
import Slide from '@material-ui/core/Slide';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import DialogContentText from '@material-ui/core/DialogContentText';
import { createElection, updateElection, submitElection, editElection, getFieldOptions, getElectionTemplateData, deleteElectionModule } from './state/ElectionAction';
import { openSnackbar } from '../election/state/ElectionAction';
import { connect } from 'react-redux';


const styles = theme => ({
    root: {
        padding: 24,
        paddingLeft: 264,
    },
    button: {
        marginRight: theme.spacing.unit,
    },
    instructions: {
        marginTop: theme.spacing.unit,
        marginBottom: theme.spacing.unit,
    },
    pageContent: {
        padding: 24,
    },
    paperContent: {
        padding: 24,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,

    },
    warningIcon: {
        width: '10vw',
        height: '5vh',
    }

});

function getSteps() {
    return ['Candidate Form Configuration', 'Division Configuration', 'Election Configuration'];
}

function Transition(props) {
    return <Slide direction="up" {...props} />;
}


const DialogTitle = withStyles(theme => ({
    root: {
        borderBottom: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing.unit,
        top: theme.spacing.unit,
        color: theme.palette.grey[500],
    },
}))(props => {
    const { children, classes, onClose } = props;
    return (
        <MuiDialogTitle disableTypography className={classes.root}>
            <Typography variant="h6">{children}</Typography>
            {onClose ? (
                <IconButton aria-label="Close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});

const DialogContent = withStyles(theme => ({
    root: {
        margin: 0,
        padding: theme.spacing.unit * 2,
    },
}))(MuiDialogContent);

const DialogActions = withStyles(theme => ({
    root: {
        borderTop: `1px solid ${theme.palette.divider}`,
        margin: 0,
        padding: theme.spacing.unit,
    },
}))(MuiDialogActions);

const authorities = [{
    "authority_id": "1",
    "name": "-- Select Authority--",
}, {
    "authority_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Create Election",
}, {
    "authority_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Calling Election",
}];
class CreateElection extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
        goToHome: false,
        candidateConfigs: [],
        candidateSupportingDocs: [],
        divisions: [],
        errorTextCandidateConfig: '',
        errorTextDivisionCommonName: '',
        errorTextDivisionConfig: '',
        errorTextAuthority:'',
        errorTextCalType:'',
        errorTextSecurityDeposite:'',
        errorTextObjection:'',
        errorTextAlliance:'',
        errorTextSubmisionBy:''
    };

    constructor() {
        super();
        this.handleElectionChange = this.handleElectionChange.bind(this);
    }

    getStepContent(step) {
        const {errorTextAuthority,errorTextCalType, errorTextSecurityDeposite, errorTextObjection,errorTextAlliance,errorTextSubmisionBy} = this.state;
        const errorTextItems = { errorTextAuthority, errorTextCalType, errorTextSecurityDeposite, errorTextObjection,errorTextAlliance,errorTextSubmisionBy }


        switch (step) {
            case 0:
                return <CandidateForm
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    candidateConfigs={this.state.candidateConfigs}
                    candidateSupportingDocs={this.state.candidateSupportingDocs}
                    errorTextCandidateConfig={this.state.errorTextCandidateConfig}
                />;
            case 1:
                return <DivisionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    errorTextDivisionCommonName={this.state.errorTextDivisionCommonName}
                    errorTextDivisionConfig={this.state.errorTextDivisionConfig}
                />;
            case 2:
                return <ElectionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                    authorities={authorities}
                    errorTextItems={errorTextItems}
                />;
            default:
                return 'Unknown step';
        }
    }

    handleElectionChange(electionModule) {
        debugger;
        for (let i = 0; i < electionModule.electionConfig.length; i++) {
            for (let j = 0; j < authorities.length; j++) {

                console.log(electionModule.electionConfig[i].value+"aaaa"+authorities[j].authority_id);
                if (electionModule.electionConfig[i].value ===  authorities[j].authority_id && electionModule.electionConfig[i].value !==  "1") {
                    this.setState({errorTextAuthority:''});
                    debugger
                }
            }
        }
        for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
            if (this.props.new_election_module.electionConfig[i].value==='pure_vote_based' || this.props.new_election_module.electionConfig[i].value==='pure_prefrence_based' || this.props.new_election_module.electionConfig[i].value==='vote_and_prefrence') {
                this.setState({errorTextCalType:''});
            }
        }
        // this.setState({errorTextAuthority:''});
        // this.setState({errorTextCalType:''});
        // this.setState({errorTextSecurityDeposite:''});
        // this.setState({errorTextObjection:''});
        // this.setState({errorTextAlliance:''});
        // this.setState({errorTextSubmisionBy:''});
        const { updateElection } = this.props;
        this.setState({ errorTextCandidateConfig: '' });
        this.setState({ errorTextDivisionCommonName: '' });
        this.setState({ errorTextDivisionConfig: '' });
        updateElection(electionModule);
    }

    // handleDelete(electionModule) {
    //     const { deleteElectionModule } = this.props;
    //     deleteElectionModule(electionModule);
    //     this.setState({
    //         goToHome: true
    //     });
    // }
    handleDelete = (electionModule, event) => {
        const { deleteElectionModule } = this.props;
        deleteElectionModule(electionModule.currentTarget.id);
        this.onCloseModal();
        this.setState({
            goToHome: true
        });
    }

    componentDidMount() {
        const { createElection, getElectionTemplateData } = this.props;
        createElection(this.props.location.state.name);
        getElectionTemplateData(this.props.location.state.id);
        this.setState({
            moduleId: this.props.location.state.id
        });
        // fetch required data
        getFieldOptions().then((data) => {
            this.setState(data);
        })
    }

    isStepOptional = step => step === 1;

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;

        var goNext = true;
        console.log(this.props.new_election_module);
        debugger;
        if (this.props.new_election_module.candidateFormConfiguration.length === 0) {
            this.setState({ errorTextCandidateConfig: 'emptyField' });
            goNext = false;
        }
        if (activeStep === 1) {
            if (this.props.new_election_module.divisionCommonName === undefined || this.props.new_election_module.divisionCommonName === '') {
                this.setState({ errorTextDivisionCommonName: 'emptyField' });
                goNext = false;
            }
            if (this.props.new_election_module.divisionConfig.length === 0 && this.props.new_election_module.divisionCommonName !== undefined) {
                this.setState({ errorTextDivisionConfig: 'emptyField' });
                goNext = false;
            }
        }
        if (activeStep === 2) {

            if (this.props.new_election_module.electionConfig.length > 0 && this.props.new_election_module.electionConfig.length !== undefined) {
                for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
                    for (let j = 0; j < authorities.length; j++) {
                        if (this.props.new_election_module.electionConfig[i].value ===  authorities[j].authority_id && this.props.new_election_module.electionConfig[i].value !==  "1") {
                            this.setState({errorTextAuthority:''});
                            goNext = true;
                            break;
                        }else{
                            this.setState({errorTextAuthority:'emptyField'});
                            goNext = false;
                        }
                    }
                }
                for (let i = 0; i < this.props.new_election_module.electionConfig.length; i++) {
                        if (this.props.new_election_module.electionConfig[i].value==='pure_vote_based' || this.props.new_election_module.electionConfig[i].value==='pure_prefrence_based' || this.props.new_election_module.electionConfig[i].value==='vote_and_prefrence') {
                            this.setState({errorTextCalType:''});
                            goNext = true;
                            break;
                        }else{
                            this.setState({errorTextCalType:'emptyField'});
                            goNext = false;
                        }
                }
            }else{
                this.setState({errorTextAuthority:'emptyField'});
                this.setState({errorTextCalType:'emptyField'});
                this.setState({errorTextSecurityDeposite:'emptyField'});
                this.setState({errorTextObjection:'emptyField'});
                this.setState({errorTextAlliance:'emptyField'});
                this.setState({errorTextSubmisionBy:'emptyField'});
                goNext = false;
            }

            debugger;
            // (this.state.moduleId) ? this.props.editElection(this.state.moduleId,this.props.new_election_module) : this.props.submitElection(this.props.new_election_module);
            // this.props.submitElection(this.props.new_election_module);
            const { openSnackbar } = this.props;

            this.setState({
                // goToHome: true
            });
            return;
        }
        if (goNext) {
            this.setState({
                activeStep: activeStep + 1,
                skipped,
            });
        }
    };
    onOpenModal = () => {
        this.setState({ open: true });

    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    render() {
        const { classes } = this.props;
        const steps = getSteps();
        const { activeStep } = this.state;
        const electionModule = this.props.new_election_module;
        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <Typography variant="h5" component="h3">
                            {electionModule.name} Election Configuration Wizard
                        </Typography>
                    </Grid>
                    <Grid item xs={12}>
                        <div>
                            {this.state.goToHome ? (
                                <Redirect to="/admin/home" />
                            ) : (
                                    <Paper className={classes.pageContent} elevation={1}>
                                        <Stepper activeStep={activeStep}>
                                            {steps.map((label, index) => {
                                                const props = {};
                                                const labelProps = {};
                                                return (
                                                    <Step key={label} {...props}>
                                                        <StepLabel {...labelProps}>{label}</StepLabel>
                                                    </Step>
                                                );
                                            })}
                                        </Stepper>
                                        <Grid className={classes.paperContent} container spacing={24}>
                                            <Grid item xs={12}>
                                                {this.getStepContent(activeStep, electionModule)}
                                            </Grid>
                                        </Grid>
                                        <div>
                                            <Button
                                                disabled={activeStep === 0}
                                                onClick={this.handleBack}
                                                className={classes.button}
                                            >
                                                Back
                                            </Button>
                                            <Button
                                                onClick={this.handleCancel}
                                                className={classes.button}
                                            >
                                                Cancel
                                            </Button>
                                            {(this.state.moduleId && activeStep === 2) ?
                                                <Button
                                                    variant="contained"
                                                    color="default"
                                                    // onClick={this.handleDelete}
                                                    onClick={this.onOpenModal}
                                                    className={classes.button}
                                                >
                                                    Delete
                                                <DeleteIcon className={classes.rightIcon} />
                                                </Button> : ''

                                            }
                                            {(this.state.moduleId) ?
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Update' : 'Next'}
                                                </Button>
                                                :
                                                <Button
                                                    variant="contained"
                                                    color="primary"
                                                    onClick={this.handleNext}
                                                    className={classes.button}
                                                >
                                                    {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                                </Button>
                                            }
                                        </div>
                                        <Dialog
                                            open={this.state.open}
                                            TransitionComponent={Transition}
                                            keepMounted
                                            onClose={this.handleClose}
                                            aria-labelledby="alert-dialog-slide-title"
                                            aria-describedby="alert-dialog-slide-description"
                                        >
                                            <DialogTitle id="alert-dialog-slide-title">
                                            </DialogTitle>
                                            <DialogContent>

                                                <DialogContentText id="alert-dialog-slide-description">
                                                    {/* <WarningIcon className={classes.warningIcon} /> */}
                                                    Are You Sure You Want to Delete This Election Template?
                                            </DialogContentText>
                                            </DialogContent>
                                            <DialogActions>
                                                <Button id={this.state.moduleId} value="OK" onClick={this.handleDelete} color="primary">
                                                    OK
                                            </Button>
                                                <Button onClick={this.onCloseModal} color="primary">
                                                    Cancel
                                            </Button>
                                            </DialogActions>
                                        </Dialog>
                                    </Paper>
                                )}
                        </div>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

CreateElection.propTypes = {
    classes: PropTypes.object,
};


const mapStateToProps = ({ ElectionModel, Election }) => {
    const { openSnackbar } = Election;

    const { new_election_module, deleteElectionModule } = ElectionModel;
    return { new_election_module, openSnackbar, deleteElectionModule };
};

const mapActionsToProps = {
    createElection,
    updateElection,
    submitElection,
    editElection,
    openSnackbar,
    getElectionTemplateData,
    deleteElectionModule
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateElection));

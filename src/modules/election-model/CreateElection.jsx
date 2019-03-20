import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { Redirect } from 'react-router-dom';
import CandidateForm from './CandidateForm';
import DivisionConfig from './DivisionConfig';
import ElectionConfig from './ElectionConfig';
import { createElection, updateElection } from './state/ElectionAction';
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
    }
});

function getSteps() {
    return ['Candidate Form Configuration', 'Division Configuration', 'Election Configuration'];
}

class CreateElection extends React.Component {
    state = {
        activeStep: 0,
        skipped: new Set(),
    };

    constructor() {
        super();
        this.handleElectionChange = this.handleElectionChange.bind(this);
    }

    getStepContent(step) {
        switch (step) {
            case 0:
                return <CandidateForm
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                />;
            case 1:
                return <DivisionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                />;
            case 2:
                return <ElectionConfig
                    electionModule={this.props.new_election_module}
                    electionChanged={this.handleElectionChange}
                />;
            default:
                return 'Unknown step';
        }
    }

    handleElectionChange(electionModule) {
        const { updateElection } = this.props;
        updateElection(electionModule);
    }

    componentDidMount() {
        const { createElection } = this.props;
        createElection(this.props.location.state.name);
    }

    isStepOptional = step => step === 1;

    handleNext = () => {
        const { activeStep } = this.state;
        let { skipped } = this.state;
        this.setState({
            activeStep: activeStep + 1,
            skipped,
        });
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
                            {activeStep === steps.length ? (
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
                                            <Button
                                                variant="contained"
                                                color="default"
                                                onClick={this.handleSave}
                                                className={classes.button}
                                            >
                                                Save
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                onClick={this.handleNext}
                                                className={classes.button}
                                            >
                                                {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                                            </Button>
                                        </div>
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


const mapStateToProps = ({ ElectionModel }) => {
    const { new_election_module } = ElectionModel;
    return { new_election_module };
};

const mapActionsToProps = {
    createElection,
    updateElection
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CreateElection));

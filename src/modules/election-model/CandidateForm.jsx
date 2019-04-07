import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {SupportingDocuments} from './Fixtures';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import _ from 'lodash';

const styles = theme => ({
    root: {
        display: 'flex',
    },
    formControl: {
        margin: 12,
    },
});


class CandidateForm extends React.Component {
    state = {};

    constructor(){
        super();
        this.handleChangeSupportingDocuments = this.handleChangeSupportingDocuments.bind(this);
        this.handleChangeCandidateFormConfig = this.handleChangeCandidateFormConfig.bind(this);
    }

    handleChangeSupportingDocuments(event){
        let supportingDocuments = this.props.electionModule.supportingDocuments;
        // remove item in any case.
        supportingDocuments = supportingDocuments.filter(item=>{
            return item.supportDocConfigId !== event.target.value
        });
        if(event.target.checked){
            supportingDocuments.push({ supportDocConfigId: event.target.value })
        }
        this.props.electionChanged({ ...this.props.electionModule, supportingDocuments });
    }

    handleChangeCandidateFormConfig(event){
        let candidateFormConfiguration = this.props.electionModule.candidateFormConfiguration;
        // remove item in any case.
        candidateFormConfiguration = candidateFormConfiguration.filter(item=>{
            return item.candidateConfigId !== event.target.value
        });
        if(event.target.checked){
            candidateFormConfiguration.push({ candidateConfigId: event.target.value })
        }
        this.props.electionChanged({ ...this.props.electionModule, candidateFormConfiguration });
    }

    supportDocConfigId

    render() {
        const classes = styles();
        const electionModule = this.props.electionModule;

        const CandidateFormConfig = this.props.candidateConfigs;
        let middle = (CandidateFormConfig.length)/2;
        middle += ((CandidateFormConfig.length)%2)?1:0;
        const columnOne = CandidateFormConfig.slice(0, middle);
        const columnTwo = CandidateFormConfig.slice(middle);

        const SupportingDocuments = this.props.candidateSupportingDocs;
        let smiddle = (SupportingDocuments.length)/2;
        smiddle += ((SupportingDocuments.length)%2)?1:0;
        const scolumnOne = SupportingDocuments.slice(0, middle);
        const scolumnTwo = SupportingDocuments.slice(middle);

        return (
            <div className={classes.root}>
                <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { columnOne.map((element)=>{
                        return (<FormControlLabel
                        control={
                            <Checkbox 
                                checked={electionModule.candidateFormConfiguration.filter(item => {
                                    return item.candidateConfigId === element.key;
                                }).length > 0} 
                                onChange={this.handleChangeCandidateFormConfig} 
                                value={element.key} 
                            />
                        }
                        label={element.value}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
                <FormControl required component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { columnTwo.map((element)=>{
                        return (<FormControlLabel
                        control={
                            <Checkbox 
                                checked={electionModule.candidateFormConfiguration.filter(item => {
                                    return item.candidateConfigId === element.key;
                                }).length > 0} 
                                onChange={this.handleChangeCandidateFormConfig} 
                                value={element.key} 
                            />
                        }
                        label={element.value}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
                <br /><br />
                <Typography variant="h6">
                    Supporting Documents
                </Typography>
                <Divider />
                <FormControl component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { scolumnOne.map((element)=>{
                        return (<FormControlLabel
                        control={
                            <Checkbox 
                                checked={electionModule.candidateFormConfiguration.filter(item => {
                                    return item.candidateConfigId === element.key;
                                }).length > 0} 
                                onChange={this.handleChangeSupportingDocuments} 
                                value={element.key} />
                        }
                        label={element.value}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
                <FormControl required component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { scolumnTwo.map((element)=>{
                        return (<FormControlLabel
                        control={
                            <Checkbox 
                                checked={electionModule.candidateFormConfiguration.filter(item => {
                                    return item.candidateConfigId === element.key;
                                }).length > 0} 
                                onChange={this.handleChangeSupportingDocuments} 
                                value={element.key} 
                            />
                        }
                        label={element.value}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
            </div>
        );
    }
}

CandidateForm.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(CandidateForm);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import {CandidateFormConfig, SupportingDocuments} from './Fixtures';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';

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

    render() {
        const classes = styles();
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.checked });
        };
        let middle = (CandidateFormConfig.length)/2;
        middle += ((CandidateFormConfig.length)%2)?1:0;
        const columnOne = CandidateFormConfig.slice(0, middle);
        const columnTwo = CandidateFormConfig.slice(middle);

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
                        control={<Checkbox checked={this.state[element.value]} onChange={handleChange(element.value)} value={element.value} />}
                        label={element.label}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
                <FormControl required component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { columnTwo.map((element)=>{
                        return (<FormControlLabel
                        control={<Checkbox checked={this.state[element.value]} onChange={handleChange(element.value)} value={element.value} />}
                        label={element.label}
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
                        control={<Checkbox checked={this.state[element.value]} onChange={handleChange(element.value)} value={element.value} />}
                        label={element.label}
                        />);
                    }) }
                </FormGroup>
                </FormControl>
                <FormControl required component="fieldset" className={classes.formControl}>
                <FormGroup>
                    { scolumnTwo.map((element)=>{
                        return (<FormControlLabel
                        control={<Checkbox checked={this.state[element.value]} onChange={handleChange(element.value)} value={element.value} />}
                        label={element.label}
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
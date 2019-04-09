import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';
import { EligibilityCheckList } from './Fixtures';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import _ from 'lodash';



const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: 12,
    },
    group: {
        width: 'auto',
        height: 'auto',
        display: 'flex',
        flexWrap: 'nowrap',
        flexDirection: 'row',
    }
});
const authorities = [{
    "authority_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Create Election",
  }, {
    "authority_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "Officer Incharge of Calling Election",
  }];

class ElectionConfig extends React.Component {
    state = {
        divisions: [],
        eligibilityCheckList: [],
        selectedAuthority: '',
    };

    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
        this.handleNominationSubmission = this.handleNominationSubmission.bind(this);
        this.handleEligibility = this.handleEligibility.bind(this);
    }

    handleChange(event) {
        debugger;
        if(event && event.target ){
            const target = event.target;
            const value = target.type === 'checkbox' ? target.checked : target.value;
            const name = target.name;
        
            this.props.electionChanged({ ...this.props.electionModule, [name]: value });
        }
    }

    handleNominationSubmission(value, event) {
        const newElectionModule = {...this.props.electionModule};
        if(event.target.checked){
            newElectionModule.nominationSubmission.push(value);
        }else{
            newElectionModule.nominationSubmission = _.remove(newElectionModule.nominationSubmission, (element)=>{
                return element !== value;
            });
        }
        this.props.electionChanged(newElectionModule); 
    }

    handleEligibility(row, event) {
        const newElectionModule = {...this.props.electionModule};
        if(event.target.checked){
            newElectionModule.eligibilityCheckList[row.value] = true;
        }else{
            delete newElectionModule.eligibilityCheckList[row.value];
        }
        this.props.electionChanged(newElectionModule);
    }

    render() {
        const classes = styles();

        const electionModule = this.props.electionModule;
        electionModule.eligibilityCheckList = {...electionModule.eligibilityCheckList};
        let authority = this.state.authority;


    const menuItems = authorities.map(authority => (
        <MenuItem value={authority.authority_id}>{authority.name}</MenuItem>));
        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="authority">Authority</InputLabel>
                            <Select
                                style={{width:'200px'}}
                                value={this.state.authority}
                                onChange={this.handleChange}
                                inputProps={{
                                name: 'authority',
                                id: 'authority',
                                }}
                            >
                                {menuItems}

                            </Select>
                            {/* <Input id="authority" name="authority" value={this.state.authority} onChange={this.handleChange} /> */}
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Calculation Type</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="CalculationType"
                                className={classes.group}
                                onChange={this.handleChange}
                                value={this.props.electionModule['CalculationType']}
                                row
                            >
                                <FormControlLabel control={<Radio />} value="pure_vote_based" label="Pure vote-based" />
                                <FormControlLabel control={<Radio />} value="pure_prefrence_based" label="Pure preference-based" />
                                <FormControlLabel control={<Radio />} value="vote_and_prefrence" label="Vote &amp; Prefrential Based" />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Nomination Submission By</FormLabel>
                            <RadioGroup
                                aria-label="Nomination Submission"
                                className={classes.group}
                                row
                            >
                                <FormControlLabel 
                                    control={
                                        <Checkbox 
                                            checked={this.props.electionModule.nominationSubmission.includes('Party Secretory')}
                                            onChange={(e)=>{this.handleNominationSubmission('Party Secretory', e);}} 
                                        />
                                    }
                                    label="Party Secretory"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox  
                                            checked={this.props.electionModule.nominationSubmission.includes('Independent Group Leader')} 
                                            onChange={(e)=>{this.handleNominationSubmission('Independent Group Leader', e);}}
                                        />
                                    }
                                    label="Independent Group Leader"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Security Deposit</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="SecurityDeposit"
                                className={classes.group}
                                value={this.props.electionModule['SecurityDeposit']}
                                onChange={this.handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    value="Yes"
                                    label="Security Deposit"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="No Security Deposit"
                                    value="No"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Objections</FormLabel>
                            <RadioGroup
                                aria-label="Objections"
                                name="Objections"
                                className={classes.group}
                                value={this.props.electionModule['Objections']}
                                onChange={this.handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Allowed&nbsp;"
                                    value="Allowed"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Not Allowed"
                                    value="NotAllowed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Create Alliance</FormLabel>
                            <RadioGroup
                                aria-label="Create Alliance"
                                name="CreateAlliance"
                                className={classes.group}
                                value={this.props.electionModule['CreateAlliance']}
                                onChange={this.handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Allowed&nbsp;"
                                    value="Allowed"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio />
                                    }
                                    label="Not Allowed"
                                    value="NotAllowed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                    <Button
                  variant="contained"
                  color="primary"
                  onClick={this.handleNext}
                  className={classes.button}
                >
                  Add Eligibility
                </Button>
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Eligibility Criteria Check List</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {EligibilityCheckList.map(row => (
                                    <TableRow key={row.id}>
                                        <TableCell padding="checkbox" width="20">
                                            <Checkbox
                                                checked={electionModule.eligibilityCheckList[row.value]}
                                                onChange={(event)=>{this.handleEligibility(row, event);}}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row">
                                            {row.label}
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

ElectionConfig.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(ElectionConfig);
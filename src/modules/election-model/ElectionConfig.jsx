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
    "name": "Secratory",
  }, {
    "authority_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
    "name": "2020 Provincial",
  }];

class ElectionConfig extends React.Component {
    state = {
        divisions: [],
        eligibilityCheckList: [],
    };

    constructor(){
        super();
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(name){
        return function(event){ 
            debugger;
            this.props.electionChanged({ ...this.props.electionModule, [name]: event.target.value });
        }.bind(this);
    }

    render() {
        const classes = styles();
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.value });
        };

        const handleEligibility = (value) => () => {
            this.setState(this.state.eligibilityCheckList.push(value));
        }
        let authority = this.state.authority;


    const menuItems = authorities.map(authority => (
        <MenuItem value={authority.authority_id}>{authority.name}</MenuItem>));
        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            {/* <InputLabel htmlFor="authority">Authority</InputLabel>
                            <Input id="authority" value={this.state.authority} onChange={handleChange('authority')} /> */}
                            <InputLabel htmlFor="election-select">Authority</InputLabel>
                            <Select
                                style={{width:'200px'}}
                                value={this.state.authority}
                                // onChange={this.handleChangeElection}
                                inputProps={{
                                name: 'election',
                                id: 'election-select',
                                }}
                            >
                                {menuItems}

                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Calculation Type</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={"male"}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio onChange={this.handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Pure vote-based"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={this.handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Pure preference-based"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Vote &amp; Prefrential Based"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Nomination Submission By</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={"male"}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Party Secretory"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Independent Group Leader"
                                />
                                <FormControlLabel
                                    control={
                                        <Checkbox onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Add New"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Security Deposit</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={"male"}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Security Deposit"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="No Security Deposit"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Objections</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={"male"}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Allowed&nbsp;"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Not Allowed"
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl component="fieldset">
                            <FormLabel component="legend">Create Alliance</FormLabel>
                            <RadioGroup
                                aria-label="Gender"
                                name="gender1"
                                className={classes.group}
                                value={"male"}
                                onChange={handleChange}
                                row
                            >
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Allowed&nbsp;"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Not Allowed"
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
                                                checked={this.state.eligibilityCheckList.includes(row.value)}
                                                onChange={handleEligibility(row.value)}
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
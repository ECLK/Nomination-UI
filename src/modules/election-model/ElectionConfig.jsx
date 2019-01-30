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


class ElectionConfig extends React.Component {
    state = {
        divisions: [],
        eligibilityCheckList: [],
    };

    render() {
        const classes = styles();
        const handleChange = name => event => {
            this.setState({ ...this.state, [name]: event.target.value });
        };

        const addDivision = () => {
            const division = {
                code: this.state.code,
                name: this.state.name,
                noOfCandidates: this.state.noOfCandidates
            }
            const divisions = this.state.divisions;
            divisions.push(division);
            this.setState({ ...this.state, divisions, code: "", name: "", noOfCandidates: "" });
        }

        const removeDivision = (index) => () => {
            const divisions = this.state.divisions;
            divisions.splice(index, 1);
            this.setState({ ...this.state, divisions });
        }

        const handleEligibility = (value) => () => {
            this.state.eligibilityCheckList.push(value);
        }

        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="authority">Authority</InputLabel>
                            <Input id="authority" value={this.state.authority} onChange={handleChange('authority')} />
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
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="Pure vote-based"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
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
                            <FormLabel component="legend">Deposit Payment</FormLabel>
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
                                    label="Payment"
                                />
                                <FormControlLabel
                                    control={
                                        <Radio onChange={handleChange('checkedA')} value="checkedA" />
                                    }
                                    label="No Payment"
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
                        <Table className={classes.table}>
                            <TableHead>
                                <TableRow>
                                    <TableCell></TableCell>
                                    <TableCell>Eligibility Check List</TableCell>
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
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
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    formControl: {
        margin: 12,
    },
});


class DivisionConfig extends React.Component {
    state = {
        divisions: []
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
            this.setState({...this.state, divisions , code:"", name:"", noOfCandidates:""});
        }

        const removeDivision = (index) => () => {
            const divisions = this.state.divisions;
            divisions.splice(index, 1);
            this.setState({...this.state, divisions});
        }

        return (
            <div className={classes.root}>

                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="common-name">Division Common Name</InputLabel>
                            <Input id="common-name" value={this.state.division} onChange={handleChange('division')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>

                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="common-name">Code</InputLabel>
                            <Input id="common-name" value={this.state.code} onChange={handleChange('code')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="common-name">Name</InputLabel>
                            <Input id="common-name" value={this.state.name} onChange={handleChange('name')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={2}>
                        <FormControl className={classes.formControl}>
                            <InputLabel htmlFor="common-name">No of Candidates</InputLabel>
                            <Input id="common-name" value={this.state.noOfCandidates} onChange={handleChange('noOfCandidates')} />
                        </FormControl>
                    </Grid>
                    <Grid item xs={6}>
                        <IconButton variant="outlined" className={classes.button} aria-label="Delete" onClick={addDivision}>
                            <AddIcon />
                        </IconButton>
                    </Grid>
                    {
                        this.state.divisions.map((element, index) => {
                            return (<React.Fragment>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.code}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.name}</Typography>
                                </Grid>
                                <Grid item xs={2}>
                                    <Typography variant="body1" >{element.noOfCandidates}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                    <IconButton variant="outlined" className={classes.button} aria-label="Delete" onClick={removeDivision(index)}>
                                        <DeleteIcon />
                                    </IconButton>
                                </Grid>
                            </React.Fragment>);
                        })
                    }
                </Grid>
            </div>
        );
    }
}

DivisionConfig.propTypes = {
    classes: PropTypes.object,
};

export default withStyles(styles)(DivisionConfig);
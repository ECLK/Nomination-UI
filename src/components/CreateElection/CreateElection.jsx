import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {withStyles} from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';//--
import CardActions from '@material-ui/core/CardActions';//--
import CardContent from '@material-ui/core/CardContent';//--
import Button from '@material-ui/core/Button';//--
import Typography from '@material-ui/core/Typography';//--
import { Redirect } from 'react-router-dom'

const styles = theme => ({
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
    },
    dense: {
        marginTop: 16,
    },
    menu: {
        width: 200,
    },
    textCallElection:{
        marginLeft:'10px',
    }
});

const ElectionModule = [
    {
        value: 'Parliamentary',
        label: 'Parliamentary',
    },
    {
        value: 'Provincial',
        label: 'Provincial',
    },

];

class FilledTextFields extends React.Component {
    state = {
        ModuleName: 'Parliamentary ',
        goToConfig: false,
    };

    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    handleNext() {
        this.setState({goToConfig:true});
    }

    render() {
        const {classes} = this.props;

        if (this.state.goToConfig) return <Redirect to="/admin/create-election" />;

        return (

            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Create Election
                    </Typography>
                    <form className={classes.container} noValidate autoComplete="off">
                        <TextField
                            id="filled-name"
                            label="Module Name "
                            className={classes.textField}
                            value={this.state.ModuleName}
                            onChange={this.handleChange('ModuleName')}
                            margin="normal"
                            variant="filled"
                        />


                    </form>

                    <Typography className={classes.textCallElection} component="p">
                        <br />
                         Module ID :PA1112

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" onClick={this.handleNext}>Next</Button>
                </CardActions>
            </Card>
        );
    }
}

FilledTextFields.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(FilledTextFields);

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
import {postElection } from './state/ElectionAction';
import { connect } from 'react-redux';
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
        value: '455cd89e-269b-4b69-96ce-8d7c7bf44ac2',
        label: 'Parliamentary',
    },
    {
        value: '7404a229-6274-43d0-b3c5-740c3c2e1256',
        label: 'Presidential',
    },
    {
        value: '27757873-ed40-49f7-947b-48b432a1b062',
        label: 'Provincial',
    },

];

class CallElection extends React.Component {
    state = {
        electionName: '',
        ElectionModule: '',
        goToConfig: false,

    };

    constructor(props){
        super(props);
        this.handleNext = this.handleNext.bind(this);
    }

    handleSubmit = (e) => {
        const {postElection} = this.props;
      
        e.preventDefault();
        postElection(this.state);
       
    };

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

        if (this.state.goToConfig) return <Redirect to="/admin/active-election" />;


        return (
                    <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Call Election
                    </Typography>
                        <TextField
                            id="filled-name"
                            label="Election Name "
                            className={classes.textField}
                            value={this.state.electionName}
                            onChange={this.handleChange('electionName')}
                            margin="normal"
                            variant="filled"
                        />

                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Module"

                            className={classes.textField}
                            value={this.state.currency}
                            onChange={this.handleChange('ElectionModule')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}

                            helperText="Please select your Election Module"
                            margin="normal"
                            variant="filled"
                        >
                            {ElectionModule.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </TextField>

                    <Typography className={classes.textCallElection} component="p">
                        Election ID :EL2018111112

                    </Typography>
                </CardContent>
                <CardActions>
                    <Button type='submit' onClick={this.handleNext} size="small">Next</Button>
                </CardActions>
            </Card>
                    </form>
        );
    }
}

CallElection.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = ({Election}) => {
    const {postElection} = Election;    
    return {postElection};
  };
  
  const mapActionsToProps = {
    postElection,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CallElection));
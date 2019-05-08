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
import {setCallElectionData} from './state/ElectionAction';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom'


const styles = theme => ({
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


class CallElection extends React.Component {
    state = {
        electionName: '',
        ElectionModule: '',
        goToConfig: false,
    };

    constructor(props){
        super(props);
    }
         
    handleSubmit = (e) => {
        this.setState({goToConfig:true});
        const { setCallElectionData } = this.props;
        e.preventDefault();
        setCallElectionData(this.state);
    };

    handleChange = name => event => {
        this.setState({
            [name]: event.target.value,
        });
    };

    render() {
        const {classes,electionModules} = this.props;
        if (this.state.goToConfig) return <Redirect to="/admin/active-election" />;
        return (
                    <form className={classes.container} onSubmit={this.handleSubmit} noValidate autoComplete="off">
            <Card className={classes.card}>
                <CardContent>
                    <Typography variant="h5" component="h2">
                        Call Election
                    </Typography>
                        <TextField
                            id="filled-select-currency-native"
                            select
                            label="Election Template"

                            className={classes.textField}
                            value={this.state.currency}
                            onChange={this.handleChange('electionModule')}
                            SelectProps={{
                                native: true,
                                MenuProps: {
                                    className: classes.menu,
                                },
                            }}

                            helperText="Please select your election template"
                            margin="normal"
                            variant="filled"
                        >
                        <option >
                                   -- Select Template --
                                </option>
                            {electionModules.map(option => (
                                <option key={option.id} value={option.id}>
                                    {option.name}
                                </option>
                            ))}
                        </TextField>
                        <TextField
                            id="filled-name"
                            label="Election Name "
                            helperText="Please type your Election Name"
                            className={classes.textField}
                            value={this.state.electionName}
                            onChange={this.handleChange('electionName')}
                            margin="normal"
                            variant="filled"
                        />
                </CardContent>
                <CardActions>
                    <Button type='submit' size="small">Next</Button>
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
    const {setCallElectionData} = Election;  
    return {setCallElectionData};
  };
  
  const mapActionsToProps = {
    setCallElectionData,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(CallElection));
import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';
import CreateElection from 'components/CreateElection/CreateElection';
import CallElection from 'components/CallElection/CallElection';
import ElectionModule from 'components/ElectionModule/ElectionModule';
import ActiveElection from 'components/ActiveElection/ActiveElection.jsx';
import Paper from '@material-ui/core/Paper';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';

const styles = theme => ({
    container: {
        marginLeft: theme.spacing.unit * 35,
        paddingTop: 10,
    },


});
const h1Style = {
    marginLeft: '-850px'
};

class Home extends React.Component {
    state = {
        open: true,

    };

    handleDrawerOpen = () => {
        this.setState({open: true});
    };

    handleDrawerClose = () => {
        this.setState({open: false});
    };

    render() {
        const {classes} = this.props;

        return (
            <div>
                <MainMenu title="Elections Commission of Sri Lanka"></MainMenu>

                <div className={classes.container}>
                    <Typography variant="h5" component="h2">
                        Election Home
                    </Typography>
                    <br />
                    <Grid container spacing={24}>

                        <Grid item xs={12} sm={6}>
                            <CreateElection></CreateElection>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <CallElection></CallElection>
                        </Grid>

                    </Grid>
                    <br />
                    <Typography variant="h5" component="h2">
                        Election Module
                    </Typography>
                    <ElectionModule></ElectionModule>
                    <br />
                    <Typography variant="h5" component="h2">
                        Active Election
                    </Typography>
                    <ActiveElection></ActiveElection>
                </div>
            </div>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
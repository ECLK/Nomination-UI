import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';

import MainMenu from 'components/MainMenu/MainMenu';
import CreateElection from 'components/CreateElection/CreateElection';
import CallElection from 'components/CallElection/CallElection';
import ElectionModule from 'components/ElectionModule/ElectionModule';
import ActiveElection from 'components/ActiveElection/ActiveElection.jsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import ExpansionPanel from '@material-ui/core/ExpansionPanel';//---
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';///-
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

import Paper from '@material-ui/core/Paper';







const styles = theme => ({
    container: {
        marginLeft: theme.spacing.unit * 35,
        paddingTop: 10,
    },heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,

        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    xxxxx:{
        wide:'full'
    }


});
const h1Style = {
    marginLeft: '-850px'
};

class Home extends React.Component {
        state = {
            open: true,
            expanded:null,
        };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };


    render() {
        const {classes} = this.props;
        const { expanded } = this.state;
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
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Election Module</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails >
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}> <ElectionModule></ElectionModule></Paper>
                                </Grid>
                            </Grid>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>
                    <ExpansionPanel>
                        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography className={classes.heading}>Active Election</Typography>
                        </ExpansionPanelSummary>
                        <ExpansionPanelDetails>
                            <Grid container spacing={24}>
                                <Grid item xs={12}>
                                    <Paper className={classes.paper}><ActiveElection></ActiveElection></Paper>
                                </Grid>
                            </Grid>

                        </ExpansionPanelDetails>
                    </ExpansionPanel>



                </div>
            </div>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
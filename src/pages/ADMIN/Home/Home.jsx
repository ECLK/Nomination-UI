import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import CreateElection from 'components/CreateElection/CreateElection';
import CallElection from '../../../modules/election/CallElection';
import ElectionModule from 'components/ElectionModule/ElectionModule';
import ActiveElection from 'components/ActiveElection/ActiveElection.jsx';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';//---
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';///-
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Paper from '@material-ui/core/Paper';
import {getElectionModules} from '../../../modules/election/state/ElectionAction';
import {connect} from 'react-redux';



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
    },
    panel_wrapper: {
        "min-width": 800,
      },
      heading: {
        padding: 14,
      },
      root: {
        display: 'flex',
    },


});
const h1Style = {
    marginLeft: '-850px'
};

class Home extends React.Component {
        state = {
            open: true,
            expanded:null,
            expandedPanelIndex: -1,
            electionModules:[]
        };

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    togglePanel = panelIndex => (event, didExpand) => {
        this.setState({
          expandedPanelIndex: didExpand ? panelIndex : -1,
        });
      };
    
    componentDidMount() {
        const {getElectionModules} = this.props;
        
        getElectionModules();
      }


    render() {
        const {classes,electionModules} = this.props;
        const { expanded,expandedPanelIndex } = this.state;
        console.log("electionModules",electionModules);

        const electionModuleElements = electionModules.map((electionModule, i) => (
            <ExpansionPanel expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Grid container classname={classes.panel_wrapper} spacing={16}>
                  <Grid item xs="3">
                    {/* <Typography className={classes.heading}>{electionModule.id}</Typography> */}
                  </Grid>
                  <Grid item xs="6">
                    <Typography className={classes.heading}>({electionModule.name})</Typography>
                  </Grid>
                  <Grid item xs="3">
                        
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container classname={classes.panel_wrapper} spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}> <ElectionModule></ElectionModule></Paper>
                </Grid>                
                </Grid>
                <br />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ));
          const callElectionElements = electionModules.map((electionModule, i) => (
            <ExpansionPanel expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
              <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                <Grid container classname={classes.panel_wrapper} spacing={16}>
                  <Grid item xs="3">
                    {/* <Typography className={classes.heading}>{electionModule.id}</Typography> */}
                  </Grid>
                  <Grid item xs="6">
                    <Typography className={classes.heading}>({electionModule.name})</Typography>
                  </Grid>
                  <Grid item xs="3">
                        
                  </Grid>
                </Grid>
              </ExpansionPanelSummary>
              <ExpansionPanelDetails>
                <Grid container classname={classes.panel_wrapper} spacing={24}>
                <Grid item xs={12}>
                    <Paper className={classes.paper}> <ElectionModule></ElectionModule></Paper>
                </Grid>                
                </Grid>
                <br />
              </ExpansionPanelDetails>
            </ExpansionPanel>
          ));

        return (
            <div>
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>

                <div className={classes.container}>
                    <Typography variant="h5" component="h2">
                        Election Home
                    </Typography>
                    <br />
                    <Grid container className={classes.root} spacing={32}>

                        <Grid item xs={5} >
                            <CreateElection></CreateElection>
                        </Grid>
                        <Grid item xs={5} >
                            <CallElection electionModules={electionModules}></CallElection>
                        </Grid>
                    </Grid>
                    <Grid container className={classes.root} spacing={32}>

                        <Grid item xs={5} >
                        <div style={{width: '100%'}}>
                        {electionModuleElements}
                        </div>
                        </Grid>
                        <Grid item xs={5} >
                        <div style={{width: '100%'}}>
                        {callElectionElements}
                        </div>
                        </Grid>
                    </Grid>
                    <br />
                    {/* <div style={{width: '100%'}}>
                        {electionModuleElements}
                    </div> */}
                    {/* <ExpansionPanel>
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
                    </ExpansionPanel> */}



                </div>
            </div>

        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};


const mapStateToProps = ({Election}) => {
    const {getElectionModules} = Election;
    const electionModules = Election.allElectionModules;

    return {getElectionModules,electionModules};
  };
  
  const mapActionsToProps = {
    getElectionModules,
  };
  
  export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Home));
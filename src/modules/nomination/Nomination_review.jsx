import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import {connect} from 'react-redux';
import classNames from 'classnames';
import {APPROVAL_STATE} from  './state/NominationTypes';
import {getNominations, onChangeApproval} from './state/NominationAction';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import Alarm from '@material-ui/icons/Alarm';
import Done from '@material-ui/icons/Done';
import Block from '@material-ui/icons/Block';


//ToDo: Remove if not required
const drawerWidth = 240;
/*const styles = theme => ({
 root: {
 display: 'flex',
 },
 toolbar: {
 paddingRight: 24, // keep right padding when drawer closed
 },
 toolbarIcon: {
 display: 'flex',
 alignItems: 'center',
 justifyContent: 'flex-end',
 padding: '0 8px',
 ...theme.mixins.toolbar,
 },
 appBar: {
 zIndex: theme.zIndex.drawer + 1,
 transition: theme.transitions.create(['width', 'margin'], {
 easing: theme.transitions.easing.sharp,
 duration: theme.transitions.duration.leavingScreen,
 }),
 },
 appBarShift: {
 marginLeft: drawerWidth,
 width: `calc(100% - ${drawerWidth}px)`,
 transition: theme.transitions.create(['width', 'margin'], {
 easing: theme.transitions.easing.sharp,
 duration: theme.transitions.duration.enteringScreen,
 }),
 },
 menuButton: {
 marginLeft: 12,
 marginRight: 36,
 },
 menuButtonHidden: {
 display: 'none',
 },
 title: {
 flexGrow: 1,
 },
 drawerPaper: {
 position: 'relative',
 whiteSpace: 'nowrap',
 width: drawerWidth,
 transition: theme.transitions.create('width', {
 easing: theme.transitions.easing.sharp,
 duration: theme.transitions.duration.enteringScreen,
 }),
 },
 drawerPaperClose: {
 overflowX: 'hidden',
 transition: theme.transitions.create('width', {
 easing: theme.transitions.easing.sharp,
 duration: theme.transitions.duration.leavingScreen,
 }),
 width: theme.spacing.unit * 7,
 [theme.breakpoints.up('sm')]: {
 width: theme.spacing.unit * 9,
 },
 },
 appBarSpacer: theme.mixins.toolbar,
 content: {
 flexGrow: 1,
 padding: theme.spacing.unit * 3,
 height: '100vh',
 overflow: 'auto',
 },
 h5: {
 marginBottom: theme.spacing.unit * 2,
 }
 });*/

const styles = theme => ({
  root: {
    padding: 24,
    paddingLeft: 264,
  },
  heading: {
    padding: 24,
  },
  dropDown: {
    paddingBottom: 10,
    paddingTop: 24,
  },
  container: {
    // padding: 10
  },
  candidates_table:{
    width: "97%",
    "min-width": 600,
  },
  candidate_table_cell: {

  },
  green_icon: {
    color: "green",
  },
  orange_icon: {
    color: "orange",
  },
  capitalize_text: {
    "text-transform": "capitalize",
  },
  panel_wrapper: {
    "min-width": 800,
  },
  left_icon: {
    marginLeft: theme.spacing.unit,
  },
  button: {
    margin: theme.spacing.unit,
  },
  green_button: {
    color: "darkgreen",
  },
  red_button: {
    color: "firebrick",
  },

});

class NominationReview extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      open: true,
      expandedPanelIndex: -1,
      nominations: [],
    }
  }


  componentDidMount() {
    const {getNominations} = this.props;
    getNominations();
  }

  togglePanel = panelIndex => (event, didExpand) => {
    this.setState({
      expandedPanelIndex: didExpand ? panelIndex : -1,
    });
  };

  changeNominationStatus = (nominationId, status) => {
    const {onChangeApproval} = this.props;
    onChangeApproval(nominationId, status);
  };

  render() {
    const {classes, nominations} = this.props;
    const {expandedPanelIndex} = this.state;

    const elections = [{
      "election_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
      "election_name": "2019 Parliamentary",
    }, {
      "election_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
      "election_name": "2020 Provincial",
    }];

    let selectedElection = this.state.selectedElection;
    if (!selectedElection) {
      selectedElection = elections.length > 0 && elections[0].election_id;

    }

    const CandidateRow = (props) => {
      const { classes, candidate } = props;
      return (
        <React.Fragment>
          <TableRow key={candidate.nic}>
            <TableCell className={classes.candidate_table_cell} align="left">
                {candidate.nic}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                {candidate.name_in_sinhala}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                {candidate.name_in_tamil}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                {candidate.name_in_english}
            </TableCell>
            <TableCell className={classNames(classes.candidate_table_cell, classes.capitalize_text)} align="left">
                {candidate.occupation}
            </TableCell>
            <TableCell className={classes.candidate_table_cell} align="left">
                {candidate.address}
            </TableCell>
          </TableRow>
        </React.Fragment>
      );
    };

    const nominationElements = nominations.map((nomination, i) => (
      <ExpansionPanel expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="3">
              <Typography className={classes.heading}>{nomination.nomination_id}</Typography>
            </Grid>
            <Grid item xs="6">
              <Typography className={classes.heading}>({nomination.party} | {nomination.district})</Typography>
            </Grid>
            <Grid item xs="3">
                  <Button
                    variant={ nomination.approval_status==="approved" ? "contained" : "outlined" }
                    disabled={ nomination.approval_status==="approved" }
                    onClick={ () => { this.changeNominationStatus(nomination.nomination_id, APPROVAL_STATE.APPROVED ) }}
                    className={classNames(classes.button, classes.green_button)}>
                    {nomination.approval_status==="approved" ? "Approved" : "Approve"}
                    <Done className={classes.left_icon} />
                  </Button>

                  <Button
                    variant={ nomination.approval_status==="rejected" ? "contained" : "outlined" }
                    disabled={ nomination.approval_status==="rejected" }
                    onClick={ () => { this.changeNominationStatus(nomination.nomination_id, APPROVAL_STATE.REJECTED ) }}
                    className={classNames(classes.button, classes.red_button)}>
                    {nomination.approval_status==="rejected" ? "Rejected" : "Reject"}
                    <Block className={classes.left_icon} />
                  </Button>
            </Grid>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid container classname={classes.panel_wrapper} spacing={16}>
            <Grid item xs="10">
              <Table className={classes.candidates_table}>
                <TableHead>
                  <TableCell align="left">NIC</TableCell>
                  <TableCell align="left">Name in Sinhala</TableCell>
                  <TableCell align="left">Name in Tamil</TableCell>
                  <TableCell align="left">Name in English</TableCell>
                  <TableCell align="left">Occupation</TableCell>
                  <TableCell align="left">Address</TableCell>
                </TableHead>
                <TableBody>
                  {
                    nomination.candidates.map((candidate, index) =>
                      <CandidateRow candidate={candidate} classes={classes} />)
                  }
                </TableBody>
              </Table>
            </Grid>
            <Grid item xs="2">
              <Grid container spacing={0}>
                <List component="nav">
                  <ListItem>
                    <ListItemIcon>
                      {nomination.payment_status === "paid" ? <Done className={classes.green_icon} /> :
                        <Alarm className={classes.orange_icon} />}
                    </ListItemIcon>
                    <ListItemText className={classes.capitalize_text}
                                  primary={nomination.payment_status}
                                  secondary="Payment Status"/>
                  </ListItem>
                  <ListItem>
                    <ListItemIcon>
                      {nomination.objection_status === "verified" ? <Done className={classes.green_icon} /> :
                        <Alarm className={classes.orange_icon} />}
                    </ListItemIcon>
                    <ListItemText className={classes.capitalize_text}
                                  primary={nomination.objection_status}
                                  secondary="Objection Status" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </Grid>
          <br />
        </ExpansionPanelDetails>
      </ExpansionPanel>
    ));

    const menuItems = elections.map(election => (
      <MenuItem value={election.election_id}>{election.election_name}</MenuItem>));

    return (
      <div className={classes.root}>
        <CssBaseline />
        <AdminMenu title="Elections Commission of Sri Lanka"></AdminMenu>
        <Typography variant="h5" component="h2">
          Nomination review
        </Typography>
        <div className={classes.container}>

          <form className={classes.dropDown} autoComplete="off">
            <FormControl className={classes.formControl}>
              <InputLabel htmlFor="election-select">Election</InputLabel>
              <Select
                value={selectedElection}
                onChange={this.handleChangeElection}
                inputProps={{
                  name: 'election',
                  id: 'election-select',
                }}
              >
                {menuItems}

              </Select>
            </FormControl>
          </form>

          <br/>
          <br/>

          <div style={{width: '100%'}}>
            {nominationElements}
          </div>
          <br/>

        </div>
      </div>
    );
  }
}

NominationReview.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Nomination}) => {
  /*const {all_nominations} = Nomination;
  return {all_nominations}*/
  const {nominations} = Nomination;
  return {nominations};
};

const mapActionsToProps = {
  getNominations,
  onChangeApproval,
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(NominationReview));

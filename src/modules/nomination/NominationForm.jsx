import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import MainMenu from "components/MainMenu/MainMenu";
import NominationForm from "components/NominationForm";
import { getNominationPayments } from "./state/NominationAction";
import { connect } from "react-redux";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    display: "flex"
  },
  toolbar: {
    paddingRight: 24 // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: "0 8px",
    ...theme.mixins.toolbar
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 36
  },
  menuButtonHidden: {
    display: "none"
  },
  title: {
    flexGrow: 1
  },
  drawerPaper: {
    position: "relative",
    whiteSpace: "nowrap",
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  drawerPaperClose: {
    overflowX: "hidden",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    width: theme.spacing.unit * 7,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing.unit * 9
    }
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing.unit * 3,
    height: "100vh",
    overflow: "auto"
  },
  h5: {
    marginBottom: theme.spacing.unit * 2
  }
});

class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      nominationId: ""
    };
  }

  async componentDidMount() {
    const { getNominationPayments } = this.props;
    await getNominationPayments(this.props.location.state.id);
  }

  handleDrawerOpen = () => {
    this.setState({ open: true });
  };

  handleDrawerClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes, NominationPayments } = this.props;
    return (
      <div className={classes.root}>
        <CssBaseline />
        <MainMenu title="Elections Commission of Sri Lanka" />
        <NominationForm
          NominationPayments={NominationPayments}
          customProps={this.props.location.state.id}
          nominationStatus={this.props.location.state.status}
          title="Elections Commission of Sri Lanka"
        />
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

const mapStateToProps = ({ Nomination }) => {
  // const {nominationPayments} = Nomination;
  const { getNominationPayments } = Nomination;
  const NominationPayments = Nomination.getNominationPayments;

  // const {updateNominationPayments} = Nomination;

  return { getNominationPayments, NominationPayments };
};

const mapActionsToProps = {
  // postNominationPayments,
  getNominationPayments
  // updateNominationPayments
};

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Dashboard));

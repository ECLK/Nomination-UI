import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Header from 'components/Header/Header';
import InfoBanner from 'components/InfoBanner/InfoBanner';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';

const drawerWidth = 240;

const styles = theme => ({
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
});

class Dashboard extends React.Component {
    state = {
        open: true,
        election: { 
            electionTimeLine: new Array(4).fill(0),
        },
    };

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    componentDidMount(){
        Axios.get(`http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6`)
            .then(res => {
                const election = res.data;
                this.setState({ election });
                // console.log(this.state);
            });
    }

    render() {
        const { classes } = this.props;
        // const election = {
        //     "id": "43680f3e-97ac-4257-b27a-5f3b452da2e6",
        //     "name": "Parliamentary Election 2019",
        //     "moduleId": "455cd89e-269b-4b69-96ce-8d7c7bf44ac2",
        //     "electionTimeLine": [
        //         {
        //             "key": "nomination_start_date",
        //             "value": 1546713528
        //         },
        //         {
        //             "key": "objection_end_date",
        //             "value": 1550255928
        //         },
        //         {
        //             "key": "objection_start_date",
        //             "value": 1549046328
        //         },
        //         {
        //             "key": "nomination_end_date",
        //             "value": 1548873528
        //         }
        //     ]
        // };


        return (
            <div className={classes.root}>
                <CssBaseline />
                <Header title="Elections Commission of Sri Lanka"></Header>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <InfoBanner election={this.state.election}></InfoBanner>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Dashboard);

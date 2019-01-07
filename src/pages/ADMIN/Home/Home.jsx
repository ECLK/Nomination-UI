import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';
import InfoBanner from 'components/InfoBanner/InfoBanner';
import NominationPanel from 'components/NominationExpansionPanel/NominationList';
import Axios from 'axios';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';


const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width,
            flexShrink: 0,
        },
    },
    topBottomSpace: {
        marginBottom: 15
    }
});

class Home extends React.Component {

    state = {
        open: true,
        election_id: '43680f3e-97ac-4257-b27a-5f3b452da2e6',
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

    componentDidMount() {

        // get election details
        Axios.get(`${process.env.REACT_APP_API_DOMAIN}/ec-election/elections/${this.state.election_id}`)
            .then(res => {
                const election = res.data;
                this.setState({ election });
            });

    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka - Admin" ></MainMenu>

                <div className={classes.content}>
                  
                    <div className={classes.root}>
                        
                    </div>
                </div>


            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
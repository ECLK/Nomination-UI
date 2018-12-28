import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';
import InfoBanner from 'components/InfoBanner/InfoBanner';
import Axios from 'axios';


const drawerWidth = 240;

const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: drawerWidth,
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

    componentDidMount(){

        Axios.get(`${process.env.REACT_APP_API_DOMAIN}/ec-election/elections/${this.state.election_id}`)
        .then(res => {
            const election = res.data;
            this.setState({ election });
            // console.log(this.state);
        });
    }

    render() {
        const { classes } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                {/* all the content should go in this.. */}

                    <InfoBanner election={this.state.election}></InfoBanner>
                    
                </div>


            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
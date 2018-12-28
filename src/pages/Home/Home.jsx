import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';


const styles = () => ({});

class Home extends React.Component {
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

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Elections Commission of Sri Lanka" ></MainMenu>
                <Grid container spacing={24}>
                    <Grid item xs={12}>
                        <InfoBanner election={this.state.election}></InfoBanner>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Home);
import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from 'components/MainMenu/MainMenu';
import Axios from 'axios';
import CheckboxTable from 'components/CheckboxTable/CheckboxTable';


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

class AllowNomination extends React.Component {

    state = {
        open: true,
        rowHeaders: [],
        columnHeaders: [],
    };

    componentDidMount(){
        //
    }

    render() {
        const { classes } = this.props;

        let columnHeaders = ['Division-1', 'Division-2', 'Division-3', 'Division-4'];

        let rowHeaders = ['Party-1', 'Party-2', 'Party-3', 'Party-4'];

        let nomination_setup = [
            {
                'election_id':0,
                'team_id':'Party-2',
                'division_id':'Division-3'
            },
            {
                'election_id':0,
                'team_id':'Party-3',
                'division_id':'Division-3'
            },
            {
                'election_id':0,
                'team_id':'Party-4',
                'division_id':'Division-2'
            },
            {
                'election_id':0,
                'team_id':'Party-1',
                'division_id':'Division-1'
            },
        ]

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                    {/* all the content should go here.. */}

                    <CheckboxTable title="Allow Nominations" data={nomination_setup} cols={columnHeaders} rows={rowHeaders}></CheckboxTable>
                </div>


            </div>
        );
    }
}

AllowNomination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllowNomination);

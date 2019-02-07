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

        return (
            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                    {/* all the content should go here.. */}

                    <CheckboxTable title="Allow Nominations" cols={columnHeaders} rows={rowHeaders}></CheckboxTable>
                </div>


            </div>
        );
    }
}

AllowNomination.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(AllowNomination);

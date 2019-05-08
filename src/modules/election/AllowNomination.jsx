import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainMenu from '../../components/MainMenu/MainMenu';
import Axios from 'axios';
import CheckboxTable from '../../components/CheckboxTable/CheckboxTable';
import { Button, FormGroup, Paper, Card, CardContent, CardActionArea, CardActions } from '@material-ui/core';
import { connect } from 'react-redux';



const styles = theme => ({
    content: {
        [theme.breakpoints.up('sm')]: {
            paddingLeft: theme.drawer.width,
            flexShrink: 0,
            paddingLeft: theme.spacing.unit

        },
    },
    button: {
        marginRight: theme.spacing.unit,
        right: 0
    },
    buttons: {
        margin: theme.spacing.unit
    },
    topBottomSpace: {
        marginBottom: 15
    },
    
});

class AllowNomination extends React.Component {

    state = {
        open: true,
        rowHeaders: [],
        columnHeaders: [],
    };

  

    handleSubmit = (e) => {
        e.preventDefault()
    }


    render() {
        const { classes,electionData,values } = this.props;
debugger;
        let rowHeaders = [{
            id: '1111',
            name: 'United National Party (UNP)'
        }, {
            id: '2222',
            name: 'United Peoples Freedom Alliance (UPFA)'
        }, {
            id: '3333',
            name: 'Janatha Vimukthi Peramuna (JVP)'
        }, {
            id: '4444',
            name: 'Jana Setha Peramuna (JSP)'
        }];

        let nomination_setup = [
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-1',
                'division_id': '16ab500d-31b1-4176-bfa3-42e766e9d691'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-2',
                'division_id': '1a29913e-3bc4-4a48-a35e-88f8a874e623'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-3',
                'division_id': '21b9752f-8641-40c3-8205-39a612bf5244'
            },
            {
                'election_id': electionData.election_id,
                'team_id': 'Party-4',
                'division_id': '3ab3cf77-a468-41a8-821a-8aa6f38222ad'
            },
        ]


        return (

            <div className={classes.root}>
                <CssBaseline />
                <MainMenu title="Election Commission of Sri Lanka" ></MainMenu>

                <div className={classes.content}>
                    {/* <Card> */}
                        <CardContent>
                            {/* all the content should go here.. */}
                            <form ref="form" onSubmit={this.handleSubmit}>
                                <CheckboxTable title="Select Electorates" data={nomination_setup} cols={values.columnHeaders} rows={rowHeaders}></CheckboxTable>
                                {/* <div className={classes.buttons}>
                                    <Button variant="contained" type="small" color="primary" className={classes.button} color="primary">Cancel</Button>
                                    <Button variant="contained" type="submit" color="primary" className={classes.button} color="primary">Submit</Button>
                                </div> */}
                            </form>
                        </CardContent>
                    {/* </Card> */}
                </div>
            </div >
        );
    }
}

AllowNomination.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const electionData = Election.electionData;
    const CallElectionData = Election.CallElectionData;

    return {  electionData,CallElectionData }
  };
  
  
export default connect(mapStateToProps)(withStyles(styles)(AllowNomination));

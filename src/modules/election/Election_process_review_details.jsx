import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import { getAllElectionReviews } from "./state/ElectionAction.js";
import { connect } from 'react-redux';
import Typography from '@material-ui/core/Typography'
import { Link } from 'react-router-dom'
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';//--
import Grid from '@material-ui/core/Grid';
import CardContent from '@material-ui/core/CardContent';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import TextField from '@material-ui/core/TextField';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';

const drawerWidth = 240;



const styles = theme => ({
    root: {
        display: 'flex',
        margin: 20
    },

    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,
        width: 200,
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
        nominations: []
    };


    componentDidMount() {
        const { allElectionModules, getAllElectionReviews } = this.props;
        getAllElectionReviews();

        console.log(allElectionModules)
    }

    handleDrawerOpen = () => {
        this.setState({ open: true });
    };

    handleDrawerClose = () => {
        this.setState({ open: false });
    };

    render() {
        const { classes, allElectionModules } = this.props;

        return (
            <div className={classes.root}>
                <CssBaseline />
                <AdminMenu title="Election Commission of Sri Lanka"></AdminMenu>
                <div style={{ width: '100%' }}>
                    <Typography variant="h5" component="h2">
                        Election process review(Parlimenttary 2018 Election)
                </Typography>
                    <br />
                    <div className={classes.container}>

                        <Card className={classes.card}>
                            <CardContent>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography className={classes.text_a} component="p">
                                            Election Type: Parlimentary
                                          </Typography>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>
                                    <Grid item xs={6} sm={3}>
                                        <Typography className={classes.text_a} component="p">
                                            Authjority: Election Admin
                                          </Typography>

                                    </Grid>
                                </Grid>
                                <Grid container spacing={24}>

                                    <Grid item xs={12} sm={6}>
                                        <Typography className={classes.text_b} component="p">
                                            Calculation Type : Vote & Prerferntial Based
                                          </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">
                                                    Weightage(%):Vote Based</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Input id="common-name" value={25} />
                                            </Grid>
                                        </Grid>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">
                                                    Weightage(%):Preference Based</Typography>
                                            </Grid>
                                            <Grid item xs={12} sm={6}>
                                                <Input id="common-name" value={75} />
                                            </Grid>
                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={24}>

                                    <Grid item xs={12} sm={3}>
                                        <Typography className={classes.text_b} component="p">
                                            Nomincation Submission by
                                          </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography className={classes.text_b} component="p">

                                                    Party Secretary
                                                                                               </Typography>
                                            </Grid>

                                        </Grid>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={12}>
                                                <Typography className={classes.text_b} component="p">
                                                    Indipendant Group Leader
                                                   </Typography>
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>

                                <Grid container spacing={24}>

                                    <Grid item xs={12} sm={3}>
                                        <Typography className={classes.text_b} component="p">
                                            Deposit Payment
                                          </Typography>
                                    </Grid>
                                    <Grid item xs={12} sm={4}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">

                                                    Amount per nominee
                                                                                               </Typography>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <Input id="common-name" value={750.00} />
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                                <br />
                                <hr />
                                <br />
                                <Typography className={classes.text_a} component="p">

                                    <b>Timeline</b>
                                </Typography>
                                <br />
                                <Grid container spacing={24}>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">

                                                    Nomination Start Date
                                                                                               </Typography>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">

                                                    Objection Start Date
                                                                                               </Typography>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                                <Grid container spacing={24}>

                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">

                                                    Nomination Start Date
                                                                                               </Typography>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <Grid container spacing={24}>
                                            <Grid item xs={12} sm={6}>
                                                <Typography className={classes.text_b} component="p">

                                                    Objection Start Date
                                                                                               </Typography>
                                            </Grid>


                                            <Grid item xs={12} sm={6}>
                                                <TextField
                                                    id="date"
                                                    // label="Birthday"
                                                    type="date"
                                                    defaultValue="2017-05-24"
                                                    className={classes.textField}
                                                    InputLabelProps={{
                                                        shrink: true,
                                                    }}
                                                />
                                            </Grid>

                                        </Grid>
                                    </Grid>

                                </Grid>
                                <br />
                                <br />
                                <hr />
                                <br />
                                <Typography className={classes.text_a} component="p">

                                    <b>Eligibility</b>
                                </Typography>
                                <br />
                                <br />
                                <Grid container spacing={24}>

                                    <Table className={classes.candidates_table}>
                                        <TableHead>
                                            <TableCell align="left">Eligibility(List)</TableCell>

                                            <TableCell align="left">Select</TableCell>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow >
                                                <TableCell align="left">Minimum ae should be 35</TableCell>

                                                <TableCell align="left"><Checkbox
                                                    checked value={true} /></TableCell>
                                            </TableRow>

                                            <TableRow >
                                                <TableCell align="left">Another item</TableCell>

                                                <TableCell align="left"><Checkbox
                                                    value={true} /></TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>

                                </Grid>
                                <br />
                                <Grid container spacing={24}>
                                    <Grid item xs={4} sm={1}>
                                        <Link to="/election-process-review" >
                                            <Button size="medium">Back</Button>
                                        </Link>
                                    </Grid>
                                    <Grid item xs={4} sm={1}>

                                        <Button size="medium">Approve</Button>
                                    </Grid>
                                    <Grid item xs={4} sm={1}>


                                        <Button size="medium">Reject</Button>
                                    </Grid>


                                </Grid>
                            </CardContent>
                        </Card>

                    </div>
                </div>
            </div>
        );
    }
}

Dashboard.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({ Election }) => {
    const { allElectionModules } = Election;
    return { allElectionModules }
};

const mapActionsToProps = {
    getAllElectionReviews
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Dashboard));





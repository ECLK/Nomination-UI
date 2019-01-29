import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import {loadPayments, togglePayment} from './state/PaymentAction'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {connect} from 'react-redux'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails'
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary'
import MenuItem from '@material-ui/core/MenuItem';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DateRangeIcon from '@material-ui/icons/DateRange';
import PersonIcon from '@material-ui/icons/Person';
import MoneyIcon from '@material-ui/icons/AttachMoney';

const drawerWidth = 240;

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
    }
});

class PaymentReview extends React.Component {
    state = {
        open: true,
        expandedPanelIndex: -1,
        payments: []
    };


    componentDidMount() {
        const {loadPayments} = this.props;
        loadPayments();
    }

    togglePanel = panelIndex => (event, didExpand) => {
        this.setState({
            expandedPanelIndex: didExpand ? panelIndex : -1,
        });
    };

    handlePaymentToggle = paymentId => event => {
        const {togglePayment} = this.props;
        togglePayment(paymentId);
    };

    blockPropagation(event) {
        event.stopPropagation();
    };


    render() {
        const {classes, payments} = this.props;
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

        const menuItems = elections.map(election => (
            <MenuItem value={election.election_id}>{election.election_name}</MenuItem>));


        const paymentElements = payments.map((payment, i) => (
            <ExpansionPanel expanded={expandedPanelIndex === i} onChange={this.togglePanel(i)}>
                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon/>}>
                    <Typography className={classes.heading}>{payment.depositor}</Typography>


                    <FormControlLabel
                        control={
                            <Switch
                                checked={payment.payment_status === "paid"}
                                onChange={this.handlePaymentToggle(payment.payment_id)}
                                color="primary"
                            />
                        }
                        label="Received"
                        onClick={this.blockPropagation}
                    />

                    {/*<Typography className={classes.secondaryHeading}>I am an expansion panel</Typography>*/}
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <List component="nav">
                        <ListItem>
                            <ListItemIcon>
                                <PersonIcon/>
                            </ListItemIcon>
                            <ListItemText primary={payment.depositor} secondary="Depositor"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <MoneyIcon/>
                            </ListItemIcon>
                            <ListItemText primary={payment.deposit_amount} secondary="Deposited Amount"/>
                        </ListItem>
                        <ListItem>
                            <ListItemIcon>
                                <DateRangeIcon/>
                            </ListItemIcon>
                            <ListItemText primary={payment.deposit_date} secondary="Deposited Date"/>
                        </ListItem>
                    </List>
                </ExpansionPanelDetails>
            </ExpansionPanel>
        ));

        return (
            <div className={classes.root}>
                <CssBaseline/>
                <AdminMenu title="Elections Commission of Sri Lanka"></AdminMenu>
                <Typography variant="h5" component="h2">
                    Payment review
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
                        {paymentElements}
                    </div>


                    <br/>

                </div>


            </div>
        );
    }
}

PaymentReview.propTypes = {
    classes: PropTypes.object.isRequired,
};

const mapStateToProps = ({Payment}) => {
    const {payments} = Payment;
    return {payments};
};

const mapActionsToProps = {
    loadPayments,
    togglePayment
};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PaymentReview));





import React from 'react';
import PropTypes from 'prop-types';
import {withStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AdminMenu from 'components/AdminMenu/AdminMenu';
import Paper from '@material-ui/core/Paper';
import LinearProgress from '@material-ui/core/LinearProgress';
import {loadElectionsAndPayments, togglePayment} from './state/PaymentAction'
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
import {REQUEST_STATE} from "../../lib/request_redux_state";

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
        width: 250
    },
    container: {
        // padding: 10
    },
    loadingPanel: {
        height: 94,
        paddingTop: 28
    }
});

class PaymentReview extends React.Component {
    state = {
        open: true,
        expandedPanelIndex: -1,
        payments: []
    };


    componentDidMount() {
        const {loadElectionsAndPayments} = this.props;
        loadElectionsAndPayments();
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

    static blockPropagation(event) {
        event.stopPropagation();
    };


    render() {
        const {classes, payments, electionsLoading, elections, paymentState} = this.props;
        const {expandedPanelIndex} = this.state;

        // const elections = [{
        //     "election_id": "32d250c8-b6b0-4aa6-9b14-4817dbb268d9",
        //     "election_name": "2019 Parliamentary",
        // }, {
        //     "election_id": "a93b50c8-b6b0-4aa6-9b14-4817dbb268d9",
        //     "election_name": "2020 Provincial",
        // }];

        let selectedElection = this.state.selectedElection;
        if (!selectedElection) {
            selectedElection = elections.length > 0 && elections[0].election_id;
        }

        const menuItems = elections.map(election => (
            <MenuItem value={election.election_id}>{election.election_name}</MenuItem>));

        let paymentLoadingElement = null;
        paymentLoadingElement = (<div>
            {paymentState === REQUEST_STATE.LOADING ? <LinearProgress/> : <div style={{height: 4}}></div>}
            {payments.length === 0 &&
            <Paper className={classes.loadingPanel}/>}
        </div>);


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
                        onClick={PaymentReview.blockPropagation}
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

                    <form autoComplete="off">
                        <FormControl className={classes.dropDown}>
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
                            {electionsLoading ? <LinearProgress/> : <div style={{height: 4}}></div>}
                        </FormControl>
                    </form>

                    <br/>
                    <br/>

                    <div style={{width: '100%'}}>
                        {paymentLoadingElement}
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

const mapStateToProps = ({Payment, Election}) => {
    const {payments} = Payment;
    const {elections} = Election;
    const paymentState = Payment.requestState;
    const electionsLoading = Election.requestState === REQUEST_STATE.LOADING;
    return {payments, elections, paymentState, electionsLoading};
};

const mapActionsToProps = {
    togglePayment,
    loadElectionsAndPayments,

};

export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(PaymentReview));





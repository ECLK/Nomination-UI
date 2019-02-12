import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import axios from 'axios';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Button from '@material-ui/core/Button';
import { Link } from 'react-router-dom'


const styles = theme => ({
	root: {
		width: '100%',
	},
	heading: {
		fontSize: theme.typography.pxToRem(15),
		flexBasis: '33.33%',
		flexShrink: 0,
	},
	secondaryHeading: {
		fontSize: theme.typography.pxToRem(15),
		color: theme.palette.text.secondary,
	},
	list: {
		padding: 0,
	},
	button: {
		margin: theme.spacing.unit,
		width: '100%',
	}
	});

	class ControlledExpansionPanels extends React.Component {
		state = {
			expanded: null,
			division: [//TODO : remove this dummy array after demo period
				{
				code: "14",
				electionId: "43680f3e-97ac-4257-b27a-5f3b452da2e6",
				id: "1a29913e-3bc4-4a48-a35e-88f8a874e623",
				name: "Trincomalee",
				noOfCandidates: 7,
				nomination : [
						{
							id: "07d4d5d9-fd83-473f-836c-a5a565d75ed1",
							status: "DRAFT"
						}
				]					
			},
			{
				code: "1",
				electionId: "43680f3e-97ac-4257-b27a-5f3b452da2e6",
				id: "65fa860e-2928-4602-9b1e-2a7cb09ea83e",
				name: "Colombo",
				noOfCandidates: 22,
				nomination : [
					{
						id: "135183e2-a0ca-44a0-9577-0d2b16c3217f",
						status: "DRAFT"
					}
			]
			}
			],
			nominationId:'dummyId'
		};

		handleChange = panel => (event, expanded) => {
			this.setState({
				expanded: expanded ? panel : false,
			});
		};

		componentWillMount() {
			axios.get(`elections/${sessionStorage.getItem('election_id')}/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/divisions`)
				.then(res => {
					const division = res.data;
					console.log("division",res.data);
					this.setState({ division });
			});
	}

	redirectToTarget = (id) => {
		this.setState({ nominationId: id });
	}

	render() {
		const { classes } = this.props;
		const {props} = this;
		const { expanded } = this.state;
		return (
			<div className={classes.root}>
				{
					this.state.division.map((division, index) =>
						<ExpansionPanel key={index} expanded={expanded === 'panel' + division.code} onChange={this.handleChange('panel' + division.code)}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>{division.name}</Typography>
								<Typography className={classes.secondaryHeading}>[{division.code}]</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>

								{/* details in a list format */}
								<List>
									<ListItem className={classes.list} key={index}>
										<ListItemText primary="No of Candidates" />
										<Typography>{division.noOfCandidates}</Typography>
									</ListItem>
									{
										division.nomination.map((nomination, index) =>
											<ListItem className={classes.list} key={index}>
												<ListItemText primary="Status" />
												<Typography>{nomination.status}</Typography>
												<div>
												{

										division.nomination.length < 1 &&
										<Button variant="contained" color="primary" onClick={() => this.redirectToTarget(nomination.id)} className={classes.button} >Create</Button>
									}
									{
										division.nomination.length > 0 &&
										<Link style={{ textDecoration: 'none' }} to={{ pathname: "nomination", state: { id: nomination.id,status: nomination.status }}}  >
										<Button variant="contained" color="primary"  className={classes.button} >{nomination.status === 'SUBMIT' ? 'VIEW' : 'EDIT'}</Button>
										</Link>
									}
									</div>
											</ListItem>
										)
									}
									
								</List>
								
							</ExpansionPanelDetails>
						</ExpansionPanel>
					)
				}
			</div>
		);
	}
};

ControlledExpansionPanels.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ControlledExpansionPanels);

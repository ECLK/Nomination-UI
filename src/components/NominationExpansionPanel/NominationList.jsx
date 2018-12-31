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
	}
});

class ControlledExpansionPanels extends React.Component {
	state = {
		expanded: null,
		division: [],
	};

	handleChange = panel => (event, expanded) => {
		this.setState({
			expanded: expanded ? panel : false,
		});
	};

	componentWillMount() {
		axios.get(`http://localhost:9001/ec-election/elections/43680f3e-97ac-4257-b27a-5f3b452da2e6/teams/5eedb70e-a4da-48e0-b971-e06cd19ecc70/nominations`)
			.then(res => {
				const division = res.data;
				this.setState({ division });
				// console.log(this.state.division);
			});
	}

	render() {
		const { classes } = this.props;
		const { expanded } = this.state;

		return (
			<div className={classes.root}>
				{
					this.state.division.map((division) =>
						<ExpansionPanel key={division.id} expanded={expanded === 'panel' + division.code} onChange={this.handleChange('panel' + division.code)}>
							<ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
								<Typography className={classes.heading}>{division.name}</Typography>
								<Typography className={classes.secondaryHeading}>[{division.code}]</Typography>
							</ExpansionPanelSummary>
							<ExpansionPanelDetails>
								<List>
									<ListItem className={classes.list} key={division.id}>
										<ListItemText primary="No of Candidates" />
										<Typography>{division.noOfCandidates}</Typography>
									</ListItem>
									{
										division.nomination.map((nomination) =>
											<ListItem className={classes.list} key={division.id}>
												<ListItemText primary="Status" />
												<Typography>{nomination.status}</Typography>
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
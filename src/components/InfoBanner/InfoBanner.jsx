import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Timestamp from 'react-timestamp';

const styles = theme => ({
	root: {
		...theme.mixins.gutters(),
		paddingTop: theme.spacing.unit * 2,
		paddingBottom: theme.spacing.unit * 2,
	},
});

class InfoBanner extends React.Component {

	constructor(props){
		super(props);
	}

	render() {
		const { classes } = this.props;

		return (
			<div>
				<Paper className={classes.root} elevation={1}>
					<Typography component="h2" variant="headline" gutterBottom>
						{this.props.election.name}
					</Typography>
					<Typography variant="subheading" gutterBottom>
						<b>Nomination Start Date:</b> <Timestamp time={this.props.election.electionTimeLine[0].value} format='full' /> --- <b>Nomination End Date:</b> <Timestamp time={this.props.election.electionTimeLine[0].value} format='full' />
					</Typography>
				</Paper>
			</div>
		);
	}
}

InfoBanner.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoBanner);
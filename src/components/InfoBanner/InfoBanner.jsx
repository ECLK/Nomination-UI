import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import moment from 'moment';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit * 2,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
});

class InfoBanner extends React.Component {

	render() {
		const { classes ,election } = this.props;
		
		var nominationStart = moment(this.props.election.nominationStart).format("DD MMM YYYY hh:mm a") //parse integer
		var nominationEnd = moment(this.props.election.nominationEnd).format("DD MMM YYYY hh:mm a") //parse integer


		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography component="h2" variant="h5" gutterBottom>
							{election.name}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Nomination Start Date:</b> {nominationStart}  --- <b>Nomination End Date:</b> {nominationEnd}
						</Typography>
					</Paper>
				</Grid>
				</Grid>
			</div>
		);
	}
}

InfoBanner.propTypes = {
	classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(InfoBanner);

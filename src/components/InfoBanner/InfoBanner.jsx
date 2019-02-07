import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Timestamp from 'react-timestamp';

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
		const { classes } = this.props;
		console.log(this.props);

		return (
			<div className={classes.root}>
				<Grid container spacing={24}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Typography component="h2" variant="h5" gutterBottom>
							{this.props.election.name}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Nomination Start Date:</b> <Timestamp time={this.props.election.electionTimeLine[0].value} format='full' /> --- <b>Nomination End Date:</b> <Timestamp time={this.props.election.electionTimeLine[3].value} format='full' />
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

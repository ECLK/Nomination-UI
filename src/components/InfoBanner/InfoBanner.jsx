import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Chip from '@material-ui/core/Chip';
import moment from 'moment';


const styles = theme => ({
	root: {
		flexGrow: 1,
	},
	paper: {
		padding: theme.spacing.unit ,
		textAlign: 'center',
		color: theme.palette.text.secondary,
	},
	chip: {
		margin: theme.spacing.unit,
		padding: theme.spacing.unit  * 2,
	  },
});

class InfoBanner extends React.Component {

	render() {
		const { classes ,election,division } = this.props;
		
		var nominationStart = moment(this.props.election.nominationStart).format("DD MMM YYYY hh:mm a") //parse integer
		var nominationEnd = moment(this.props.election.nominationEnd).format("DD MMM YYYY hh:mm a") //parse integer

		var objectionStart = moment(this.props.election.objectionStart).format("DD MMM YYYY hh:mm a") //parse integer
		var objectionEnd = moment(this.props.election.objectionEnd).format("DD MMM YYYY hh:mm a") //parse integer


		return (
			<div className={classes.root}>
				<Grid style={{marginBottom:-35}} container spacing={12}>
				<Grid item xs={12}>
					<Paper className={classes.paper}>
						<Chip
							// icon={<FaceIcon />}
							label={election.name}
							clickable
							className={classes.chip}
							color="secondary"
							style={{fontSize:25}}
							// onDelete={handleDelete}
							// deleteIcon={<DoneIcon />}
						/>
						{/* <Typography component="h2" variant="h5" gutterBottom>
							{election.name}
						</Typography> */}
						<Typography variant="subtitle1" gutterBottom>
							<b>Nomination Start Date:</b> {nominationStart}  --- <b>Nomination End Date:</b> {nominationEnd}
						</Typography>
						<Typography variant="subtitle1" gutterBottom>
							<b>Objection Start Date:</b> {objectionStart}  --- <b>Objection End Date:</b> {objectionEnd}
						</Typography>
						{(division)   ?
						<Typography  variant="subheading" gutterBottom style={{marginBottom:25,marginLeft:5}}>
							{division+" Division"}
						</Typography>  : ''
						}
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

import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';


const styles = {
    card: {
        width: 300,
        margin: 20,
        cursor: 'pointer'
    },

    container: {
        // backgroundColor: "red",
    },

    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    text_a: {
        fontSize: 14,
        textAlign: 'left'
    },
    text_b: {
        fontSize: 14,
        textAlign: 'center'
    },

    pos: {
        marginBottom: 12,
    },
    paper: {
        textAlign: 'center',
    },

};

function SimpleCard(props) {
    const { classes } = props;
    const bull = <span className={classes.bullet}>•</span>;

    return (
        <Card className={classes.card} md={3} xs={6} sm={3}>
            <CardContent >
                <Grid className={classes.container} container spacing={24}>
                    <Grid item >
                        <Typography className={classes.text_a} component="p">
                            <b>Parliament 208 Election</b>
                        </Typography>
                        <br />
                        <Typography className={classes.text_a} component="p">
                            No of Divisions : 15
                        </Typography>

                        <Typography className={classes.text_a} component="p">
                            No of Teams : 07
                            <Button size="small">View</Button>
                        </Typography>
                    </Grid>

                </Grid>

            </CardContent>
        </Card>
    );
}

SimpleCard.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SimpleCard);

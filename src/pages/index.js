import React from 'react';
import PropTypes from 'prop-types';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import withRoot from 'withRoot';
import Loadable from 'react-loadable';
import Progress from 'components/Progress/Progress';
import Login from 'pages/Login/Login';

const styles = theme => ({
  root: {
    //textAlign: 'center',
    paddingTop: theme.spacing.unit * 10,
  }
});

const LoadableProtectedApp = Loadable({
    loader: () =>
        import(
            '../app/ProtectedApp'),
    loading: Progress,
});

class Index extends React.Component {
  state = {
    open: false,
  };

  constructor(props) {
      super(props);
      this.state = {
          user: {},
      };
  };


  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <div className={classes.root}>
          <Router basename='/election'>
              <Switch>
                  {<Route path='/login' render={props => <Login {...props} updateUser={this.updateUser} />} />}
                  <Route path='/logout' />
                  {!user && <Redirect to={{ pathname: '/login'}} />}
                  <Route render={() => <LoadableProtectedApp user={user} />} />
              </Switch>
          </Router>
      </div>
    );
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withRoot(withStyles(styles)(Index));

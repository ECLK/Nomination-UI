import React, { Suspense, lazy } from "react";
import { Provider } from "react-redux";
import PropTypes from "prop-types";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import withRoot from "withRoot";
//import Loadable from 'react-loadable';

import store from "state/store";
import AuthRoute from "modules/auth/AuthRoute";

import Progress from "components/common/Progress";
import Login from "pages/Login/Login";

const styles = theme => ({
  root: {
    //textAlign: 'center',
    paddingTop: theme.spacing.unit * 10
  }
});

const Home = () => <p>Home yy</p>;

class App extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <Provider store={store}>
        <Router>
          <div className={classes.root}>
            <Switch>
              <AuthRoute exact path="/" component={Home} access="private" />
            </Switch>
          </div>
        </Router>
      </Provider>
    );
  }
}

const LoadableProtectedApp = lazy(() => import("./ProtectedApp"));

class Appx extends React.Component {
  state = {
    open: false
  };

  constructor(props) {
    super(props);
    this.state = {
      user: {}
    };
  }

  render() {
    const { classes } = this.props;
    const { user } = this.state;

    return (
      <div className={classes.root}>
        <Suspense fallback={Progress}>
          <Router basename="/election">
            <Switch>
              {
                <Route
                  path="/login"
                  render={props => (
                    <Login {...props} updateUser={this.updateUser} />
                  )}
                />
              }
              <Route path="/logout" />
              {!user && <Redirect to={{ pathname: "/login" }} />}
              <Route render={() => <LoadableProtectedApp user={user} />} />
            </Switch>
          </Router>
        </Suspense>
      </div>
    );
  }
}

App.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withRoot(withStyles(styles)(App));

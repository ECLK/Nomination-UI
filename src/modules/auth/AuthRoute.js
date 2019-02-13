import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";

import Login from "./Login/";

const accessLevels = {
  private: {
    authorize: user => !!user
  },
  public: {
    authorize: user => !user
  }
};

class AuthRoute extends PureComponent {
  renderComponent(routeProps) {
    const { component: Component, render, user, access } = this.props;
    const accessLevel = accessLevels[access];

    if (!accessLevel || accessLevel.authorize(user)) {
      if (Component) {
        return <Component {...routeProps} />;
      }
      if (render) {
        return render(routeProps);
      }
      return null;
    }

    return <Login />;
  }

  render() {
    const { component, render, user, access, ...rest } = this.props;
    return <Route {...rest} render={props => this.renderComponent(props)} />;
  }
}

AuthRoute.propTypes = {
  component: PropTypes.func,
  render: PropTypes.func,
  location: PropTypes.shape({ search: PropTypes.string }),
  user: PropTypes.shape({ email: PropTypes.string }),
  access: PropTypes.string.isRequired
};

AuthRoute.defaultProps = {
  component: null,
  render: null,
  location: null,
  user: null
};

function mapStateToProps(state) {
  return {
    user: null
  };
}

export default withRouter(connect(mapStateToProps)(AuthRoute));

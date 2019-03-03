import React from "react";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
// import { Redirect } from "react-router-dom";

export default function loggedIn(WrappedComponent) {
  class LoggedIn extends React.Component {
    static contextTypes = {
      auth: PropTypes.object
    };
    render() {
      const { auth } = this.context;

      const isAuthenticated = auth.isAuthenticated();

      if (!isAuthenticated) {
        auth.login();
      }

      return auth.isAuthenticated() ? (
        <WrappedComponent {...this.props} />
      ) : (
        <div>
          <h2>You are being redirected to the log in page</h2>
          <CircularProgress />
        </div>
      );
    }
  }

  LoggedIn.propTypes = {
    classes: PropTypes.object.isRequired
  };
  LoggedIn.displayName = `LoggedIn(${getDisplayName(WrappedComponent)})`;
  return LoggedIn;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

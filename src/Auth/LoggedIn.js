import React from "react";
import PropTypes from "prop-types";
// import { Redirect } from "react-router-dom";

export default function loggedIn(WrappedComponent) {
  class LoggedIn extends React.Component {
    static contextTypes = {
      auth: PropTypes.object
    };
    render() {
      const { auth } = this.context;

      if (!auth.isAuthenticated()) {
        console.log("Not authenticated");
        auth.login();
      }

      return <WrappedComponent {...this.props} />;
    }
  }

  LoggedIn.displayName = `LoggedIn(${getDisplayName(WrappedComponent)})`;
  return LoggedIn;
}

function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || "Component";
}

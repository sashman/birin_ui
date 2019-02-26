import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import PropTypes from "prop-types";
import CircularProgress from "@material-ui/core/CircularProgress";
const styles = theme => ({
  progress: {
    margin: theme.spacing.unit * 2
  }
});

class Callback extends Component {
  state = { loginSuccess: false, loginAttepmted: false };

  handleAuthentication = (auth, location) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication(() => {
        console.log("Logged in!", auth.isAuthenticated());
        console.log("Auth token", auth.getAccessToken());
        this.setState({ loginSuccess: true, loginAttepmted: true });
      });
    }
  };

  render() {
    const { classes, auth, location } = this.props;
    console.log("Callback", auth);
    console.log(this.state);

    if (!this.state.loginSuccess) {
      this.handleAuthentication(auth, location);
    }

    return this.state.loginSuccess ? (
      <Redirect to={"/"} />
    ) : (
      <div>
        <CircularProgress className={classes.progress} />
      </div>
    );
  }
}

Callback.propTypes = {
  classes: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired
};

export default withStyles(styles)(Callback);

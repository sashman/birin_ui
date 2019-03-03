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

  static contextTypes = {
    auth: PropTypes.object
  };

  handleAuthentication = (auth, location) => {
    if (/access_token|id_token|error/.test(location.hash)) {
      auth.handleAuthentication(() => {
        this.setState({ loginSuccess: true, loginAttepmted: true });
      });
    }
  };

  render() {
    const { classes, location } = this.props;
    const { auth } = this.context;

    if (!this.state.loginSuccess) {
      if (/access_token|id_token|error/.test(location.hash)) {
        auth
          .handleAuthentication()
          .then(() => {
            this.setState({ loginSuccess: true, loginAttepmted: true });
          })
          .catch(err => console.error(err));
      }
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

import React from "react";
import PropTypes from "prop-types";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

class LogoutButton extends React.Component {
  state = { loggedIn: true };
  handleLogout = () => {
    this.context.auth.logout();
  };

  static contextTypes = {
    auth: PropTypes.object
  };

  render() {
    const { classes } = this.props;

    return (
      <Button
        color={"white"}
        className={classes.buttonLink}
        onClick={this.handleLogout}
      >
        <p className={classes.linkText}>Log Out</p>
      </Button>
    );
  }
}

LogoutButton.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(headerLinksStyle)(LogoutButton);

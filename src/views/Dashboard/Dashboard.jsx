import React from "react";
// @material-ui/core
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import MyRingCountCard from "./MyRingCountCard.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    return (
      <div>
        <GridContainer>
          <GridItem xs={3} sm={3} md={3}>
            <MyRingCountCard />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);

import React from "react";
// @material-ui/core
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";

// @material-ui/icons
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";

import MyRingCountCard from "./MyRingCountCard.jsx";
import RingTypesCountChart from "./RingTypesCountChart";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import LoggedIn from "../../Auth/LoggedIn";

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
          <GridItem xs={12} sm={3} md={3}>
            <MyRingCountCard />
          </GridItem>
          <GridItem xs={12} sm={9} md={9}>
            <RingTypesCountChart />
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(LoggedIn(Dashboard));

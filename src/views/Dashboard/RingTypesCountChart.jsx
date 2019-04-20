import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";

import ChartistGraph from "react-chartist";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

import { numberFormat } from "../../util/number";

const delays2 = 80,
  durations2 = 500;

class RingTypesCountChart extends React.Component {
  state = {
    value: 0,
    showUnallocated: true,
    showAllocated: true
  };

  handleChange(toggleName) {
    return () =>
      this.setState({
        [toggleName]: !this.state[toggleName]
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <Card chart>
        <Query
          query={gql`
            query RingTypes {
              ring_types {
                type
                total
                allocated
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;
            const { showUnallocated, showAllocated } = this.state;

            const { ring_types } = data;
            const ringTypes = ring_types.sort(this.sortType);

            const labels = ringTypes.map(({ type }) => type);
            const allocated = ringTypes.map(({ allocated }) => allocated);
            const unallocated = ringTypes.map(
              ({ total, allocated }) => total - allocated
            );

            const series = [];
            if (showAllocated) {
              series.push(allocated);
            }

            if (showUnallocated) {
              series.push(unallocated);
            }

            const max = Math.max(...series.flat());
            const chartData = {
              labels,
              series
            };

            const options = {
              stackBars: true,
              axisX: {
                showGrid: false
              },
              axisY: {
                labelInterpolationFnc: numberFormat
              },
              low: 0,
              high: max,
              chartPadding: {
                top: 0,
                right: 5,
                bottom: 0,
                left: 12
              }
            };
            const responsiveOptions = [
              [
                "screen and (max-width: 640px)",
                {
                  seriesBarDistance: 5,
                  axisX: {
                    labelInterpolationFnc: function(value) {
                      return value[0];
                    }
                  }
                }
              ]
            ];
            const animation = {
              draw: function(data) {
                if (data.type === "bar") {
                  data.element.animate({
                    opacity: {
                      begin: (data.index + 1) * delays2,
                      dur: durations2,
                      from: 0,
                      to: 1,
                      easing: "ease"
                    }
                  });
                }
              }
            };
            return (
              <div>
                <CardHeader color="success">
                  <ChartistGraph
                    className="ct-chart"
                    data={chartData}
                    type="Bar"
                    options={options}
                    responsiveOptions={responsiveOptions}
                    listener={animation}
                  />
                </CardHeader>
                <CardBody>
                  <h4 className={classes.cardTitle}>Ring types</h4>
                  <p className={classes.cardCategory}>
                    Number of rings per type
                    <FormGroup row>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.showAllocated}
                            onChange={this.handleChange("showAllocated")}
                            value="allocated"
                          />
                        }
                        label="Allocated"
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.showUnallocated}
                            onChange={this.handleChange("showUnallocated")}
                            value="unallocated"
                          />
                        }
                        label="Unallocated"
                      />
                    </FormGroup>
                  </p>
                </CardBody>
              </div>
            );
          }}
        </Query>
      </Card>
    );
  }

  sortType = (a, b) => {
    var typeA = a.type.toUpperCase();
    var typeB = b.type.toUpperCase();
    if (typeA < typeB) {
      return -1;
    }
    if (typeA > typeB) {
      return 1;
    }
    return 0;
  };
}

RingTypesCountChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(RingTypesCountChart);

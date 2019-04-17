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

import ChartistGraph from "react-chartist";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

const delays2 = 80,
  durations2 = 500;

class RingTypesCountChart extends React.Component {
  state = {
    value: 0
  };
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
              }
            }
          `}
        >
          {({ loading, error, data }) => {
            if (loading) return <p>Loading...</p>;
            if (error) return <p>Error :(</p>;

            const { ring_types: ringTypesUnsorted } = data;
            const ringTypes = ringTypesUnsorted.sort((a, b) => {
              var typeA = a.type.toUpperCase();
              var typeB = b.type.toUpperCase();
              if (typeA < typeB) {
                return -1;
              }
              if (typeA > typeB) {
                return 1;
              }

              return 0;
            });

            const labels = ringTypes.map(({ type }) => type);
            const series = [ringTypes.map(({ total }) => total)];
            const max = Math.max(...series[0]);
            const chartData = {
              labels,
              series
            };

            const options = {
              axisX: {
                showGrid: false
              },
              axisY: {
                labelInterpolationFnc: function(value) {
                  if (!value) {
                    return 0;
                  }

                  if (value > 999999) {
                    return `${(value / 1000000).toFixed(1)}m`;
                  }

                  if (value > 999) {
                    return `${(value / 1000).toFixed(1)}k`;
                  }

                  return value.toFixed(2);
                }
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
                  </p>
                </CardBody>
              </div>
            );
          }}
        </Query>
      </Card>
    );
  }
}

RingTypesCountChart.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(RingTypesCountChart);

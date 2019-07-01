import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

moment.locale("en-gb");

const styles = {
  cardCategoryWhite: {
    "&,& a,& a:hover,& a:focus": {
      color: "rgba(255,255,255,.62)",
      margin: "0",
      fontSize: "14px",
      marginTop: "0",
      marginBottom: "0"
    },
    "& a,& a:hover,& a:focus": {
      color: "#FFFFFF"
    }
  }
};

class UserRingSeries extends React.Component {
  state = {
    selectedIndex: null
  };

  render() {
    const { id, type } = this.props;

    const RingSeriesItem = ({
      type,
      size,
      start_number,
      end_number,
      allocated_at
    }) => (
      <ListItem>
        <ListItemText primary={<strong>{type}</strong>} secondary={total} />
      </ListItem>
    );

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Query
            query={gql`
              query User($id: ID!, $type: String) {
                user(id: $id) {
                  ring_series(type: $type) {
                    type
                    size
                    start_number
                    end_number
                    allocated_at
                  }
                }
              }
            `}
            variables={{ id, type }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              const { ring_series } = data.user;

              return (
                <div>
                  <Card>
                    <CardHeader>
                      <h3>Allocated types</h3>
                    </CardHeader>
                    <CardBody>
                      <List>
                        {ring_series.data
                          .sort(
                            (a, b) =>
                              new Date(b.allocated_at) -
                              new Date(a.allocated_at)
                          )
                          .map((ring_series_item) => (
                            <RingSeriesItem
                              ...ring_series_item
                            />
                          ))}
                      </List>
                    </CardBody>
                  </Card>
                </div>
              );
            }}
          </Query>
        </GridItem>
      </GridContainer>
    );
  }
}

UserRingSeries.propTypes = {
  classes: PropTypes.object.isRequired,
  id: PropTypes.object.isRequired,
  type: PropTypes.object.isRequired
};

export default withStyles(styles)(UserRingSeries);

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
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none",
    "& small": {
      color: "#777",
      fontSize: "65%",
      fontWeight: "400",
      lineHeight: "1"
    }
  }
};

class UsersStats extends React.Component {
  render() {
    const {
      classes,
      match: {
        params: { id }
      }
    } = this.props;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>User Statistics</h4>
            </CardHeader>
            <CardBody>
              <Query
                query={gql`
                  query User($id: ID!) {
                    user(id: $id) {
                      email
                      name
                      initials
                      license_number
                      ring_types {
                        data {
                          type
                          total
                        }
                        total
                      }
                    }
                  }
                `}
                variables={{ id }}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  const { user } = data;
                  const { ring_types } = user;

                  return (
                    <div>
                      <h1>{user.name}</h1>
                      <div>
                        <strong>Email:</strong> {user.email}
                      </div>
                      <div>
                        <strong>Initials:</strong> {user.initials}
                      </div>
                      <div>
                        <strong>License number:</strong> {user.license_number}
                      </div>
                      <div>
                        <strong>Total rings:</strong> {ring_types.total}
                      </div>

                      <List component="nav" aria-label="Main mailbox folders">
                        {ring_types.data
                          .sort((a, b) => (a.type > b.type ? 1 : -1))
                          .map(({ type, total }) => (
                            <ListItem key={type}>
                              <ListItemText
                                primary={<strong>{type}</strong>}
                                secondary={total}
                              />
                            </ListItem>
                          ))}
                      </List>
                    </div>
                  );
                }}
              </Query>
            </CardBody>
          </Card>
        </GridItem>
      </GridContainer>
    );
  }
}

UsersStats.propTypes = {
  classes: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withStyles(styles)(UsersStats);

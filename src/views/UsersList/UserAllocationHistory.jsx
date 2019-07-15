import React from "react";
import PropTypes from "prop-types";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
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

class UserAllocationHistory extends React.Component {
  render() {
    const { classes, user_id, ring_type } = this.props;

    return (
      <Card>
        <CardHeader color="info">
          <h5 className={classes.cardTitleWhite}>Allocation History</h5>
        </CardHeader>
        <CardBody>
          <Query
            query={gql`
              query User($id: ID!, $ring_type: String!) {
                user(id: $id) {
                  ring_series(type: $ring_type) {
                    size
                    start_number
                    end_number
                    allocated_at
                  }
                }
              }
            `}
            variables={{ id: user_id, ring_type }}
          >
            {({ loading, error, data }) => {
              if (loading) return <p>Loading...</p>;
              if (error) return <p>Error :(</p>;

              const { user } = data;
              const { ring_series } = user;

              return (
                <List>
                  {ring_series
                    .sort((a, b) => (a.allocated_at > b.allocated_at ? 1 : -1))
                    .map(({ size, start_number, end_number, allocated_at }) => (
                      <ListItem key={`${start_number}-${end_number}`}>
                        <ListItemText
                          primary={
                            <strong>
                              {start_number}-{end_number} ({size})
                            </strong>
                          }
                          secondary={moment(allocated_at).format("L")}
                        />
                      </ListItem>
                    ))}
                </List>
              );
            }}
          </Query>
        </CardBody>
      </Card>
    );
  }
}

UserAllocationHistory.propTypes = {
  classes: PropTypes.object.isRequired,
  user_id: PropTypes.object.isRequired,
  ring_type: PropTypes.object.isRequired
};

export default withStyles(styles)(UserAllocationHistory);

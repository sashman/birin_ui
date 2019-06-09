import React from "react";
import { Query } from "react-apollo";
import gql from "graphql-tag";
import moment from "moment";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Table from "components/Table/Table.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import TablePagination from "@material-ui/core/TablePagination";

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

class RingSeriesList extends React.Component {
  state = {
    page: 0,
    rowsPerPage: 10
  };

  handleChangePage = (event, page) => {
    this.setState({ page });
  };

  handleChangeRowsPerPage = event => {
    this.setState({ rowsPerPage: event.target.value });
  };

  render() {
    const { classes } = this.props;
    const { page, rowsPerPage } = this.state;

    return (
      <GridContainer>
        <GridItem xs={12} sm={12} md={12}>
          <Card>
            <CardHeader color="info">
              <h4 className={classes.cardTitleWhite}>Ring Series</h4>
            </CardHeader>
            <CardBody>
              <Query
                query={gql`
                  {
                    ring_series {
                      type
                      size
                      start_number
                      end_number
                      allocated_at
                    }
                  }
                `}
              >
                {({ loading, error, data }) => {
                  if (loading) return <p>Loading...</p>;
                  if (error) return <p>Error :(</p>;

                  const ringSeries = data.ring_series.map(
                    ({
                      type,
                      size,
                      start_number,
                      end_number,
                      allocated_at
                    }) => [
                      type,
                      `${start_number} - ${end_number}`,
                      size,
                      allocated_at ? moment(allocated_at).format("L") : ""
                    ]
                  );
                  const paginatedRingSeries = ringSeries.slice(
                    page * rowsPerPage,
                    page * rowsPerPage + rowsPerPage
                  );

                  return (
                    <div>
                      <Table
                        tableHeaderColor="info"
                        tableHead={["Type", "Number", "Size", "Allocated Date"]}
                        tableData={paginatedRingSeries}
                      />
                      <TablePagination
                        component="div"
                        count={ringSeries.length}
                        rowsPerPage={rowsPerPage}
                        page={page}
                        backIconButtonProps={{
                          "aria-label": "Previous Page"
                        }}
                        nextIconButtonProps={{
                          "aria-label": "Next Page"
                        }}
                        onChangePage={this.handleChangePage}
                        onChangeRowsPerPage={this.handleChangeRowsPerPage}
                      />
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

export default withStyles(styles)(RingSeriesList);

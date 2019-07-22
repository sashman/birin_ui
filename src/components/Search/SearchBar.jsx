import React from "react";
import classNames from "classnames";
import { ApolloConsumer } from "react-apollo";
import gql from "graphql-tag";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Search from "@material-ui/icons/Search";
// core components
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Poppers from "@material-ui/core/Popper";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-dashboard-react/components/headerLinksStyle.jsx";

const SEARCH_BY_NUMBER = gql`
  query RingNumber($number: String!) {
    ring_number(number: $number) {
      type
      ring_series {
        start_number
        end_number
        allocated_at
        user {
          name
        }
      }
    }
  }
`;

class SearchBar extends React.Component {
  state = {
    open: false,
    search: null
  };
  handleToggle = client => async () => {
    if (!this.state.search) {
      return;
    }

    const number = this.state.search;

    try {
      const result = await client.query({
        query: SEARCH_BY_NUMBER,
        variables: { number }
      });

      const {
        data: { ring_number }
      } = result;

      this.setState({ searchResult: ring_number });
    } catch (error) {
      console.error(error);
      this.setState({ searchResult: null });
    }

    this.setState(state => ({ open: !state.open }));
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { classes } = this.props;
    const { open, searchResult } = this.state;
    return (
      <ApolloConsumer>
        {client => (
          <div className={classes.searchWrapper}>
            <CustomInput
              formControlProps={{
                className: classes.margin + " " + classes.search
              }}
              inputProps={{
                placeholder: "Search",
                inputProps: {
                  "aria-label": "Search"
                },
                onChange: event => this.setState({ search: event.target.value })
              }}
              buttonRef={node => {
                this.anchorEl = node;
              }}
            />
            <Button
              color="white"
              aria-label="edit"
              justIcon
              round
              onClick={this.handleToggle(client)}
            >
              <Search />
            </Button>
            <Poppers
              open={open && !!searchResult}
              anchorEl={this.anchorEl}
              transition
              disablePortal
              className={
                classNames({ [classes.popperClose]: !open }) +
                " " +
                classes.pooperNav
              }
            >
              {({ TransitionProps, placement }) => (
                <Grow
                  {...TransitionProps}
                  id="menu-list-grow"
                  style={{
                    transformOrigin:
                      placement === "bottom" ? "center top" : "center bottom"
                  }}
                >
                  <Paper>
                    <ClickAwayListener onClickAway={this.handleClose}>
                      <MenuList role="menu">
                        <MenuItem
                          onClick={this.handleClose}
                          className={classes.dropdownItem}
                        >
                          <strong>{searchResult.type}</strong>{" "}
                          {searchResult.ring_series.start_number}-
                          {searchResult.ring_series.end_number}{" "}
                          {searchResult.ring_series.user
                            ? searchResult.ring_series.user.name
                            : null}
                        </MenuItem>
                      </MenuList>
                    </ClickAwayListener>
                  </Paper>
                </Grow>
              )}
            </Poppers>
          </div>
        )}
      </ApolloConsumer>
    );
  }
}

export default withStyles(headerLinksStyle)(SearchBar);

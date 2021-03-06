import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import gql from "graphql-tag";
import { Mutation } from "react-apollo";

import LoggedIn from "../../Auth/LoggedIn";

import avatar from "assets/img/faces/marc.jpg";

const styles = {
  cardCategoryWhite: {
    color: "rgba(255,255,255,.62)",
    margin: "0",
    fontSize: "14px",
    marginTop: "0",
    marginBottom: "0"
  },
  cardTitleWhite: {
    color: "#FFFFFF",
    marginTop: "0px",
    minHeight: "auto",
    fontWeight: "300",
    fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
    marginBottom: "3px",
    textDecoration: "none"
  }
};

const CREATE_USER = gql`
  mutation CreateUser($data: UserInput!) {
    createUser(data: $data) {
      auth_id
    }
  }
`;

class UserProfile extends React.Component {
  state = { userInfo: {} };
  static contextTypes = {
    auth: PropTypes.object
  };

  handleUpdateProfile = createUser => () => {
    const { license_number, email, name, sub } = this.state.userInfo;
    createUser({
      variables: {
        data: {
          license_number,
          email,
          name,
          auth_id: sub
        }
      }
    });
  };

  handleChange = name => event => {
    this.setState({
      userInfo: {
        ...this.state.userInfo,
        [name]: event.target.value
      }
    });
  };

  render() {
    const { classes } = this.props;
    const { auth } = this.context;
    const { userInfo } = this.state;

    if (_.isEmpty(userInfo)) {
      auth.getUserInfo().then(userInfo => this.setState({ userInfo }));
    }

    return (
      <Mutation mutation={CREATE_USER}>
        {(createUser, { _data }) => (
          <div>
            <GridContainer>
              <GridItem xs={12} sm={12} md={8}>
                <Card>
                  <CardHeader color="primary">
                    <h4 className={classes.cardTitleWhite}>Edit Profile</h4>
                    <p className={classes.cardCategoryWhite}>
                      Complete your profile
                    </p>
                  </CardHeader>
                  <CardBody>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={3}>
                        <CustomInput
                          labelText="License number"
                          id="license_number"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: userInfo.license_number || "",
                            onChange: this.handleChange("license_number")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="First Name"
                          id="first-name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: userInfo.given_name || "",
                            onChange: this.handleChange("given_name")
                          }}
                        />
                      </GridItem>
                      <GridItem xs={12} sm={12} md={6}>
                        <CustomInput
                          labelText="Last Name"
                          id="last-name"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            value: userInfo.family_name || "",
                            onChange: this.handleChange("family_name")
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                    <GridContainer>
                      <GridItem xs={12} sm={12} md={12}>
                        <InputLabel style={{ color: "#AAAAAA" }}>
                          About me
                        </InputLabel>
                        <CustomInput
                          id="about-me"
                          formControlProps={{
                            fullWidth: true
                          }}
                          inputProps={{
                            multiline: true,
                            rows: 3
                          }}
                        />
                      </GridItem>
                    </GridContainer>
                  </CardBody>
                  <CardFooter>
                    <Button
                      color="primary"
                      onClick={this.handleUpdateProfile(createUser)}
                    >
                      Update Profile
                    </Button>
                  </CardFooter>
                </Card>
              </GridItem>
              <GridItem xs={12} sm={12} md={4}>
                <Card profile>
                  <CardAvatar profile>
                    <img
                      src={userInfo.picture ? userInfo.picture : avatar}
                      alt="..."
                    />
                  </CardAvatar>
                  <CardBody profile>
                    <h4 className={classes.cardTitle}>{userInfo.name}</h4>
                    {userInfo.name !== userInfo.email ? (
                      <p>{userInfo.email}</p>
                    ) : null}
                  </CardBody>
                </Card>
              </GridItem>
            </GridContainer>
          </div>
        )}
      </Mutation>
    );
  }
}

export default withStyles(styles)(LoggedIn(UserProfile));

import auth0 from "auth0-js";
import { AUTH_CONFIG } from "./auth0Config";

export default class Auth {
  accessToken;
  idToken;
  expiresAt;

  auth0 = new auth0.WebAuth({
    domain: AUTH_CONFIG.domain,
    clientID: AUTH_CONFIG.clientId,
    redirectUri: AUTH_CONFIG.callbackUrl,
    responseType: "token id_token",
    scope:
      "openid profile email create:current_user_metadata update:current_user_metadata"
  });

  login() {
    this.auth0.authorize();
  }

  handleAuthentication() {
    return new Promise(resolve =>
      this.auth0.parseHash((err, authResult) => {
        if (err) {
          throw err;
        }

        this.setSession(authResult);
        return resolve(authResult);
      })
    );
  }

  getAccessToken() {
    const sesssion = JSON.parse(sessionStorage.getItem("session"));

    return sesssion && sesssion.accessToken;
  }

  getIdToken() {
    const sesssion = JSON.parse(sessionStorage.getItem("session"));

    return sesssion && sesssion.isToken;
  }

  getUserInfo() {
    return new Promise(resolve => {
      this.auth0.client.userInfo(this.getAccessToken(), function(err, user) {
        if (err) {
          throw err;
        }

        resolve(user);
      });
    });
  }

  setSession(authResult) {
    // Set isLoggedIn flag in sessionStorage

    sessionStorage.setItem(
      "session",
      JSON.stringify({
        ...authResult,
        expiresAt: authResult.expiresIn * 1000 + new Date().getTime()
      })
    );
  }

  renewSession() {
    this.auth0.checkSession({}, (err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
      } else if (err) {
        this.logout();
        console.log(err);
        alert(
          `Could not get a new token (${err.error}: ${err.error_description}).`
        );
      }
    });
  }

  logout() {
    sessionStorage.removeItem("session");
    this.auth0.logout({
      returnTo: AUTH_CONFIG.logoutReturnTo,
      clientID: AUTH_CONFIG.clientId
    });
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // access token's expiry time
    // let expiresAt = this.expiresAt;
    // return new Date().getTime() < expiresAt;
    const sesssion = JSON.parse(sessionStorage.getItem("session"));

    return sesssion && new Date().getTime() < sesssion.expiresAt;
  }
}

export const AUTH_CONFIG = {
  domain: process.env.REACT_APP_DOMAIN || "birin.eu.auth0.com",
  clientId:
    process.env.REACT_APP_CLIENT_ID || "bGqQ2JvKKzeGFuiIHx7WXRUeVHI7A2xP",
  callbackUrl:
    process.env.REACT_APP_CALLBACK_URL || "http://localhost:3000/callback",
  logoutReturnTo:
    process.env.REACT_APP_LOGOUT_RETURN_TO || "http://localhost:3000/"
};

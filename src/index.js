import React from "react";
import ReactDOM from "react-dom";
import "moment/locale/en-gb";
import { createBrowserHistory } from "history";
import { Router, Route, Switch } from "react-router-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import "assets/css/material-dashboard-react.css";

import indexRoutes from "routes/index.jsx";

const hist = createBrowserHistory();

const client = new ApolloClient({
  uri: process.env.REACT_APP_SECRET_CODE || "http://localhost:4001"
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <Router history={hist}>
      <Switch>
        {indexRoutes.map((prop, key) => {
          const Component = prop.component;
          return (
            <Route
              path={prop.path}
              render={props => <Component {...props} />}
              key={key}
            />
          );
        })}
      </Switch>
    </Router>
  </ApolloProvider>,
  document.getElementById("root")
);

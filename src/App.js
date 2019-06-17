import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import routes from "./routes";
import withTracker from "./withTracker";



import "bootstrap/dist/css/bootstrap.min.css";
import "./shards-dashboard/styles/shards-dashboards.1.1.0.min.css";
import Redirect from "react-router-dom/es/Redirect";


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      logged_in: false,
      username: '',
      redirected: false
    };
  }
   redirected = false;





  render() {

    if (!this.state.logged_in && !this.state.redirected) {
      this.setState({redirected: !this.state.redirected})
      return (
        <Router basename={process.env.REACT_APP_BASENAME || ""}>
          <div>
            {routes.map((route, index) => {
              return (
                <Route
                  key={index}
                  path={route.path}
                  exact={route.exact}
                  component={withTracker(props => {
                    return (
                      <Redirect to="/login"/>
                    );
                  })}
                />
              );
            })}
          </div>
        </Router>
      )
    }

    return (
      <Router basename={process.env.REACT_APP_BASENAME || ""}>
        <div>
          {routes.map((route, index) => {
            return (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                component={withTracker(props => {
                  return (
                    <route.layout {...props}>
                      <route.component {...props} />
                    </route.layout>
                  );
                })}
              />
            );
          })}
        </div>
      </Router>
    )
  };



}

export default App;


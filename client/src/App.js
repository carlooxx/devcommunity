import React, { Fragment } from "react";
import "./App.css";
import Nav from "./components/layout/Nav";
import Landing from "./components/layout/Landing";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layout/Alert";

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Nav />
          <Route exact path="/" component={Landing} />
          <section className="container">
            <Alert />
            <Switch>
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import HomePage from "./views/Homepage";
import Users from "./views/Users";

import SideBar from "./components/SideBar/";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.scss";

const App: React.FC = () => {
  return (
    <Router>
      <div className="App">
        <SideBar />
        <div className="switch">
          <Switch>
            <Route path="/users">
              <Users />
            </Route>
            <Route path="/posts"></Route>
            <Route path="/">
              <HomePage />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
};

export default App;

import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import CreateTransaction from "./containers/CreateTransaction";

function App() {
  return (
    <Router>
      <React.Fragment>
        <ul>
          <Link to="/">Home</Link>
          <Link to="/create">Create</Link>
          <Link to="/edit/10">Edit</Link>
        </ul>
        <Route path="/" exact component={Home} />
        <Route path="/create" component={CreateTransaction} />
        <Route path="/edit/:id" component={CreateTransaction} />
      </React.Fragment>
    </Router>
  );
}

export default App;

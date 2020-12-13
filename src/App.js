import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Home from './containers/Home';
import {
  BrowserRouter as Router,
  Route,
  Link
} from "react-router-dom";
import CreateTransaction from "./containers/CreateTransaction";
import Utility from './utility';
import { testCategories, testItems } from './testData';
import AppContext from './AppContext';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: Utility.flattenArray(testItems),
      categories: Utility.flattenArray(testCategories)
    };

    this.actions = {
      deleteTransaction: (transaction) => {
        delete this.state.items[transaction.id];
        this.setState({
          items: this.state.items
        });
      }
    };
  }

  render() {
    return (
      <AppContext.Provider
        value={
          {
            state: this.state,
            actions: this.actions
          }
        }
      >
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
      </AppContext.Provider>
    );
  }
}

export default App;

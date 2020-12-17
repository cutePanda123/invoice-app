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
import AppContext from './AppContext';
import axios from 'axios';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: {},
      categories: {},
      currentDate: Utility.parseYearAndMonth(),
      isLoading: false
    };

    this.actions = {
      getInitialData: async () => {
        this.setState({
          isLoading: true
        });
        const {year, month} = this.state.currentDate;
        const getTransactionsUrl = `/transactions?dateTag=${year}-${month}&_sort=timestamp&_order=desc`;
        const results = await Promise.all([axios.get('/categories'), axios.get(getTransactionsUrl)]);
        const [categories, items] = results;
        this.setState({
          items: Utility.flattenArray(items.data),
          categories: Utility.flattenArray(categories.data),
          isLoading: false
        });

        return items;
      },
      updateDate: async (year, month) => {
        this.setState({
          isLoading: true
        });
        const getTransactionsUrl = `/transactions?dateTag=${year}-${month}&_sort=timestamp&_order=desc`;
        const response = await axios.get(getTransactionsUrl);
        this.setState({
          items: Utility.flattenArray(response.data),
          currentDate: {year, month},
          isLoading: false
        });

        return response;
      },
      deleteTransaction: async (transaction) => {
        this.setState({
          isLoading: true
        });
        const deletedTransaction = await axios.delete(`/transactions/${transaction.id}`);
        delete this.state.items[transaction.id];
        this.setState({
          items: this.state.items,
          isLoading: false
        });
        return deletedTransaction;
      },

      createTransaction: (transaction) => {
        const newTransactionId = Math.max(...Object.keys(this.state.items)) + 1;
        const newTransaction = {... transaction, id: newTransactionId, timestamp: new Date(transaction.date).getTime()};
        this.setState({
          items: {...this.state.items, [newTransactionId]: newTransaction}
        });
      },

      updateTransaction: (transaction) => {
        const editedTransaction = {... transaction, timestamp: new Date(transaction.date).getTime()}
        this.setState({
          items: {...this.state.items, [editedTransaction.id]: editedTransaction}
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
            <Route path="/edit/:transactionId" component={CreateTransaction} />
          </React.Fragment>
        </Router>
      </AppContext.Provider>
    );
  }
}

export default App;

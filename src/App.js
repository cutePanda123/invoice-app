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

    const withLoading = (cb) => {
      return (...args) => {
        this.setState({
          isLoading: true
        });
        return cb(...args);
      }
    }

    this.actions = {
      getInitialData: withLoading(async () => {
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
      }),

      getEditTransactionData: withLoading(async (id) => {
        let promises = [];
        const {items, categories} = this.state;
        if (Object.keys(categories).length === 0) {
          promises.push(axios.get('/categories'));
        }
        if (id && Object.keys(items).indexOf(id) === -1) {
          promises.push(axios.get(`/transactions/${id}`));
        }

        const results = await Promise.all(promises);
        const [fetchedCategories, fetchedTransaction] = results;
        const finalCategories = fetchedCategories ?  Utility.flattenArray(fetchedCategories.data) : categories;
        const modifiedTransaction = fetchedTransaction ? fetchedTransaction.data : items[id];
        if (id) {
          this.setState({
            items: {...this.state.items, [id]: modifiedTransaction},
            categories: finalCategories,
            isLoading: false
          });
        } else {
          this.setState({
            categories: finalCategories,
            isLoading: false
          });
        }

        return {
          categories: finalCategories,
          modifiedTransaction: modifiedTransaction
        }
      }),

      updateDate: withLoading(async (year, month) => {
        const getTransactionsUrl = `/transactions?dateTag=${year}-${month}&_sort=timestamp&_order=desc`;
        const response = await axios.get(getTransactionsUrl);
        this.setState({
          items: Utility.flattenArray(response.data),
          currentDate: {year, month},
          isLoading: false
        });

        return response;
      }),
      deleteTransaction: withLoading(async (transaction) => {
        const deletedTransaction = await axios.delete(`/transactions/${transaction.id}`);
        delete this.state.items[transaction.id];
        this.setState({
          items: this.state.items,
          isLoading: false
        });
        return deletedTransaction;
      }),

      createTransaction: withLoading(async (transaction) => {
        const newTransactionId = Math.max(...Object.keys(this.state.items)) + 1;
        const newTransaction = await axios.post('/transactions', {
          ... transaction,
          id: newTransactionId,
          timestamp: new Date(transaction.date).getTime(),
          dateTag: Utility.getDateTag(transaction.date)
        }); 
        this.setState({
          items: {...this.state.items, [newTransactionId]: newTransaction.data}
        });
        return newTransaction.data;
      }),

      updateTransaction: withLoading(async (transaction) => {
        const editedTransaction = await axios.put(`/transactions/${transaction.id}`, 
          {
            ... transaction,
            timestamp: new Date(transaction.date).getTime(),
            dateTag: Utility.getDateTag(transaction.date)
          }
        );
        this.setState({
          items: {...this.state.items, [editedTransaction.id]: editedTransaction.data}
        });

        return editedTransaction.data;
      })
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

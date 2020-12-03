import React from 'react';
import logo from '../logo.svg';
import TransactionList from '../components/TransactionList';
import ViewTab from '../components/ViewTab';
import Utility from '../utilility';
import SpendingSummary from '../components/SpendingSummary';
import MonthPicker from '../components/MonthPicker';
import CreateTransactionButton from '../components/CreateTransactionButton';

const categories = {
  "1": {
    "id": 1,
    "name": "travel",
    "type": "outcome",
    "iconName": "ios-plane"
  },
  "2": {
    "id": 2,
    "name": "investement",
    "type": "income",
    "iconName": "logo-yen"
  }
};

const items = [
  {
    "id": 0,
    "desc": "travel in Seattle",
    "amount": 2000,
    "date": "05-30-2014",
    "categoryId": 1
  },
  {
    "id": 1,
    "desc": "travel in San Jose",
    "amount": 4000,
    "date": "08-10-2014",
    "categoryId": 1
  },
  {
    "id": 2,
    "desc": "stock investement",
    "amount": 14000,
    "date": "12-10-2014",
    "categoryId": 2
  }
];

const fakeNewTransaction = {
  "id": 0,
  "desc": "fake new transaction",
  "amount": 14000,
  "date": "12-10-2014",
  "categoryId": 2
};

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: Utility.parseYearAndMonth(),
      tabView: Utility.LIST_VIEW_NAME
    };
  }

  changeView = (view) => {
    this.setState({
      tabView: view,
    });
  }

  changeDate = () => {
    
  }

  modifyTrasaction = () => {

  }

  createTransaction = () => {
    let len = this.state.items.length;
    console.log("initial length: " + len);
    fakeNewTransaction.id = len == 0 ? 0 : Math.max.apply(Math, this.state.items.map(item => item.id)) + 1;
    console.log("item id:" + fakeNewTransaction.id); 
    const newItems = [fakeNewTransaction, ...this.state.items];
    function setStateFunction(state, props) {
      const newState = {...state, items: [fakeNewTransaction, ...state.items]};
      return newState;
    }
    this.setState(setStateFunction);
    let debugItems = this.state.items;
    console.log("final length : " + this.state.items.length);
  }

  //this.setState((prevState)=>({ value:  doSomething(prevState.value) })
1


  deleteTransaction = (victim) => {
    let transactions = this.state.items.filter(transaction => transaction.id != victim.id);
    this.setState({
      items: transactions
    });
  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.categoryId];
      return item;
    });
    let totalIncome = 0, totalOutcome = 0;
    itemsWithCategory.forEach((item) => {
      if (item.category.type === Utility.OUTCOME_TYPE) {
        totalOutcome += item.amount;
      } else {
        totalIncome += item.amount;
      }
    });
    return (
      <React.Fragment>
        <header className="App-header">
          <div className="row mb-5">
            <img src={logo} className="App-logo"></img>
          </div>
          <div className="row mb-5">
            <div className="col">
              <MonthPicker
                year={currentDate.year}
                month={currentDate.month}
                onDateChange={this.changeDate}
              />
            </div>
            <div className="col">
              <SpendingSummary
                income={totalIncome}
                outcome={totalOutcome}
              />
            </div>
          </div>
        </header>
        <div className="cotent-area py-3 px-3">
          <ViewTab
            activeViewName={tabView}
            onClickTab={this.changeView}
          />
          <CreateTransactionButton
            onCreateTransaction={this.createTransaction}
          />
          { 
            tabView == Utility.LIST_VIEW_NAME && 
            <TransactionList 
              items = {itemsWithCategory}
              onDeleteItem = {this.deleteTransaction}
              onModifyItem = {this.modifyTrasaction}
            /> 
          }
          {
            tabView == Utility.CHART_VIEW_NAME &&
            <h2>Place holder for Chart View</h2>
          }
          
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
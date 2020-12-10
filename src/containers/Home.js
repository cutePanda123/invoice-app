import React from 'react';
import logo from '../logo.svg';
import TransactionList from '../components/TransactionList';
import ViewTab from '../components/ViewTab';
import Utility from '../utility';
import SpendingSummary from '../components/SpendingSummary';
import MonthPicker from '../components/MonthPicker';
import CreateTransactionButton from '../components/CreateTransactionButton';
import CreateTransactionForm from '../components/CreateTransactionForm';

export const categories = {
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

export const items = [
  {
    "id": 0,
    "desc": "travel in Seattle",
    "amount": 2000,
    "date": "2020-10-20",
    "categoryId": 1
  },
  {
    "id": 1,
    "desc": "travel in San Jose",
    "amount": 4000,
    "date": "2020-12-10",
    "categoryId": 1
  },
  {
    "id": 2,
    "desc": "stock investement",
    "amount": 14000,
    "date": "2020-12-15",
    "categoryId": 2
  }
];

const fakeTransaction = {
  "id": 0,
  "desc": "fake new transaction",
  "amount": 14000,
  "date": "2020-12-10",
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

  changeDate = (year, month) => {
    this.setState({
      currentDate: {year, month}
    });
  }

  modifyTrasaction = (modifiedTransaction) => {
    const newTransactions = this.state.items.map((transaction) => {
      if (modifiedTransaction.id === transaction.id) {
        transaction.desc = "modified transaction";
      }
      return transaction;
    });
    this.setState({
      items: newTransactions
    });
  }

  createTransaction = () => {
    let newTrasaction = JSON.parse(JSON.stringify(fakeTransaction));
    newTrasaction.id = this.state.items.length === 0 ? 0 : Math.max.apply(Math, this.state.items.map(item => item.id)) + 1;
    const newItems = [newTrasaction, ...this.state.items];
    this.setState({
      items: newItems
    });
  }

  deleteTransaction = (victim) => {
    let transactions = this.state.items.filter(transaction => transaction.id !== victim.id);
    this.setState({
      items: transactions
    });
  }

  render() {
    const {items, currentDate, tabView} = this.state;
    const itemsWithCategory = items.map(item => {
      item.category = categories[item.categoryId];
      return item;
    }).filter((transaction) => {
      const month = Utility.getMonthString(currentDate.month);
      return transaction.date.includes(`${currentDate.year}-${month}`);
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
            <CreateTransactionForm 
              onFormCancel={() => {
                console.log("on form cancle")
              }}
              onFormSubmit={() => {
                console.log("on form submit")
              }}
              transaction={{}}
            />
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
            tabView === Utility.LIST_VIEW_NAME && 
            <TransactionList 
              items = {itemsWithCategory}
              onDeleteItem = {this.deleteTransaction}
              onModifyItem = {this.modifyTrasaction}
            /> 
          }
          {
            tabView === Utility.CHART_VIEW_NAME &&
            <h2>Place holder for Chart View</h2>
          }
          
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
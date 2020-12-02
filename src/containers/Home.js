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
    "id": 1,
    "desc": "travel in Seattle",
    "amount": 2000,
    "date": "05-30-2014",
    "categoryId": 1
  },
  {
    "id": 2,
    "desc": "travel in San Jose",
    "amount": 4000,
    "date": "08-10-2014",
    "categoryId": 1
  },
  {
    "id": 3,
    "desc": "stock investement",
    "amount": 14000,
    "date": "12-10-2014",
    "categoryId": 2
  }
];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items,
      currentDate: Utility.parseYearAndMonth(),
      tabView: Utility.LIST_VIEW_NAME
    };
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
                onDateChange={(year, month) => {
                  console.log(year + " " + month);
                }}
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
            onClickTab={
              (viewName)=>{
                console.log(viewName);
              }
            }
          />
          <CreateTransactionButton
            onCreateTransaction={
              () => {
                console.log("create a transaction button");
              }}
          />
          <TransactionList 
            items = {itemsWithCategory}
            onDeleteItem = {
              (item) => {
                alert(item.id);
              }
            }
            onModifyItem = {
              (item) => {
                alert(item.id);
              }
            }
          /> 
        </div>
      </React.Fragment>
    );
  }
}

export default Home;
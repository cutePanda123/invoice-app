import React from 'react';
import logo from '../logo.svg';
import TransactionList from '../components/TransactionList';
import ViewTab from '../components/ViewTab';
import Utility from '../utilility';
import SpendingSummary from '../components/SpendingSummary';
import MonthPicker from '../components/MonthPicker';
import CreateTransactionButton from '../components/CreateTransactionButton';

const items = [
  {
    "id": 1,
    "desc": "travel in Seattle",
    "amount": 2000,
    "date": "05-30-2014",
    "category": {
      "id": 1,
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  },
  {
    "id": 2,
    "desc": "travel in San Jose",
    "amount": 4000,
    "date": "08-10-2014",
    "category": {
      "id": 1,
      "name": "travel",
      "type": "outcome",
      "iconName": "ios-plane"
    }
  }
];

class Home extends React.Component {
  render() {
    let totalIncome = 0, totalOutcome = 0;
    items.forEach((item) => {
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
                year={2020}
                month={12}
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
            activeViewName={Utility.LIST_VIEW_NAME}
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
            items = {items}
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
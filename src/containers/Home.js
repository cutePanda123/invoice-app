import React from 'react';
import logo from '../logo.svg';
import TransactionList from '../components/TransactionList';
import Utility from '../utility';
import SpendingSummary from '../components/SpendingSummary';
import MonthPicker from '../components/MonthPicker';
import CreateTransactionButton from '../components/CreateTransactionButton';
import EditTransactionForm from '../components/EditTransactionForm';
import { Tabs, Tab } from '../components/Tabs';
import Ionicon from 'react-ionicons';
import { testItems, testCategories as categories, fakeTransaction } from '../testData';
import { AppContext } from '../App';

const tabTexts = [Utility.LIST_VIEW_NAME, Utility.CHART_VIEW_NAME];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: testItems,
      currentDate: Utility.parseYearAndMonth(),
      tabView: Utility.LIST_VIEW_NAME
    };
  }

  changeView = (viewIndex) => {
    this.setState({
      tabView: tabTexts[viewIndex],
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
      <AppContext.Consumer>
        {
          ({ state }) => {
            //console.log(state);

            return (
              <React.Fragment>
                <header className="App-header">
                  <div className="row mb-5">
                    <img src={logo} className="App-logo"></img>
                  </div>
                  <div className="row mb-5">
                    <EditTransactionForm
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
                  <Tabs
                    activeIndex={0}
                    onTabChange={this.changeView}
                  >
                      <Tab>
                        <Ionicon
                          className="rounded-circle mr-2"
                          fontSize="25px"
                          color={"#007bff"}
                          icon="ios-paper"
                        />
                        List View
                      </Tab>
                      <Tab>
                        <Ionicon
                          className="rounded-circle mr-2"
                          fontSize="25px"
                          color={"#007bff"}
                          icon="ios-pie"
                        />
                        Chart View
                      </Tab>
                  </Tabs>
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
      </AppContext.Consumer>
    );
  }
}

export default Home;
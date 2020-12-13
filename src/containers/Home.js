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
import { testCategories } from '../testData';
import withContext from '../WithContext';
import { withRouter } from 'react-router-dom';

const tabTexts = [Utility.LIST_VIEW_NAME, Utility.CHART_VIEW_NAME];

class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
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

  createItem = () => {
    this.props.history.push('/create');
  }

  modifyTrasaction = (modifiedTransaction) => {
    const newTransactions = this.state.items.map((transaction) => {
      if (modifiedTransaction.id === transaction.id) {
        transaction.desc = "modified transaction";
      }
      return transaction;
    });
    this.props.history.push(`/edit/${newTransactions.id}`);
  }

  createTransaction = () => {
    /*let newTrasaction = JSON.parse(JSON.stringify(fakeTransaction));
    newTrasaction.id = this.state.items.length === 0 ? 0 : Math.max.apply(Math, this.state.items.map(item => item.id)) + 1;
    const newItems = [newTrasaction, ...this.state.items];
    this.setState({
      items: newItems
    });*/
    this.props.history.push('/create');
  }

  deleteTransaction = (victim) => {
    this.props.actions.deleteTransaction(victim);
  }

  render() {
    const {currentDate, tabView} = this.state;
    const { items } = this.props.data;
    let totalIncome = 0, totalOutcome = 0;
    let itemsWithCategory = [];
    for (const tId in items) {
      const category = testCategories[items[tId].categoryId]
      if (category.type === Utility.OUTCOME_TYPE) {
        totalOutcome += items[tId].amount;
      } else {
        totalIncome += items[tId].amount;
      }
      items[tId]['category'] = category;
      itemsWithCategory.push(items[tId]);
    }

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

export default withRouter(withContext(Home));
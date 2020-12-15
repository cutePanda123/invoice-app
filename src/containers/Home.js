import React from 'react';
import logo from '../logo.svg';
import TransactionList from '../components/TransactionList';
import Utility from '../utility';
import SpendingSummary from '../components/SpendingSummary';
import MonthPicker from '../components/MonthPicker';
import CreateTransactionButton from '../components/CreateTransactionButton';
import { Tabs, Tab } from '../components/Tabs';
import Ionicon from 'react-ionicons';
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
    this.props.history.push(`/edit/${modifiedTransaction.id}`);
  }

  createTransaction = () => {
    this.props.history.push('/create');
  }

  deleteTransaction = (victim) => {
    this.props.actions.deleteTransaction(victim);
  }

  render() {
    const { currentDate, tabView } = this.state;
    const { year, month } = this.state.currentDate;
    const { items, categories } = this.props.data;
    let totalIncome = 0, totalOutcome = 0;
    let itemsWithCategory = [];
    for (const tId in items) {
      const dateStr = year + '-' + Utility.getMonthString(month);
      if (!items[tId].date.includes(dateStr)) {
        continue;
      }
      const category = categories[items[tId].categoryId]
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
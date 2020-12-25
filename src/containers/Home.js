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
import Loader from '../components/Loader';
import PropTypes from 'prop-types';
import CustomPieChart from '../components/CustomPieChart';

const tabTexts = [Utility.LIST_VIEW_NAME, Utility.CHART_VIEW_NAME];

const generateChartDataByCategory = (transactions, type = Utility.INCOME_TYPE) => {
  let categoryMap = {};
  transactions.filter(transaction => transaction.category.type === type).forEach(transaction => {
    if (categoryMap[transaction.categoryId]) {
      categoryMap[transaction.categoryId].value += (transaction.amount * 1);
      categoryMap[transaction.categoryId].transactions.push(transaction.id);
    } else {
      categoryMap[transaction.categoryId] = {
        name: transaction.category.name,
        value: transaction.amount * 1,
        transactions: [transaction.id]
      };
    }
  });
  return Object.keys(categoryMap).map(mapKey => {
    return { ...categoryMap[mapKey] };
  });
};

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabView: Utility.LIST_VIEW_NAME
    };
  }

  changeView = (viewIndex) => {
    this.setState({
      tabView: tabTexts[viewIndex],
    });
  }

  changeDate = (year, month) => {
    this.props.actions.updateDate(year, month);
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

  componentDidMount() {
    this.props.actions.getInitialData();
  }

  render() {
    const { tabView } = this.state;
    const { items, categories, currentDate, isLoading } = this.props.data;
    let totalIncome = 0, totalOutcome = 0;
    let transactionsWithCategory = [];
    for (const tId in items) {
      const category = categories[items[tId].categoryId]
      if (category.type === Utility.OUTCOME_TYPE) {
        totalOutcome += items[tId].amount;
      } else {
        totalIncome += items[tId].amount;
      }
      items[tId]['category'] = category;
      transactionsWithCategory.push(items[tId]);
    }

    const chartOutcomeData = generateChartDataByCategory(transactionsWithCategory, Utility.OUTCOME_TYPE);
    const chartIncomeData = generateChartDataByCategory(transactionsWithCategory, Utility.INCOME_TYPE);

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
          {
            isLoading &&
            <Loader />
          }
          {
            !isLoading &&
              <React.Fragment>
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
                  items = {transactionsWithCategory}
                  onDeleteItem = {this.deleteTransaction}
                  onModifyItem = {this.modifyTrasaction}
                /> 
              }
              {
                tabView === Utility.CHART_VIEW_NAME &&
                <React.Fragment>
                  <CustomPieChart title={"Income Chart View"} categoryData={chartIncomeData} />
                  <CustomPieChart title={"Outcome Chart View"} categoryData={chartOutcomeData} />
                </React.Fragment>
              }
            </React.Fragment>
          }
        </div>
      </React.Fragment>
    );
  }
};

Home.propTypes = {
  data: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

export default withRouter(withContext(Home));
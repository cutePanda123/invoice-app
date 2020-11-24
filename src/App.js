import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import TransactionList from './components/TransactionList';
import ViewTab from './components/ViewTab';
import Constants from './utilility';
import SpendingSummary from './components/SpendingSummary';

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

function App() {
  return (
    <div className="App">
      <SpendingSummary
        income={1000}
        outcome={500}
      />
      <ViewTab
        activeViewName={Constants.LIST_VIEW_NAME}
        onClickTab={
          (viewName)=>{
            console.log(viewName);
          }
        }
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
  );
}

export default App;

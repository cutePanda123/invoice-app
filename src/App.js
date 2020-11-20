import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import TransactionList from './components/TransactionList';

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
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
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

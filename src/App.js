import logo from './logo.svg';
import './App.css';

const items = [
  {
    "id": 1,
    "desc": "travel in Seattle",
    "amount": 2000,
    "date": "05-30-2014",
    "category": {
      "id": 1,
      "name": "travel",
      "type": "outcome"
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
    </div>
  );
}

export default App;

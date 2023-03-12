// import logo from './logo.svg';
// import './App.css';
import { useState, createContext } from 'react';
import SymbolInput from './components/SymbolInput';
import VariantButton from './components/VariantButton';
import { ook } from './data/variants';

const variants = [ ook ];

const SymbolContext = createContext(null);

function App() {

  const [ symbolMap, setSymbolMap ] = useState({
    "shift_right": ">",
    "shift_left": "<",
    "increment": "+",
    "decrement": "-",
    "output": ".",
    "input": ",",
    "start_while": "[",
    "end_while": "]"
  });
  // const [ lexicalTokens, setLexicalTokens ] = useState([]);

  return (
    <div className="App">
      <header className="App-header">
        {/* <img src={logo} className="App-logo" alt="logo" />
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
        </a> */}
        <h1>Test</h1>
        <SymbolContext.Provider value={{symbolMap, setSymbolMap}}>
          {Object.keys(symbolMap).map(type => (
            <SymbolInput key={type} type={type} />
          ))}
          { variants.map(variant => (
            <VariantButton key={variant["name"]} name={variant["name"]} symbols={variant["symbols"]} />)
          )}
        </SymbolContext.Provider>

      </header>
    </div>
  );
}

export { App, SymbolContext };

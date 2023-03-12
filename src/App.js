// import logo from './logo.svg';
import './App.css';
import { useState, createContext, useEffect } from 'react';
import SymbolInput from './components/SymbolInput';
import VariantButton from './components/VariantButton';
import { ook } from './data/variants';

const variants = [ ook ];

const SymbolContext = createContext(null);

function App() {

  // const [ lexicalTokens, setLexicalTokens ] = useState([]);

  const [ shiftRightSymbol, setShiftRightSymbol ] = useState(">");
  const [ shiftLeftSymbol, setShiftLeftSymbol ] = useState("<");
  const [ incrementSymbol, setIncrementSymbol ] = useState("+");
  const [ decrementSymbol, setDecrementSymbol ] = useState("-");
  const [ outputSymbol, setOutputSymbol ] = useState(".");
  const [ inputSymbol, setInputSymbol ] = useState(",");
  const [ startWhileSymbol, setStartWhileSymbol ] = useState("[");
  const [ endWhileSymbol, setEndWhileSymbol ] = useState("[");

  const symbolMap = {
    "shift_right" : [ shiftRightSymbol, setShiftRightSymbol ],
    "shift_left" : [ shiftLeftSymbol, setShiftLeftSymbol ],
    "increment": [ incrementSymbol, setIncrementSymbol ],
    "decrement": [ decrementSymbol, setDecrementSymbol ],
    "output": [ outputSymbol, setOutputSymbol ],
    "input": [ inputSymbol, setInputSymbol ],
    "start_while": [ startWhileSymbol, setStartWhileSymbol ],
    "end_while": [ endWhileSymbol, setEndWhileSymbol ]
  }

  const [ isValidSymbols, setIsValidSymbols ] = useState(true);

  useEffect(() => {
    console.log({
      "shift_right": shiftRightSymbol,
      "shift_left": shiftLeftSymbol,
      "increment": incrementSymbol,
      "decrement": decrementSymbol,
      "output": outputSymbol,
      "input": inputSymbol,
      "start_while": startWhileSymbol,
      "end_while": endWhileSymbol
    });
  }, [symbolMap]);

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
        <SymbolContext.Provider value={{ symbolMap, setIsValidSymbols}}>
          {Object.keys(symbolMap).map(type => (
            <SymbolInput key={type} type={type} />
          ))}
          { variants.map(variant => (
            <VariantButton key={variant["name"]} name={variant["name"]} newSymbols={variant["symbols"]} />)
          )}
        </SymbolContext.Provider>

      </header>
    </div>
  );
}

export { App, SymbolContext };

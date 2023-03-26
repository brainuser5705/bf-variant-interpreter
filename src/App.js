// import logo from './logo.svg';
import './App.css';
import { useState, createContext, useEffect } from 'react';
import SymbolInput from './components/SymbolInput';
import VariantButton from './components/VariantButton';
import { ook } from './data/variants';
import { TextEditor } from './components/TextEditor';

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
  const [ endWhileSymbol, setEndWhileSymbol ] = useState("]");

  const [ isShiftRightValid, setIsShiftRightValid ] = useState(true);
  const [ isShiftLeftValid, setIsShiftLeftValid ] = useState(true);
  const [ isIncrementValid, setIsIncrementValid] = useState(true);
  const [ isDecrementValid, setIsDecrementValid ] = useState(true);
  const [ isOutputValid, setIsOutputValid] = useState(true);
  const [ isInputValid, setIsInputValid ] = useState(true);
  const [ isStartWhileValid, setIsStartWhileValid ] = useState(true);
  const [ isEndWhileValid, setIsEndWhileValid ] = useState(true);

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

  const validSymbolMap = {
    "shift_right" : [ isShiftRightValid, setIsShiftRightValid ],
    "shift_left" : [ isShiftLeftValid, setIsShiftLeftValid ],
    "increment": [ isIncrementValid, setIsIncrementValid ],
    "decrement": [ isDecrementValid, setIsDecrementValid ],
    "output": [ isOutputValid, setIsOutputValid ],
    "input": [ isInputValid, setIsInputValid ],
    "start_while": [ isStartWhileValid, setIsStartWhileValid ],
    "end_while": [ isEndWhileValid, setIsEndWhileValid ]
  }

  const [ sourceCode, setSourceCode ] = useState("");

  useEffect(() => {
    // console.log({
    //   "shift_right": shiftRightSymbol,
    //   "shift_left": shiftLeftSymbol,
    //   "increment": incrementSymbol,
    //   "decrement": decrementSymbol,
    //   "output": outputSymbol,
    //   "input": inputSymbol,
    //   "start_while": startWhileSymbol,
    //   "end_while": endWhileSymbol
    // });
    console.log(sourceCode);
  }, [sourceCode]);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Test</h1>
        <SymbolContext.Provider value={{ symbolMap, validSymbolMap, sourceCode, setSourceCode}}>
          {Object.keys(symbolMap).map(type => (
            <SymbolInput key={type} type={type} />
          ))}
          { variants.map(variant => (
            <VariantButton key={variant["name"]} name={variant["name"]} newSymbols={variant["symbols"]} />)
          )}
          <TextEditor></TextEditor>
        </SymbolContext.Provider>

      </header>
    </div>
  );
}

export { App, SymbolContext };

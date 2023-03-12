import { useContext, useState } from 'react';
import { SymbolContext } from '../App';

function SympolInput(props) {

    // value attribtue of input needs to be set to a state variable, so that
    // it can be updated through the UI and the React app itself
    const { symbolMap, isValidSymbols, setIsValidSymbols } = useContext(SymbolContext);
    const [symbol, setSymbol] = symbolMap[props.type];
    const [ isValidInput, setIsValidInput ] = useState(true);

    return (
        <input
            type="text"
            value={symbol}
            placeholder={"Need to define a symbol"}
            className={`${isValidInput ? "" : "invalid-symbol-field"}`}
            onChange={e => {
                let newSymbol = e.target.value;

                let valid = true;
                Object.values(symbolMap).map(value => {
                    if (newSymbol == value[0]){
                        valid = false;
                    }
                });

                // set valid input for this individual symbol to change class
                setIsValidInput(valid && newSymbol !== '');
                // set valid symbols for parent app state (to avoid doing same check in parent)
                setIsValidSymbols(isValidInput);

                setSymbol(newSymbol);
            }}
        />

    );
}

export default SympolInput;
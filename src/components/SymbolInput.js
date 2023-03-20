import { useContext } from 'react';
import { SymbolContext } from '../App';

function SympolInput(props) {

    // value attribtue of input needs to be set to a state variable, so that
    // it can be updated through the UI and the React app itself
    const { symbolMap, validSymbolMap } = useContext(SymbolContext);
    const [ symbol, setSymbol ] = symbolMap[props.type];
    const [ isValidSymbol, setIsValidSymbol ] = validSymbolMap[props.type];

    return (
        <input
            type="text"
            value={symbol}
            placeholder={"Need to define a symbol"}
            className={`${isValidSymbol ? "" : "invalid-symbol-field"}`}
            onChange={e => {
                let newSymbol = e.target.value;

                let valid = true;
                Object.values(symbolMap).map(value => {
                    if (newSymbol === value[0]){
                        valid = false;
                    }
                });

                console.log(Object.values(symbolMap));
                
                setIsValidSymbol(valid && newSymbol !== '');

                setSymbol(newSymbol);
            }}
        />

    );
}

export default SympolInput;
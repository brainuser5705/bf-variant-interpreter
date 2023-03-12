import { useContext, useEffect } from 'react';
import { SymbolContext } from '../App';

function SympolInput(props) {

    // value attribtue of input needs to be set to a state variable, so that
    // it can be updated through the UI and the React app itself
    const symbolMap = useContext(SymbolContext);
    const [symbol, setSymbol] = symbolMap[props.type];
    
    return (
        <input
            type="text"
            value={symbol}
            placeholder={"Need to define a symbol"}
            onChange={e => {
                setSymbol(e.target.value);
            }} 
        />

    );
}

export default SympolInput;
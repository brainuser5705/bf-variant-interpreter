import { useState, useContext } from 'react';
import { SymbolContext } from '../App';

function SympolInput(props) {

    const type = props.type;

    const { symbolMap, setSymbolMap } = useContext(SymbolContext);

    // value attribtue of input needs to be set to a state variable, so that
    // it can be updated through the UI and the React app itself
    const [ displayValue, setDisplayValue ] = useState(symbolMap[type]);

    return (
        <input
            type="text"
            value={displayValue}
            onChange={e => {
                let newSymbol = e.target.value;
                setDisplayValue(newSymbol);

                if (newSymbol !== '' && !(Object.values(symbolMap).includes(newSymbol))){
                    symbolMap[type] = newSymbol;
                    setSymbolMap(symbolMap);
                    console.log(symbolMap);   
                }else{
                    console.log("Can't change");
                }
            }} 
        />
    );
}

export default SympolInput;
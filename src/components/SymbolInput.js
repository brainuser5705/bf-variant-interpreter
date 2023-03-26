import { useContext } from 'react';
import { SymbolContext } from '../App';

function SympolInput(props) {

    // value attribtue of input needs to be set to a state variable, so that
    // it can be updated through the UI and the React app itself
    const { symbolMap, validSymbolMap } = useContext(SymbolContext);
    const [ symbol, setSymbol ] = symbolMap[props.type];
    const [ isValidSymbol, setIsValidSymbol ] = validSymbolMap[props.type];

    // function updateSourceCode(oldSymbol, newSymbol){
    //     newSourceCode = "";
    //     for (let tuple of lexicalTokens){
    //         let value = tuple[0];
    //         if (oldSymbol === value){
    //             tuple[0] =  
    //         }else{
    //             newSourceCode += value;
    //         }
    //     }
    //     setSourceCode(newSourceCode);
    // }

    return (
        <input
            type="text"
            value={symbol}
            placeholder={"Need to define a symbol"}
            className={`${isValidSymbol ? "" : "invalid-symbol-field"}`}
            onChange={e => {
                let newSymbol = e.target.value;
                setSymbol(newSymbol);

                let valid = true;
                Object.values(symbolMap).forEach(value => {
                    if (newSymbol === value[0]){
                        valid = false;
                    }
                });
                setIsValidSymbol(valid && newSymbol !== '');
                
            }}
        />

    );
}

export default SympolInput;
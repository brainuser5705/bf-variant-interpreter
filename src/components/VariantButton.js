import { useContext } from "react";
import { SymbolContext } from "../App"

function VariantButton(props){

    const { symbolMap, validSymbolMap } = useContext(SymbolContext);
    const newSymbols = props.newSymbols;

    function updateMaps(){
        Object.keys(symbolMap).forEach(type => {
            let newSymbol = newSymbols[type];
            let setSymbolFunction = symbolMap[type][1];
            setSymbolFunction(newSymbol);
        });

        // set all inputs to be valid
        Object.values(validSymbolMap).forEach(validSymbol => {
            let setValidSymbolFunction = validSymbol[1];
            setValidSymbolFunction(true);
        });
    }

    return (
        <button onClick={() => updateMaps()}>
            { props.name }
        </button>
    );
}

export default VariantButton;
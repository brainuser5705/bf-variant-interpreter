import { useContext } from "react";
import { SymbolContext } from "../App"

function VariantButton(props){

    const { symbolMap } = useContext(SymbolContext);

    function updateSymbolMap(newSymbols){
        Object.keys(symbolMap).map(type => {
            let newSymbol = newSymbols[type];
            let setSymbolFunction = symbolMap[type][1];
            setSymbolFunction(newSymbol);
        });
    }

    return (
        <button onClick={() => updateSymbolMap(props.newSymbols)}>
            { props.name }
        </button>
    );
}

export default VariantButton;
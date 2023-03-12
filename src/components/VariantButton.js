import { useContext } from "react";
import { SymbolContext } from "../App"

function VariantButton(props){

    const { setSymbolMap } = useContext(SymbolContext);
    
    return (
        <button onClick={() => {setSymbolMap(props.symbols); console.log(props.symbols);}}>
            { props.name }
        </button>
    );
}

export default VariantButton;
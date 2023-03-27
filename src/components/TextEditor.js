import { createContext, useContext, useState } from "react";
import { SymbolContext } from "../App";
import Interpreter from "../interpreter/Interpreter";

const EditorContext = createContext(null);

function TextEditor(){

    const { sourceCode, setSourceCode } = useContext(SymbolContext);
    const [ errorMessage, setErrorMessage ] = useState("");
    const [ output, setOutput ] = useState("");

    return (
        <div>
            <textarea
                value={sourceCode}
                onChange={e => {
                    setSourceCode(e.target.value);
                }}
                rows={15}
                placeholder={"Enter your program here..."}
            />
            <EditorContext.Provider value={{sourceCode, output, setOutput, setErrorMessage}}>
                <div>{errorMessage}</div>
                <Interpreter></Interpreter>
                <div>{output}</div>
            </EditorContext.Provider>
        </div>
    );
        
}

export { TextEditor, EditorContext };
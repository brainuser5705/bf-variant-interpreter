import { useContext } from "react";
import { SymbolContext } from "../App";
import { EditorContext } from "../components/TextEditor";
import Parser from "./Parser";
import PeekableStream from "./Stream";

function Interpreter(){
    const { symbolMap } = useContext(SymbolContext);

    const lexicalTokens = [];
    const parserTokens = [];

    const arr = new Array(3000).fill(0);
    const index = 0;
    const { sourceCode, output, setOutput, setErrorMessage } = useContext(EditorContext);

    function lex(){
        
        var bufferString = "";
        for(let c of sourceCode){
            bufferString += c;
            Object.keys(symbolMap).forEach(type => {
                let value = symbolMap[type][0];
                if (value === bufferString){
                    lexicalTokens.push(type);
                    bufferString = "";
                }
            });
        }
        if (bufferString !== ""){
            setErrorMessage("Symbol '" + bufferString + "' is not recognized.");
        }  
    }
    
    function parse(){
        let parser = new Parser(new PeekableStream(lexicalTokens), setErrorMessage);
        while (parser.tokenStream.pointer !== null){
            let parserToken = parser.next_expression();
            if (parserToken !== null){
                parserTokens.push(parserToken);
            }
        }
    }
    
    function evaluate(){
        for (let token of parserTokens){
            
            let type = token[0];
    
            switch(type){
                case "shift_right":
                    index++;
                    break;
                case "shift_left":
                    if (index !== 0){
                        index--;
                    }else{
                        // something with error message
                        setErrorMessage("Negative index reached.")
                    }
                    break;
                case "increment":
                    arr[index]++;
                    break;
                case "decrement":
                    arr[index]--;
                    break;
                case "output":
                    setOutput(output + String.fromCharCode(arr[index]));
                    break;
                case "input":
                    let entered = "";
                    while (entered.length !== 1){
                        entered = prompt("Enter a character:");
                    }
                    arr[index] = entered.charCodeAt(0);
                    break;
                case "while":
                    while (arr[index] !== 0){
                        let body = token[1];
                        evaluate(body);
                    }
                    break;
                default:
                    break;
    
            }
        }
    }
    
    return(
        <div>
            <button onClick={()=>{
                lex();
                console.log("Lexical tokens: " + lexicalTokens);
                parse();
                console.log("Parser tokens: " + parserTokens);
                // evaluate();
            }}>Run</button>
        </div>
    );
}

export default Interpreter;
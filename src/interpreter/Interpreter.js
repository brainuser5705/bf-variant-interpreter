import { useContext, useEffect } from "react";
import { SymbolContext } from "../App";
import { EditorContext } from "../components/TextEditor";
import Parser from "./Parser";
import PeekableStream from "./Stream";

function Interpreter(){
    const { symbolMap } = useContext(SymbolContext);

    const lexicalTokens = [];
    const parserTokens = [];

    var arr = new Array(3000).fill(0);
    var index = 0;
    const { sourceCode, output, setOutput, setErrorMessage } = useContext(EditorContext);

    useEffect(() => {
        console.log(output);
    }, [output]);

    function lex(){
        
        var bufferString = "";
        for(let c of sourceCode){
            if ((/\S/g).test(c)){ // ignore whitespace
                bufferString += c;
                Object.keys(symbolMap).forEach(type => {
                    let value = symbolMap[type][0];
                    if (value === bufferString){
                        lexicalTokens.push(type);
                        bufferString = "";
                    }
                });
            }
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
    
    function evaluateIter(tokens){
        for (let token of tokens){
            
            let type = token[0];
    
            switch(type){
                case "shift_right":
                    index++;
                    break;
                case "shift_left":
                    if (index !== 0){
                        index--;
                    }else{
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
                    // console.log("Output: " + output);
                    // console.log(output + String.fromCharCode(arr[index]));
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
                        evaluateIter(body);
                    }
                    break;
                default:
                    break;
    
            }
        }
    }

    function evaluate(){
        setOutput("");
        evaluateIter(parserTokens);
    }
    
    return(
        <div>
            <button onClick={()=>{
                lex();
                console.log("Lexical tokens: " + lexicalTokens);
                parse();
                console.log("Parser tokens: " + parserTokens);
                evaluate();
            }}>Run</button>
        </div>
    );
}

export default Interpreter;
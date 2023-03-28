class Evaluator {

    // see if I can use context here

    constructor(tokens, arr, index, setOutput, setErrorMessage, initOutputString){
        this.tokens = tokens; // the parser tokens
        this.tokenIndex = 0;
        this.numTokens = tokens.length;

        this.arr = arr;
        this.index = index;
        this.setOutput = setOutput;
        this.setErrorMessage = setErrorMessage;

        // internal state to alleviate async updates for set state
        this.outputString = initOutputString;

        console.log(this.numTokens);
    }

    evaluate(){
        if (this.tokenIndex === this.numTokens){
            console.log("Done");
            return;
        }else{
            console.log("Token Index: " + this.tokenIndex);
            this.evaluateToken(this.tokens[this.tokenIndex++]); 
        }
    }

    evaluateToken(token){
        let type = token[0];
        console.log("Token: " + token);

        switch(type){
            case "shift_right":
                this.index++;
                this.evaluate();
                break;
            case "shift_left":
                if (this.index !== 0){
                    this.index--;
                    this.evaluate();
                }else{
                    this.setErrorMessage("Negative index reached.");
                    return;
                }
                break;
            case "increment":
                this.arr[this.index]++;
                this.evaluate();
                break;
            case "decrement":
                this.arr[this.index]--;
                this.evaluate();
                break;
            case "output":
                // console.log("Output: " + output);
                // console.log(output + String.fromCharCode(arr[index]));
                this.outputString += String.fromCharCode(this.arr[this.index]);
                this.setOutput(this.outputString);
                this.evaluate();
                break;
            case "input":
                let entered = "";
                while (entered.length !== 1){
                    entered = prompt("Enter a character:");
                }
                this.arr[this.index] = entered.charCodeAt(0);
                this.evaluate();
                break;
            case "while":
                while (this.arr[this.index] !== 0){
                    let body = token[1];
                    let whileLoopEvaluator = new Evaluator(body, this.arr, this.index, this.setOutput, this.setErrorMessage, this.outputString);
                    whileLoopEvaluator.evaluate();
                }
                this.evaluate();
                break;
            default:
                break;

        }
        
    }
}

export default Evaluator;
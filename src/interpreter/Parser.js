class Parser{

    constructor(tokenStream, setError){
        this.tokenStream = tokenStream;
        this.setError = setError;
    }

    next_expression(){
        let type = this.tokenStream.pointer;

        this.tokenStream.dispense_char();

        switch(type){
            case "start_while":
                return ["while", this.get_multiple_expression()]
            case "end_while":
                // error message
                this.setError("End while does not have matching start while");
                return null;
            default:
                return [type, []];
        }
    }

    get_multiple_expression(){

        let exps = [];

        let type = this.tokenStream.pointer;

        if (type === null){
            // whileBodyParser reached the EOF since loop never terminated
            // something with error message
            this.setError("While loop is unterminated");
            return exps;
        }

        if (type !== "end_while"){
            let whileBodyParser = new Parser(this.tokenStream, this.setError);
            
            while (type !== "end_while"){
                let exp = whileBodyParser.next_expression();

                if (exp !== null){
                    exps.push(exp);
                }

                type = whileBodyParser.tokenStream.pointer;
            }
        }

        // finish parsing while loop body by ignorning ']'
        this.tokenStream.dispense_char();

        return exps;

    }
}

export default Parser;
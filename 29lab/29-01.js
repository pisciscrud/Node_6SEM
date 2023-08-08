import express from "express";
import bodyParser from "body-parser";
import jsonRouter from "express-json-rpc-router"

const app = express();
app.use(bodyParser.json());

const methods = {
    sum(params, raw) {
        return Object.values(params).reduce(
          (sum, currentValue) => sum + currentValue,
          0
        );
      },
      mul(params, raw) {
        return Object.values(params).reduce(
          (mul, currentValue) => mul * currentValue,
          1
        );
      },
      div(params, raw) {
        const {a,b} = params;
        params = Object.values(params);
        return a / b;
      },
      proc(params, raw) {
        const {a,b} = params;
        params = Object.values(params);
        return (a/ b) * 100;
      },

}

const validator_1 = (params) => {

    params = Object.values(params);

    if (params.length < 2) {
      throw new Error("Not enough params");
    }
  
    params.forEach((item) => {
      if (typeof item !== "number") {
        throw new Error("Params must be numbers");
      }
    });
}

const validator_2 = (params, _, raw) => {
    console.log(params);
    const {a,b} = params;

    params = Object.values(params);

    if(b === 0)
        throw new Error("Second param is 0 (dividing on zero)")

    if(params.length !== 2)
        throw new Error("There should be two parameters")

        validator_1(  params )
    for (const val of params) {
        if(!Number.isInteger(val))
            throw new Error("Only integer number");
    }
    return params;
}

const beforeController = {
    sum: (params) => validator_1(params),
    mul: (params) => validator_1(params),
    div: (params, _, raw) => validator_2(params, _, raw),
    proc: (params, _, raw) => validator_2(params, _, raw)


};



app.use(jsonRouter({
    methods: methods,
    beforeMethods: beforeController,
  
    onError(err){console.log(err)}
}))

app.listen(3000, () => console.log("server listen"));
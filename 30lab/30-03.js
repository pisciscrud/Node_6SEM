
const express = require("express");
const fs = require("fs");

const app = express();

app.use("/", express.static("."));

const wasmCode = fs.readFileSync("D:\\6SEM\\NodeJS\\30lab\\p.wasm");
const wasmImports = {};
const wasmModule = new WebAssembly.Module(wasmCode);
const wasmInstance = new WebAssembly.Instance(wasmModule, wasmImports);

app.get("/", (req, res, next) => {
  res
    .type("html")
    .send(
      `<p>sum(24, 22) = ${wasmInstance.exports.sum(24, 22)}</p>` +
        `<p>sub(24, 22) = ${wasmInstance.exports.mul(24, 22)}</p>` +
        `<p>mul(24, 22) = ${wasmInstance.exports.sub(24, 22)}</p>`
    );
});

app.listen(3000, () => {
  console.log('Server started on port 3000');
});

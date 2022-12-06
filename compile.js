const path = require("path");
const fs = require("fs");
const solc = require("solc");
const ecomPath = path.resolve(__dirname, "contracts", "TicketSale.sol");
const source = fs.readFileSync(ecomPath, "utf8");
let input = {
  language: "Solidity",
  sources: {
    "TicketSale.sol": {
      content: source,
    },
  },
  settings: {
    outputSelection: {
      "*": {
        "*": ["abi", "evm.bytecode"],
      },
    },
  },
};
const output = JSON.parse(solc.compile(JSON.stringify(input)));
console.log(output);
console.log(output.contracts["TicketSale.sol"].TicketSale);
const bytecode =
  output.contracts["TicketSale.sol"].TicketSale.evm.bytecode.object;
console.log(bytecode);
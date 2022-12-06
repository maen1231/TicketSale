const assert = require("assert");
const ganache = require("ganache-cli");
const Web3 = require("web3");
const web3 = new Web3(ganache.provider());
const { abi, bytecode } = require("../compile");

let accounts;
beforeEach(async () => {
  ticketSale = await new web3.eth.Contract(abi)
    .deploy({
      data: bytecode,
      arguments: [100, 1],
    })
    .send({ from: accounts[0], gasPrice: 1500000, gas: 4700000 });
});

describe("Ticket Sale", () => {
  it("deploys a contract with owner", async () => {
    assert.ok(TicketSale.options.adress);
  });
  it("verify purchase", async () => {
    ticketSale.methods
      .buyTicket(2)
      .send({ from: accounts[1], value: 1, gasPrice: 1500000, gas: 470000 });
    const ticketId = await ticketSale.methods.getTicketOf(accounts[1]).call();
    assert.equal(ticketId, 2);
  });
});
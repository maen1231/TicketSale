import React from "react";
import web3 from "./web3";
import TicektSalefrom "./TicketSale";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { manager: "" };
  }

  async componentDidMount() {
    const manager = await TicketSale.methods.manager().call();
    this.setState({ manager });
  }

  render() {
    return (
      <div>
        <h2>TicketSale Contract</h2>
        <p>This contract is managed by {this.state.manager}</p>
      </div>
    );
  }
}


class App extends React.Component {
state={
    manager: '',
    Tickets: [],
    ticketSold: '',
    address: '',
    price: '',
    person: '',
    balance: ''
  };
async componentDidMount(){
    const manager= await TicketSale.methods.manager().call();
    const person=await TicketSale.methods.getTicketOf().call();
    const address=TicketSale.options.address;
    const balance=await web3.eth.getBalance(TicketSale.options.address);
    this.setState({manager, players, balance, address});
  }
  
  render(){
     return (
      <div className="App">
        <h2>TicketSale Contract</h2>
        <p>This contract is managed by {this.state.manager},
        The contract address is {this.state.address},
        There are currenlty {this.state.person.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!
        </p>
       </div>
    );
  }


  render(){
     return (
      <div className="App">
        <h2>Lottery Contract</h2>
        <p>This contract is managed by {this.state.manager},
        The contract address is {this.state.address},
        There are currenlty {this.state.person.length} people entered,
        competing to win {web3.utils.fromWei(this.state.balance,'ether')} ether!
        </p>

       <form onSubmit={this.onSubmit}>
          <h4> Want to try your luck?</h4>
          <div>
          <label>Amount of ether to enter </label>
          <input
            value={this.state.value}
            onChange={event=> this.setState({value: event.target.value})}
          />
          </div>
          <button>Enter</button>
        </form>
        <h1>{this.state.message}</h1>
       </div>
    );
  }

  onSubmit= async (event)=> {
    event.preventDefault();

    const accounts=await web3.eth.getAccounts();

    this.setState({message: 'Wait on transaction success ... '})

    await TicketSale.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value,'ether')
    });
    this.setState({message: 'you have been entered!'});
  };

  render(){
   return (
    <div className="App">
      …
      …
     <form onSubmit={this.onSubmit}>
        <h4> Want to buy a ticket</h4>
        <div>
        <label>Amount of ether to enter </label>
        <input
          value={this.state.value}
          onChange={event=> this.setState({value: event.target.value})}
        />
        </div>
        <button>Enter</button>
      </form>
     <hr />
      <h4>Ready to buy</h4>
      <button onClick={this.onClick}>Buy Ticket</button>
      <hr />
      <h1>{this.state.message}</h1>
     </div>
  );
}

onClick = async () => {
      const accounts = await web3.eth.getAccounts();

      this.setState({ message: "Waiting on transaction success..." });

      await lottery.methods.pickWinner().send({
        from: accounts[0],
      });
    this.setState({ message: "A winner has been picked!" });
  };



}


export default App;

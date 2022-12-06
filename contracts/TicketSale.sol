// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity ^0.8.17;

contract TicketSale {

    // <contract_variables>
    
    address private owner;
    mapping (address => uint) tickets;
    mapping (uint => address) ticketsSold;
    uint numTickets;
    uint private price;
    mapping (address => address) swapOffers;
    address public manager;
    
    // </contract_variables>

    
    constructor(uint numTickets, uint price) public {
        numTickets = numTickets;
        manager = msg.sender;
        price = price;
    }
    


    function buyTicket(uint ticketId) public payable {
        bool success;
        bytes memory data;
        require(ticketId >= 1 && ticketId <= numTickets); // valid identifier
        require (ticketsSold[ticketId] != address(0)); // not sold yet
        require(tickets[msg.sender] == 0); // no ticket
        require(msg.value == price); // correct amount of Ether
        (success, data)= owner.call{value: price}("");
        tickets[msg.sender] = ticketId;
        ticketsSold[ticketId] = msg.sender;

    }

    function getTicketOf(address person) public view returns (uint
    ) {
        return tickets[person];
    }

    function offerSwap(address partner) public {
        require(tickets[msg.sender] > 0); // sender has ticket
        require(tickets[partner] > 0);
        require(partner != msg.sender); // partner is not sender
        swapOffers[msg.sender] = partner;
    }

    function acceptSwap(address partner) public {
        require(tickets[msg.sender] > 0); // sender has a ticket
        require(swapOffers[partner] == msg.sender); // partner wants to swap with sender
        (tickets[msg.sender], tickets[partner]) = (tickets[partner], tickets[msg.sender]); // swap
        ticketsSold[tickets[msg.sender]] = msg.sender;
        ticketsSold[tickets[partner]] = partner;
        swapOffers[partner] = address(0);
    }

}
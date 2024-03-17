// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon{ //state variable
    address public owner;

    struct Item {
        uint256 _id; 
        string _name; 
        string _category;
        string _image;
        uint256 _cost;
        uint256 _rating;
        uint256 _stock;
    }

    mapping(uint256 => Item)public items;

    constructor(){
        owner = msg.sender; 
        //msg is global variable, we can see who is sending that transaction 
        //constructor func is called only once in smart contract
    }

    //List products

    function list(
        uint256 _id, 
        string memory _name, 
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock
    ) public { //public means anybody outside the smart contract can call this function

        //create item struct
        Item memory item = Item(
            _id, 
            _name, 
            _category, 
            _image, 
            _cost, 
            _rating, 
            _stock
        ); //Item -> data type(struct) & item -> variable name

        //save item struct to bc

    }
    //buy products

    //withdraw funds
}

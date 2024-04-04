// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

contract Dappazon{ 
    
    address public owner;

    struct item{
        uint256 id;
        string name;
        string category;
        string image;
        uint256 cost;
        uint256 rating;
        uint256 stock;
    }

    mapping(uint256 => Item) public items;
    /* uint256 is data type of key and value is going to be an item
    each item is going to get a unique id here with the key
    so we can put it into mapping 
    */

    constructor(){
        owner = msg.sender;
        //msg is global variable , used to see who has sent the transaction
    }

    //list product
    //buy product
    //withdraw fund

    //declare struct
    function list(
        uint256 _id,
        string memory _name,
        string memory _category,
        string memory _image,
        uint256 _cost,
        uint256 _rating,
        uint256 _stock) public{
            
            //create item struct
            Item memory item = Item(
                _id,
                _name,
                _category,
                _image,
                _cost,
                _rating,
                _stock
            );
            //here we are creating a new variable 'item' using data type 'Item' i.e is struct

            //save item struct to bc(using mapping)
            items[_id] = item;

        }

}
const { expect } = require("chai");
const { ethers } = require("hardhat");
const { getNamedAccounts } = require("hardhat")
require("@nomicfoundation/hardhat-ethers");

const tokens = (n) => {
  //console.log(ethers);
  return ethers.parseUnits(n.toString(), 'ether')
}

//global constants for listing an item
const ID = 1
const NAME = "Shoes"
const CATEGORY = "Clothing"
const IMAGE = "IMAGE"
const COST = tokens(1)
const RATING = 4
const STOCK = 3
    
 
describe("Dappazon", function() {
  let dappazon
  let deployer , buyer

  beforeEach(async() => {
    //deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy();

    //setup account
    [deployer , buyer] = await ethers.getSigners()
    //console.log(deployer , buyer)
    //console.log(deployer.address , buyer.address)
  })

  describe("Deployment", function(){
    it('Sets the owner', async() => {
      expect(await dappazon.owner()).to.equal(deployer.address)
    })
  })

  describe("Listing", function(){
    let transaction
    
    beforeEach(async() => {
      transaction = await dappazon.connect(deployer).list(     //calls list function
        ID,
        NAME,
        CATEGORY,
        IMAGE,
        COST,
        RATING,
        STOCK
      );
      await transaction.wait() //ensures that the transaction is completed before moving on.
    })

    it('Returns Item attribute', async() => {
      const item = await dappazon.items(ID)
      //This retrieves the item from the contract using its ID (1). The test expects that the item stored in the contract has an id of 1.
      expect(item.id).to.equal(ID)
      expect(item.name).to.equal(NAME)
      expect(item.category).to.equal(CATEGORY)
      expect(item.image).to.equal(IMAGE)
      expect(item.cost).to.equal(COST)
      expect(item.rating).to.equal(RATING)
      expect(item.stock).to.equal(STOCK)
    })

    
    it('Emits List Event', async() => {
      expect(transaction).to.emit(dappazon, "List")
    })
  })

  describe("Buying", function(){
    let transaction

    beforeEach(async() => {
      //list item
      transaction = await dappazon.connect(deployer).list(ID, NAME , CATEGORY , IMAGE , COST , RATING , STOCK);
      await transaction.wait();

      //buy item
      transaction = await dappazon.connect(buyer).buy(ID , {value : COST});
      await transaction.wait();

    })

    it('Updates contract balance', async() => {
      //console.log("Contract Address:", dappazon.target);
      const result = await ethers.provider.getBalance(dappazon.target);
      //console.log(result)
      expect(result).to.equal(COST);
    })

    it("Update buyer's order count" , async() => {
      const result = await dappazon.orderCount(buyer.address)
      expect(result).to.equal(1)
    })

    it('Adds the order', async() => {
      const order = await dappazon.orders(buyer.address, 1)
      expect(order.time).to.be.greaterThan(0);
      expect(order.item.name).to.equal(NAME);
    })

    it('Emit buy event', async() => {
      expect(transaction).to.emit(dappazon ,"Buy")
    })
    
  });
});


const {expect} = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(),'ether')
}

describe("Dappazon", () => {
  let dappazon
  let deployer , buyer

  beforeEach(async () => {

    //setup accounts 
    [deployer, buyer] = await ethers.getSigners() 
    /* .getSigners() is used for getting fake accounts in form of array
      first 2 accounts will be deployer and buyer*/
  
    console.log(deployer.address, buyer.address) //fetch addresses of 2
    console.log((await ethers.getSigners()).length) 

    //deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()
  })
  
  //we actually fetch a copy of smart contract with ether js library
  describe("Deployment", () => {

    it('sets the owner', async () => {
      expect(await dappazon.owner()).to.equal("deployer.address")
    })

    it('has a name', async () =>{ 
      const name = await dappazon.name()
      expect(name).to.equal("Dappazon")
    })
  })
  


  
})
const {expect} = require("chai")

const tokens = (n) => {
  return ethers.utils.parseUnits(n.toString(),'ether')
}

describe("Dappazon", () => {
  let dappazon;
  let deployer , buyer

  beforeEach(async () => {
    //setup account
    [deployer, buyer] = await ethers.getSigners() //getting fake accounts
    console.log(deployer.address, buyer.address)
    console.log((await ethers.getSigners()).length)
    //deploy contract
    const Dappazon = await ethers.getContractFactory("Dappazon")
    dappazon = await Dappazon.deploy()

  })

  describe("Deployment", () => {
    it("Sets the owner", async() =>{
      expect(await dappazon.owner()).to.equal(deployer.address)
    })
    
    
  })

  
})
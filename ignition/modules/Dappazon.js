const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");
const { items } = require("../../src/items.json");

const tokens = (n) => {
  return ethers.parseUnits(n.toString(), 'ether');
};

module.exports = buildModule("Dappazon", (m) => {
  // Deploy the Dappazon contract
  const dappazon = m.contract("Dappazon");

  // List items after deployment
  items.forEach((item, index) => {
    m.call(dappazon, "list", [
      item.id,
      item.name,
      item.category,
      item.image,
      tokens(item.price),
      item.rating,
      item.stock,
    ], { id: `listItem_${item.id}` });
    
    console.log(`Listed item ${item.id}: ${item.name}`)
  });

  return { dappazon };
});

//npx hardhat ignition deploy ignition/modules/Dappazon.js --network localhost

/*
  const Dappazon = await ethers.getContractFactory("Dappazon")
  const dappazon = await Dappazon.deploy();
  await dappazon.deployed()

  console.log(`Deployed Dappazon Contract at: ${dappazon.address}\n`)

  //List items
  for(let i = 0 ; i<items.length; i++){
    const transaction = await dappazon.connect(deployer).list(
      items[i].id,
      items[i].name,
      items[i].category,
      items[i].image,
      tokens(items[i].price),
      items[i].rating,
      items[i].stock,
    )

    await transaction.wait()
    console.log(`Listed item ${items[i].id}: ${items[i].name}`)
  }
  
*/
  






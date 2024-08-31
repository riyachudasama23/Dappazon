import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { BrowserProvider } from 'ethers';
import Navigation from './components/Navigation';
import Section from './components/Section';
import Product from './components/Product';

//ABIs
import Dappazon from './abis/Dappazon.json';

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)
  const [dappazon, setDappazon] = useState(null)
  
  const [electronics, setElectronics] = useState(null)
  const [clothing, setClothing] = useState(null)
  const [toys, setToys] = useState(null)

  const [item, setItem] = useState({})
  const [toggle, setToggle] = useState(false)

  const togglePop = (item) => {
    setItem(item)  
    toggle ? setToggle(false) : setToggle(true)
  }

  const loadBlockchainData = async() => {

    //connect to bc
    const provider = new BrowserProvider(window.ethereum) //takes our metamask connection
    setProvider(provider)

    const network = await provider.getNetwork()
    console.log("Network Chain ID:", network);
    // const network = await provider.getChainId();  // Use getChainId() in v6

    
    //connect to smart contract(create js version)
    const dappazon = new ethers.Contract( 
      "0x5FbDB2315678afecb367f032d93F642f64180aa3" , 
      Dappazon , 
      provider
    )
    setDappazon(dappazon)

    //load products
    const items = []

    for(var i = 0; i<9 ; i++){
      const item = await dappazon.items(i+1)
      items.push(item)
    }

    console.log(items)

    const electronics = items.filter((item) => item.category === 'electronics')
    const clothing = items.filter((item) => item.category === 'clothing')
    const toys = items.filter((item) => item.category === 'toys')

    setElectronics(electronics)
    setClothing(clothing)
    setToys(toys)
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">

      <Navigation account= {account} setAccount={setAccount} />

      <h2>Dappazon Best Sellers</h2>

      {electronics && clothing && toys &&(
        <>
          <Section title={"Clothing & Jewelry"} items={clothing} togglePop={togglePop}></Section>
          <Section title={"Electronics & Gadgets"} items={electronics} togglePop={togglePop}></Section>
          <Section title={"Toys & Gaming"} items={toys} togglePop={togglePop}></Section>
        </>
      )}

      {toggle && (
        <Product item={item} provider={provider} account={account} dappazon={dappazon} togglePop={togglePop} />
      )}
    </div>
  );
}

export default App;

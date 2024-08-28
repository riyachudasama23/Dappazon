import './App.css';
import { useEffect, useState } from 'react';
//import { ethers } from 'ethers';
import {ethers} from 'hardhat';
import Navigation from './components/Navigation';

function App() {

  const [account, setAccount] = useState(null)
  const [provider, setProvider] = useState(null)


  const loadBlockchainData = async() => {
    //connect to bc
    const provider = new ethers.providers.Web3Provider(window.ethereum) //takes our metamask connection
    setProvider(provider)

    // const network = await provider.getNetwork()
    // console.log(network)

    
    //connect to smart contract

    //load products
    console.log("loading...")
  }

  useEffect(() => {
    loadBlockchainData(
      
    )
  }, [])

  return (
    <div className="App">
      <Navigation account= {account} setAccount={setAccount} />
      <h2>
        Dappazon Best Sellers
      </h2>
    </div>
  );
}

export default App;

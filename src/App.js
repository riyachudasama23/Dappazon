import './App.css';
import { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import Navigation from './components/Navigation';

function App() {

  const [account, setAccount] = useState(null)

  const loadBlockchainData = async() => {
    
    console.log("loading...")
  }

  useEffect(() => {
    loadBlockchainData()
  }, [])

  return (
    <div className="App">
      <Navigation account= {account} setAccount={setAccount} />
      <h2>
        Welcome to Dappazon
      </h2>
    </div>
  );
}

export default App;

import './App.css';
import HomePage from "./components/HomePage";
import NewLand from "./components/NewLand";
import Auction from "./components/Auction";
import {ethers} from "ethers";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import abi from "./contractArtifacts/LandSale.json";
import { useEffect, useState } from 'react';

function App() {

  const [state,setState]=useState({
    provider:null,
    signer:null,
    contract:null
  })
  const [currentAccount,setCurrentAccount] = useState("")

  useEffect(()=>
  {
    const connectWallet=async()=>{
      const contractAddress=abi.address;
      const contractABI=abi.abi;

      try
      {
        const ethereum=window.ethereum
        if(ethereum)
          {
            const account=await ethereum.request({method:"eth_requestAccounts"})
            setCurrentAccount(account)
          }
          const provider = new ethers.BrowserProvider(ethereum);
          const signer = await provider.getSigner() 
          const contract = new ethers.Contract(contractAddress, contractABI,signer)

          setState({provider,signer,contract})
      }catch(err)
      {
        console.log(err)
      }
     
    }
    connectWallet()
  },[])


  // console.log(contractAddress,contractABI)
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<HomePage state={state}/>} />
          <Route path="/register" element={<NewLand state={state}/>} />
          <Route path="/land/:landId" element={<Auction state={state}/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

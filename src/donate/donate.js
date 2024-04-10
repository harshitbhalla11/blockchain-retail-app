import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './donate.css';
import axios from 'axios';  
import { donateContractAddress, donateABI } from '../myTokenABI';
import Web3 from 'web3';

function DonateCrypto() {
  const [cryptoAmount, setCryptoAmount] = useState(0);
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [cryptoData, setCryptoData] = useState({});
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState(null);
  const [contract, setContract] = useState(null);


  useEffect(() => {
    async function initWeb3() {
      // Check if Web3 is injected by the browser
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          // Request account access if needed
          await window.ethereum.enable();
          // Get the current account
          const accounts = await web3Instance.eth.getAccounts();
          console.log(accounts)
          setAccount(accounts[0]);
          // Instantiate the contract
          const contractInstance = new web3Instance.eth.Contract(
            donateABI,
            donateContractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('Web3 not detected. Please install MetaMask or use a Web3-enabled browser');
      }
    }
    const fetchData = async () => {
      try {

        const cryptoResponse = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum,bitcoin,polygon,ripple&vs_currencies=usd'
        );
         localStorage.setItem('ethusd', JSON.stringify(cryptoResponse.data.ethereum.usd));
        console.log(cryptoResponse.data);
        setCryptoData(cryptoResponse.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    
    fetchData();
    initWeb3();
  }, []);


  const handleCryptoAmountChange = (event) => {
    setCryptoAmount(event.target.value);
    console.log(cryptoData.ethereum.usd)
    if(event.target.value === ''){
      setConvertedAmount(0);}
    else
    setConvertedAmount(parseInt(event.target.value) * parseFloat(cryptoData.ethereum.usd))
  };

  const handleDonate = async() => {
    if (contract && window.confirm(`Are you sure you want to donate ${cryptoAmount} ETH to Meta store?`)) {
     console.log("money sent")

     try {
      await contract.methods.deposit().send({from: account, value:web3.utils.toWei(cryptoAmount.toString(), 'ether')});
      alert('ETH sent successful thanks for donating!');
      
       } catch (error) {
      console.error('Error in withdrawing:', error);
      alert('Error in withdrawing.');
    }

    }
    else if (account === null){
      alert(`Please enter the amount to donate`);
    }
    else {
      alert(`Please connect your wallet`);  
    }
  };

  return (
    <div className="container mt-5">
       <div className='row'>
          <div className='col-8'>
          <h2 className="mb-4 custom-font heading-font">Donate Crypto</h2>                  
     
     <p className='custom-font'>Thank you for considering donating cryptocurrency to support our cause! Your contribution will make a real difference.</p>
     <p className='custom-font'>Your donation will help us provide clothing to those in need.</p>
     <p className='custom-font'>Please fill out the form below to make your donation:</p>
          </div>
          <div className='col-4'>
          <img className="donate-image" src="/images/donate.png" alt="" />
          </div>
      </div>
     
      <Form>
        <div className='mb-5'>
        <button onClick={(e)=>{ e.preventDefault();  setCryptoAmount(parseFloat(cryptoAmount)+0.05)}} className='amount-button'>0.05</button>
        <button onClick={(e)=>{ e.preventDefault();  setCryptoAmount(parseFloat(cryptoAmount)+0.10)}} className='amount-button'>0.10</button>
        <button onClick={(e)=>{ e.preventDefault();  setCryptoAmount(parseFloat(cryptoAmount)+0.25)}} className='amount-button'>0.25</button>
        <button onClick={(e)=>{ e.preventDefault();  setCryptoAmount(parseFloat(cryptoAmount)+1); setConvertedAmount(parseFloat(cryptoAmount)*parseFloat(cryptoData.ethereum.usd))}} className='amount-button'>1</button>

        </div>
 


        <Form.Group controlId="cryptoAmount">
          <Form.Label>Amount in ETH <img src="images/eth-token.png"alt='' className='eth-token'/> </Form.Label>
          <Form.Control
            type="number"
            value={cryptoAmount}
            onChange={handleCryptoAmountChange}
            className='input-eth'
          />
         {
         convertedAmount && convertedAmount>0 ? <span className='eth-label'>{convertedAmount} USD </span>   :'' 
          }   
 </Form.Group>
         
        <Form.Group controlId="userWalletAddress">
          <Form.Label className='mt-2'>Your Wallet Address:</Form.Label>
          <Form.Control
            type="text"
            value={account || 'Please connect your wallet'}
            disabled
          />
        </Form.Group>
        <Button variant="primary" className='mt-4' onClick={handleDonate}>Donate</Button>
      </Form>
    </div>
  );
}

export default DonateCrypto;

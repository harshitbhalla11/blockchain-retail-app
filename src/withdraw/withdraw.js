import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3 library
import myTokenABI from '../myTokenABI';
import './withdraw.css';

function Withdraw() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);

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
          setAccount(accounts[0]);
          // Instantiate the contract
          const contractInstance = new web3Instance.eth.Contract(
            myTokenABI,
            '0x0c4259d0f051e41bb96c4501134a88ab7c7510e6' 
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('Web3 not detected. Please install MetaMask or use a Web3-enabled browser');
      }
    }

    initWeb3();
  }, []);

  useEffect(() => {
    async function getBalance() {
      if (web3 && contract && account) {
        try {
          // Call the balanceOf function of the contract
          const balanceInWei = await contract.methods.balanceOf('0x59f3698b749D30F40Bf33Fbd84c166b69248cBBb').call();
          // Convert balance from wei to MST
          const balanceInMST = web3.utils.fromWei(balanceInWei.toString(), 'ether'); // Ensure balanceInWei is string
          // const convertedBalance = balanceInMST / 1e12; // Convert balance to MST
          setBalance(balanceInMST);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }

    getBalance();
  }, [web3, contract, account]);
  return (
    <div className="App">
      <header className="App-header">
        <h1>My Token Balance</h1>
        {balance !== null ? (
          <p>Your balance: {balance} MST</p>
        ) : (
          <p>Loading balance...</p>
        )}
      </header>
    </div>
  );
}

export default Withdraw;

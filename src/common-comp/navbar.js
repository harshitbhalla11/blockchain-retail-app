import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import './navbar.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Navbar() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);

          // Get the current account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Subscribe to account change
          window.ethereum.on('accountsChanged', function (accounts) {
            setAccount(accounts[0]);
          });

          // Fetch balance
          const weiBalance = await web3Instance.eth.getBalance(accounts[0]);
          const etherBalance = web3Instance.utils.fromWei(weiBalance, 'ether');
          setBalance(etherBalance);
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Please install MetaMask to use this dApp!');
      }
    };

    initWeb3();
  }, []);

  const handleLoginClick = async () => {
    if (window.ethereum) {
      try {
        // Request account access
        await window.ethereum.enable();
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0]);
      } catch (error) {
        console.error('Error connecting MetaMask:', error);
      }
    } else {
      console.log('MetaMask not detected.');
    }
  };

  const handleDisconnectClick = async () => {
    if (window.ethereum) {
      try {
        // Disconnect the wallet
        await window.ethereum.request({ method: 'wallet_requestPermissions', params: [{ eth_accounts: {} }] });
        setAccount('');
        setBalance(0);
      } catch (error) {
        console.error('Error disconnecting MetaMask:', error);
      }
    } else {
      console.log('MetaMask not detected.');
    }
  };

  return (
    <div className="App">
      <nav className="navbar bg-body-tertiary">
        <div className="container-fluid">
          <a className="navbar-brand">Navbar</a>
          <p className="text">Connected Account: {account}</p>
          <p className="text">Balance: {balance} ETH</p>
          {!account ? (
            <button className="btn btn-outline-success" onClick={handleLoginClick}>Connect </button>
          ) : (
            <button className="btn btn-outline-danger" onClick={handleDisconnectClick}>Disconnect </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Navbar;

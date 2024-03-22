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
    <div>
    <div>
      {account && (
        <div className="row address-nav">
          <p className="col-8 text-center nav-items">Connected Account: <strong className='font-weight-bold'>{account}</strong></p>
          <p className="col-4 text-center nav-items">Balance: <strong>{balance} ETH</strong></p>
        </div>
      )}
  
      <nav className="navbar navbar-light bg-white">
        <div className="container-fluid">
          <a className="navbar-brand" href='/'><img className="logo-img" src="/images/logo.png" alt="" /><span className='meta-logo'>Meta Store</span></a>
          <div className="d-flex align-items-center">
            {account && (
              <button className="btn btn-outline-primary me-2 ms-auto"> <img className="wallet-img" src="/images/cart.gif" alt="" />Cart</button>
            )}
            {!account ? (
              <button className="btn btn-outline-success" onClick={handleLoginClick}>
                <img className="wallet-img" src="/images/icon.gif" alt="" />
                Connect
              </button>
            ) : (
              <button className="btn btn-outline-danger" onClick={handleDisconnectClick}>
                <img className="wallet-img" src="/images/icon.gif" alt="" />
                Disconnect
              </button>
            )}
          </div>
        </div>
      </nav>
    </div>
  </div>
  
  );
}

export default Navbar;

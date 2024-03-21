import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import Navbar from './common-comp/navbar';
import Footer from './common-comp/footer';
import AppRoutes from './Routes';

function App() {
  const [web3, setWeb3] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const initWeb3 = async () => {
      if (window.ethereum) {
        try {
          // Request account access if needed
          await window.ethereum.enable();
          const web3Instance = new Web3(window.ethereum);
          setWeb3(web3Instance);

          // Get the current account
          const accounts = await web3Instance.eth.getAccounts();
          setAccount(accounts[0]);

          // Subscribe to account change
          window.ethereum.on('accountsChanged', function (accounts) {
            setAccount(accounts[0]);
          });
        } catch (error) {
          console.error(error);
        }
      } else {
        console.log('Please install MetaMask to use this dApp!');
      }
    };

    initWeb3();
  }, []);

  useEffect(() => {
    const fetchBalance = async () => {
      if (web3 && account) {
        const weiBalance = await web3.eth.getBalance(account);
        const etherBalance = web3.utils.fromWei(weiBalance, 'ether');
        setBalance(etherBalance);
      }
    };

    fetchBalance();
  }, [web3, account]);

  return (
    <div>
      <AppRoutes />

      <Navbar />
      <h1>Metamask Balance Viewer</h1>
      <p>Connected Account: {account}</p>
      <p>Balance: {balance} ETH</p>
      <Footer/>

    </div>
  );
}

export default App;

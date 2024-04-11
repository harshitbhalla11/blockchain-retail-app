import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; 
import { myTokenABI, contractAddress } from '../myTokenABI';
import './withdraw.css';

function Withdraw() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [maxWithdrawAmount, setMaxWithdrawAmount] = useState(0);

  useEffect(() => {
    async function initWeb3() {
      if (window.ethereum) {
        const web3Instance = new Web3(window.ethereum);
        setWeb3(web3Instance);
        try {
          await window.ethereum.enable();
          const accounts = await web3Instance.eth.getAccounts();
          console.log(accounts)
          setAccount(accounts[0]);
          const contractInstance = new web3Instance.eth.Contract(
            myTokenABI,
            contractAddress
          );
          setContract(contractInstance);
        } catch (error) {
          console.error('User denied account access');
        }
      } else {
        console.error('No wallet detected. Please install MetaMask.');
      }
    }

    initWeb3();
  }, []);

  useEffect(() => {
    async function getBalance() {
      if (web3 && contract && account) {
        try {
          const balanceInWei = await contract.methods.balanceOf(account).call();
          const balanceInMST = web3.utils.fromWei(balanceInWei, 'ether');
          const balanceInMSTNumeric = parseFloat(balanceInMST);
          setBalance(balanceInMSTNumeric);
          const maxWithdraw = localStorage.getItem('tokenBalance');
          setMaxWithdrawAmount(maxWithdraw ? parseFloat(maxWithdraw) : 0);
        } catch (error) {
          console.error('Error fetching balance:', error);
        }
      }
    }

    getBalance();
  }, [web3, contract, account]);

  const handleWithdraw = async () => {
    if (!withdrawAmount || isNaN(withdrawAmount) || withdrawAmount <= 0) {
      alert('Please enter a valid amount to withdraw.');
      return;
    }
    if (parseFloat(withdrawAmount) > maxWithdrawAmount) {
      alert('Withdraw amount exceeds maximum withdrawable amount.');
      return;
    }
    try {
      await contract.methods.transfer(account, web3.utils.toWei(withdrawAmount.toString(), 'ether')).send({ from: account });
      alert('Withdraw successful!');
      setWithdrawAmount('');
      let updatedBalance = maxWithdrawAmount - withdrawAmount;
      localStorage.setItem('tokenBalance', updatedBalance.toString());
      setMaxWithdrawAmount(updatedBalance);
    } catch (error) {
      console.error('Error in withdrawing:', error);
      alert('Error in withdrawing.');
    }
  };

  return (
    <div className="container ">
      <header className="App-header">
      <h1 className='heading custom-font-cart'>Withdraw your Tokens</h1>
          <div className='row withdraw-container'>
            <div className='col-6 d-flex justify-content-center align-items-center '>
           
              {balance !== null ? (
                <div>
                  <img src='images/wallet-balance.png' width={70} alt='' />
                  <p>Your Wallet Balance:<span className='tokenbalance'> {balance} MST</span> </p>
                  <p>Available Amount to Withdraw: <span className='tokenbalance'> {maxWithdrawAmount} MST</span> </p>
                  <form>
                    <div className="input-group mb-3">
                      <input
                        type="number"
                        className="form-control withdraw-input"
                        placeholder="Enter amount to withdraw"
                        aria-label="Enter amount to withdraw"
                        aria-describedby="basic-addon2"
                        value={withdrawAmount}
                        onChange={(e) => setWithdrawAmount(e.target.value)}
                      />
                      <div className="input-group-append">
                        <button className="btn btn-primary" type="button" onClick={handleWithdraw}>Withdraw</button>
                      </div>
                    </div>

                  </form>

                </div>
              ) : (
                <p>Loading balance...</p>
              )}
            </div>
            <div className='col-6 withdraw-right d-flex justify-content-center align-items-center'>  
                <img className="eth-image" src='images/eth.gif' alt=''/>
            </div>
          </div>
      </header>
    </div>
  );
}

export default Withdraw;

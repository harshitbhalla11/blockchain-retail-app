import React, { useState, useEffect } from 'react';
import Web3 from 'web3'; // Import web3 library
import { myTokenABI, contractAddress } from '../myTokenABI';
import './withdraw.css';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Withdraw() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState(null);
  const [balance, setBalance] = useState(null);
  const [withdrawAmount, setWithdrawAmount] = useState('');
  const [maxWithdrawAmount, setMaxWithdrawAmount] = useState(0);

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
            myTokenABI,
            contractAddress
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
          const balanceInWei = await contract.methods.balanceOf(account).call();
          // Convert balance from wei to MS
          const balanceInMST = web3.utils.fromWei(balanceInWei, 'ether');
          const balanceInMSTNumeric = parseFloat(balanceInMST);
          setBalance(balanceInMSTNumeric);
          // Retrieve maximum withdrawable amount from local storage
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
      let contractAddress = "0x59f3698b749D30F40Bf33Fbd84c166b69248cBBb"
      await contract.methods.transfer(account, web3.utils.toWei(withdrawAmount.toString(), 'ether')).send({ from: account });
      alert('Withdraw successful!');
      setWithdrawAmount('');
      let updatedBalance = maxWithdrawAmount - withdrawAmount;
      localStorage.setItem('tokenBalance', updatedBalance.toString());
      setMaxWithdrawAmount(updatedBalance);
      // You may want to refresh balance here
    } catch (error) {
      console.error('Error in withdrawing:', error);
      alert('Error in withdrawing.');
    }
  };

  return (
    <div className="withdraw-container">
      <header className="App-header">
      
          <Row>
            <Col>
              <h1>MSOT Token Balance</h1>
              {balance !== null ? (
                <div>
                  <p><img src='images/wallet-balance.png' width={70} alt='' />Your MSOT Balance:<span className='tokenbalance'> {balance} MST</span> </p>
                  <p>Available Amount to Withdraw: <span className='tokenbalance'> {maxWithdrawAmount} MST</span> </p>
                  <Form>
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

                  </Form>

                </div>
              ) : (
                <p>Loading balance...</p>
              )}
            </Col>
          </Row>
      </header>
    </div>
  );
}

export default Withdraw;

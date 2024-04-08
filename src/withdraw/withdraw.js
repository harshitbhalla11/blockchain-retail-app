import React, { useState, useEffect } from 'react';
import web3 from 'web3';
import myTokenABI from '../myABI-token';

const WithdrawTokens = ({ account }) => {
  const [withdrawalAmount, setWithdrawalAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [tokenBalance, setTokenBalance] = useState(0);
  const [contract, setContract] = useState(null);

  useEffect(() => {
    const initContract = async () => {
      // Initialize web3
      const ethereum = window.ethereum;
      const web3Instance = new web3(ethereum);

      // Set contract instance
      const contractAddress = '0x59f3698b749D30F40Bf33Fbd84c166b69248cBBb'; 
      const contractInstance = new web3Instance.eth.Contract(myTokenABI, contractAddress);
      setContract(contractInstance);

      // Fetch token balance from local storage
      const storedBalance = localStorage.getItem('tokenBalance');
      if (storedBalance) {
        setTokenBalance(parseInt(storedBalance));
      } else {
        // If token balance not found in local storage, fetch from contract
        const balance = await contractInstance.methods.balanceOf(account).call();
        setTokenBalance(balance);
        localStorage.setItem('tokenBalance', balance);
      }
    };

    initContract();
  }, [account]);

  const handleWithdrawal = async () => {
    try {
      setLoading(true);
      setError(null);

      // Convert withdrawal amount to Wei
      const amountWei = web3.utils.toWei(withdrawalAmount, 'ether');
      
      // Validate withdrawal amount against token balance
      if (parseInt(amountWei) > tokenBalance) {
        throw new Error('Withdrawal amount exceeds token balance');
      }

      // Call the contract's transfer function to send tokens to the user's wallet
      await contract.methods.transfer(account, amountWei).send({ from: account });

      // Transaction successful, show success message
      setSuccessMessage('Tokens withdrawn successfully.');
      
      // Update token balance after withdrawal
      const updatedBalance = await contract.methods.balanceOf(account).call();
      setTokenBalance(updatedBalance);
      localStorage.setItem('tokenBalance', updatedBalance);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
      setError('Failed to withdraw tokens. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Withdraw Tokens</h2>
      <p>Available Balance: {tokenBalance}</p>
      <inp  ut
        
        type="number"
        placeholder="Enter withdrawal amount"
        value={withdrawalAmount}
        onChange={(e) => setWithdrawalAmount(e.target.value)}
      />
      <button onClick={handleWithdrawal} disabled={loading}>
        Withdraw
      </button>
      {loading && <p>Loading...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
    </div>
  );
};

export default WithdrawTokens;

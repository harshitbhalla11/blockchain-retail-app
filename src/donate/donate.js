import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import './donate.css';
function DonateCrypto() {
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [userWalletAddress, setUserWalletAddress] = useState('');
  const fixedAddress = '0x59f3698b749D30F40Bf33Fbd84c166b69248cBBb'; 

  useEffect(() => {
    const fetchSenderAddress = () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        setUserWalletAddress(window.ethereum.selectedAddress);
      } else {
        console.error('MetaMask not detected or not connected.');
      }
    };
    fetchSenderAddress();
  }, []);

  const handleCryptoAmountChange = (event) => {
    setCryptoAmount(event.target.value);
  };

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleDonate = () => {
    if (userWalletAddress) {
      console.log(`Donating ${cryptoAmount} ${selectedCrypto} to address: ${fixedAddress}`);
      setCryptoAmount('');
    } else {
      alert('Please connect your wallet to donate.');
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
        <Form.Group controlId="cryptoAmount">
          <Form.Label>Amount:</Form.Label>
          <Form.Control
            type="number"
            value={cryptoAmount}
            onChange={handleCryptoAmountChange}
          />
        </Form.Group>
        <Form.Group controlId="cryptoSelect">
          <Form.Label>Select Crypto:</Form.Label>
          <Form.Control
            as="select"
            value={selectedCrypto}
            onChange={handleCryptoChange}
          >
            <option value="BTC">Bitcoin (BTC)</option>
            <option value="ETH">Ethereum (ETH)</option>
            <option value="XRP">Ripple (XRP)</option>
            <option value="SAP">Sapolia Ethereum (SAP)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="userWalletAddress">
          <Form.Label className='mt-2'>Your Wallet Address:</Form.Label>
          <Form.Control
            type="text"
            value={userWalletAddress || 'Please connect your wallet'}
            disabled
          />
        </Form.Group>
        <Form.Group controlId="recipientAddress">
          <Form.Label className='my-2'>Recipient Address:</Form.Label>
          <Form.Control
            type="text"
            value={fixedAddress}
            disabled
          />
        </Form.Group>
        <Button variant="primary" className='mt-2' onClick={handleDonate}>Donate</Button>
      </Form>
    </div>
  );
}

export default DonateCrypto;

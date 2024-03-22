import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

function DonateCrypto() {
  const [cryptoAmount, setCryptoAmount] = useState('');
  const [selectedCrypto, setSelectedCrypto] = useState('BTC');
  const [recipientAddress, setRecipientAddress] = useState('');

  const handleCryptoAmountChange = (event) => {
    setCryptoAmount(event.target.value);
  };

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  const handleDonate = () => {
    // Here you can implement the logic to handle the donation
    console.log(`Donating ${cryptoAmount} ${selectedCrypto} to address: ${recipientAddress}`);
    // Reset form fields after donation
    setCryptoAmount('');
    setRecipientAddress('');
  };

  const fetchSenderAddress = () => {
    if (window.ethereum && window.ethereum.selectedAddress) {
      setRecipientAddress(window.ethereum.selectedAddress);
    } else {
      console.error('MetaMask not detected or not connected.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Donate Crypto</h2>
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
            <option value="XRP">Sapolia Ethereum (ETH)</option>
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="recipientAddress">
          <Form.Label>Recipient Address:</Form.Label>
          <Form.Control
            type="text"
            value={recipientAddress}
            onChange={(e) => setRecipientAddress(e.target.value)}
          />
          <Button variant="secondary" onClick={fetchSenderAddress}>Use My MetaMask Address</Button>
        </Form.Group>
        <Button variant="primary" onClick={handleDonate}>Donate</Button>
      </Form>
    </div>
  );
}

export default DonateCrypto;

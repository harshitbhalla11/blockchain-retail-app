import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [cryptoData, setCryptoData] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch product data
        const productsResponse = await fetch('https://dummyjson.com/products');
        const productsData = await productsResponse.json();
        setProducts(productsData.products);

        // Fetch cryptocurrency prices
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum,bitcoin,polygon,ripple&vs_currencies=usd'
        );
        setCryptoData(response.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event.target.value);
  };

  return (
    <Container>
      <h1 className="mt-5 mb-3">Products</h1>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.thumbnail} alt={product.title} />
              <Card.Body>
                <Card.Title>{product.title}</Card.Title>
                <Card.Text>{product.description}</Card.Text>
                <Card.Text>Price: ${product.price}</Card.Text>
                <Card.Text>Rating: {product.rating}</Card.Text>
                <Card.Text>Stock: {product.stock}</Card.Text>
                <Card.Text>Brand: {product.brand}</Card.Text>
                <Card.Text>Category: {product.category}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <div>
        <h2>Select a Cryptocurrency</h2>
        <select onChange={handleCryptoChange}>
          <option value="">-- Select --</option>
          {Object.keys(cryptoData).map(crypto => (
            <option key={crypto} value={crypto}>
              {crypto}
            </option>
          ))}
        </select>
      </div>
      {selectedCrypto && (
        <p>Price of {selectedCrypto}: ${cryptoData[selectedCrypto].usd}</p>
      )}
    </Container>
  );
};

export default Products;

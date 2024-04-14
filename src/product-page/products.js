import React, { useState, useEffect } from 'react';
import { Card, Container, Row, Col, Button, Dropdown } from 'react-bootstrap';
import axios from 'axios';
import './products.css'
import productsData from './products.json';
import { useCart } from '../context/CartContext';

const Products = () => {
  const { addToCart } = useCart();

  const [products, setProducts] = useState(productsData);
  const [cryptoData, setCryptoData] = useState({});
  const [selectedCrypto, setSelectedCrypto] = useState('');
  const [cartItems,SetCartItems]=useState(localStorage.getItem('cartItems')||[])

  useEffect(() => {
    const fetchData = async () => {
      try {

        const cryptoResponse = await axios.get(
          'https://api.coingecko.com/api/v3/simple/price?ids=solana,ethereum,bitcoin,polygon,ripple&vs_currencies=usd'
        );
         localStorage.setItem('ethusd', JSON.stringify(cryptoResponse.data.ethereum.usd));
        console.log(cryptoResponse.data);
        setCryptoData(cryptoResponse.data);
       
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleCryptoChange = (event) => {
    setSelectedCrypto(event);
  };

  const getUSDValue =(selected) =>{
    return cryptoData[selected].usd;
  }

  const handleAddToCart = (product_id) => {
    addToCart();
    console.log("added",product_id)
    const existingCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    
    const updatedCartItems = [...existingCartItems,product_id ];
    
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
    SetCartItems(updatedCartItems)
  };

  return (
  
    <Container>
      <Row className="align-items-center my-5">
        <h1 className="col-4 d-flex align-items-center">Products</h1>
        <div className="col-8 text-end">
          <h2>Select a Cryptocurrency</h2>
          <Dropdown onSelect={handleCryptoChange}>
            <Dropdown.Toggle variant="secondary" id="dropdown-basic">
              Choose Crypto
            </Dropdown.Toggle>
            <Dropdown.Menu>
              {Object.keys(cryptoData).map(crypto => (
                <Dropdown.Item key={crypto} eventKey={crypto}>
                  {crypto}
                </Dropdown.Item>
              ))}
            </Dropdown.Menu>
          </Dropdown>
        </div>
        {selectedCrypto && (
          <p>Price of {selectedCrypto}: ${cryptoData[selectedCrypto].usd}</p>
        )}
      </Row>
      <Row>
        {products.map(product => (
          <Col key={product.id} sm={6} md={4} lg={3} className="mb-3">
            <Card>
              <Card.Img variant="top" src={product.images[1]} alt={product.title} />
              <Card.Body className='card-body-container'>
                <Card.Text>Price: {selectedCrypto? selectedCrypto.substring(0, 3).toUpperCase() : '$'}<span className="product-price">{selectedCrypto ? (product.price / getUSDValue(selectedCrypto)).toFixed(8) : product.price}</span></Card.Text>

                <Card.Title>{product.title}</Card.Title>
                <Button className='button-cart' variant="outline-success" onClick={()=>handleAddToCart(product.id)}>Add to cart</Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>


    </Container>
  );
};

export default Products;

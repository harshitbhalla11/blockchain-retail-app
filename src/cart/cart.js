import React, { useEffect, useState } from 'react';
import productsData from '../product-page/products.json';
import './cart.css';

const Cart=()=> {
  let ethPrice;
  const [cartItems, setCartItems] = useState([
    // { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    // { id: 2, name: 'Product 2', price: 20, quantity: 2 },
    // { id: 3, name: 'Product 3', price: 30, quantity: 1 },
  ]);

  // Function to remove an item from the cart
  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
  };

  // Function to update the quantity of an item in the cart
  const updateQuantity = (id, quantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
  };

  // Calculate total price of items in the cart
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);

  useEffect(()=>{
    const storedProductIds = JSON.parse(localStorage.getItem('cartItems')) || [];
    ethPrice = localStorage.getItem('ethusd');
    const filteredProducts = productsData.filter(product => storedProductIds.includes(product.id));
    setCartItems(filteredProducts);
  },[])

  const decrementQuantity= (productId) =>{
    setCartItems(prevProducts =>
      prevProducts.map(product =>
        product.id === productId && product.qty > 1
          ? { ...product, qty: product.qty - 1 }
          : product
      )
    );
  }

  const incrementQuantity = (productId) => {
    setCartItems(prevProducts =>
      prevProducts.map(product =>
        product.id === productId
          ? { ...product, qty: product.qty + 1 }
          : product
      )
    );
  }

  const removeItem = (id) =>{
    const updatedCart = cartItems.filter(item => item.id !== id);
    setCartItems(updatedCart);
    let temp = JSON.parse(localStorage.getItem('cartItems'));
    localStorage.setItem('cartItems', JSON.stringify(temp.filter(item=> item !== id)));
  }

  const getEthPrice = () => {
    return localStorage.getItem('ethusd');
  }

  return (
    <div className='container'>
      <div className='d-flex justify-content-between'>
      <h2>Shopping Cart</h2>
      <button className="btn btn-success ">Proceed to Buy</button>
      </div>

      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul className="cart-list">
        {cartItems.map(product => (
          <li key={product.id} className="cart-item">
            <img src={product.images[0]} alt={product.title} className="product-image" />
            <div className="product-details">
              <h3>{product.title}</h3>
              <p>Price: ETH {(product.price/getEthPrice()).toFixed(6)} (${product.price}) </p>
              <div className='buttons'>
              <div className="quantity-controls">
                <button className='quantity-button' onClick={() => decrementQuantity(product.id)}>-</button>
                <span  className='quantity'>{product.qty}</span>
                <button  className='quantity-button' onClick={() => incrementQuantity(product.id)}>+</button>
              </div>
              <button className="remove-button" onClick={()=> removeItem(product.id)}>Remove</button>
              </div>
            </div>
          </li>
        ))}
      </ul>
      )}
      <p>Total Price: ETH {(totalPrice/getEthPrice()).toFixed(6)}  (${totalPrice})</p>
     
   
    </div>
  );
}

export default Cart;

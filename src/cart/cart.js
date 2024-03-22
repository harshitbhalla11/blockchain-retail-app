import React, { useState } from 'react';

const Cart=()=> {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Product 1', price: 10, quantity: 1 },
    { id: 2, name: 'Product 2', price: 20, quantity: 2 },
    { id: 3, name: 'Product 3', price: 30, quantity: 1 },
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
  const totalPrice = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <ul>
          {cartItems.map(item => (
            <li key={item.id}>
              <span>{item.name}</span>
              <span>Price: ${item.price}</span>
              <span>Quantity: 
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                  min="1"
                />
              </span>
              <button onClick={() => removeFromCart(item.id)}>Remove</button>
            </li>
          ))}
        </ul>
      )}
      <p>Total Price: ${totalPrice}</p>
    </div>
  );
}

export default Cart;

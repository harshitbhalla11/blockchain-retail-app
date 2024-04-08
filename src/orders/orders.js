import React, { useState, useEffect } from 'react';

const MyOrders = () => {
  // State to store orders
  const [orders, setOrders] = useState([]);

  // Simulated fetch of orders
  useEffect(() => {
    // Simulated data
    const fetchedOrders = [
      { id: 1, product: 'Product A', quantity: 2 },
      { id: 2, product: 'Product B', quantity: 1 },
      { id: 3, product: 'Product C', quantity: 3 }
    ];
    // Update state with fetched orders
    setOrders(fetchedOrders);
  }, []); // Empty dependency array ensures useEffect runs only once

  return (
    <div>
      <h2>My Orders</h2>
      <ul>
        {orders.map(order => (
          <li key={order.id}>
            {/* Display order details */}
            Order ID: {order.id}, Product: {order.product}, Quantity: {order.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyOrders;

import React from 'react';
import Navbar from './common-comp/navbar';
import Footer from './common-comp/footer';
import AppRoutes from './Routes';
import { BrowserRouter } from "react-router-dom";
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
    <div>
      <Navbar />
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
      <Footer/>
    </div>
    </CartProvider>
  );
}

export default App;

import React from 'react';
import Navbar from './common-comp/navbar';
import Footer from './common-comp/footer';
import AppRoutes from './Routes';
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <div>
      <Navbar />
      <BrowserRouter>
        {/* Ensure that AppRoutes is rendered only once */}
        <AppRoutes />
      </BrowserRouter>
      <Footer/>
    </div>
  );
}

export default App;

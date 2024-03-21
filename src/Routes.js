import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './home/home';
import Products from './product-page/products';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route exact path="/" component={Home} />
                <Route path="/products" component={Products} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;

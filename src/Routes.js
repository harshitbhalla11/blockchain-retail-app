import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Products from './product-page/products';
import Home from './home/home';

const AppRoutes = () => {
    return (
        // <BrowserRouter>
            <Routes>
                {console.log("routes routed")}
                <Route exact path="/" Component={Home} />
                <Route path="/products" Component={Products} />
            </Routes>
        // </BrowserRouter>
    );
};

export default AppRoutes;

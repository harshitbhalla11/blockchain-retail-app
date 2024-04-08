import React from 'react';
import {  Routes, Route } from "react-router-dom";
import Products from './product-page/products';
import Home from './home/home';
import Cart from './cart/cart';
import Donate from './donate/donate';
import Orders from './orders/orders';
import WithdrawTokens from './withdraw/withdraw';
const AppRoutes = () => {
    return (
            <Routes>
                <Route exact path="/" Component={Home} />
                <Route path="/products" Component={Products} />
                <Route path="/cart" Component={Cart} />
                <Route path="/donate" Component={Donate} />
                <Route path="/orders" Component={Orders} />
                <Route path="/withdraw" Component={WithdrawTokens} />
            </Routes>
    );
};

export default AppRoutes;

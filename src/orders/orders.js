import React, { useState, useEffect } from 'react';
import { OrderContractAddress, orderABI } from '../myTokenABI';
import Web3 from 'web3';
import './orders.css'
import products from '../product-page/products.json';
const Order = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        async function initWeb3() {
            // Check if Web3 is injected by the browser
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                try {
                    // Request account access if needed
                    await window.ethereum.enable();
                    // Get the current account
                    const accounts = await web3Instance.eth.getAccounts();
                    console.log(accounts);
                    setAccount(accounts[0]);
                    // Instantiate the contract
                    const contractInstance = new web3Instance.eth.Contract(
                        orderABI,
                        OrderContractAddress
                    );
                    setContract(contractInstance);
                } catch (error) {
                    console.error('User denied account access');
                }
            } else {
                console.error('Web3 not detected');
            }
        }

        initWeb3();
    }, []);

    useEffect(() => {
        async function fetchOrders() {
            try {
                const ordersLength = await contract.methods.ordersLength().call({ from: account });
                const result = [];
                for (let i = 0; i < ordersLength; i++) {
                    const order = await contract.methods.getOrder(i).call({ from: account });
                    result.push(order);
                }
                setOrders(result);
                console.log('Orders:', result);
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        }

        if (contract && account) {
            fetchOrders();
        }
    }, [contract, account]);

    return (
        <div className='container order-cont'>
            <h2 className='text-center my-5 custom-font main-heading'>My Orders Details</h2>
            {orders.map((order, index) => (
                order[1] === account && (
                    <div className=" order-container" key={index}>
                        <h3 className='orderid-heading'>Order ID: {order[0].toString()}</h3>
                        <div className="mx-5 mt-5 order-row">
                            <div className=""> 
                            <span className='prodquant'>Products and Quantities</span>
                                    {order[2].map((id, i) => {
                                        const product = products.find(product => product.id === parseInt(id.toString()));
                                        if (product) {
                                            return (
                                                <div className='each-product' key={i}>
                                                    <img src={product.images[1]} alt='' className='order-products' /><span className='product-title custom-font'> {product.title}</span> <div>Quantity: {order[3][i].toString()}</div>
                                                </div>
                                            );
                                        }
                                    })}
                                

                            </div>
                            <div className='row mt-3'>
                                <div className="col-9 my-2">
                                    Order Time: {new Date(Number(order[4])).toLocaleString()}
                                </div>
                                <div className='col-3'>
                                    <a className='btn btn-primary' href='https://sepolia.etherscan.io/address/0xf5aff31158cb9a92a57e439917878f77350d1e0a' target='blank'>Show Details</a>
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ))}
        </div>
    );

}

export default Order;

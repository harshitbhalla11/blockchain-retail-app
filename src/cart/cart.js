import React, { useEffect, useState } from 'react';
import productsData from '../product-page/products.json';
import './cart.css';
import { OrderContractAddress, orderABI } from '../myTokenABI';
import Web3 from 'web3';


const Cart = () => {
    const [web3, setWeb3] = useState(null);
    const [contract, setContract] = useState(null);
    const [account, setAccount] = useState(null);
    const [totalPrice, setTotalPrice] = useState(0);
    const [ethPrice, setEthPrice] = useState(null); 

    const [cartItems, setCartItems] = useState([]);


    useEffect(() => {
      const storedProductIds = JSON.parse(localStorage.getItem('cartItems')) || [];
      const filteredProducts = productsData.filter(product => storedProductIds.includes(product.id));
      setCartItems(filteredProducts);
  }, []);

  useEffect(() => {
    const calculateTotalPrice = () => {
      let temp = cartItems.reduce((acc, item) => acc + item.price * item.qty, 0);
      setTotalPrice(temp);
      console.log(cartItems)
  };
  
    calculateTotalPrice();
}, [cartItems]);

    useEffect(() => {
        const storedProductIds = JSON.parse(localStorage.getItem('cartItems')) || [];
        const filteredProducts = productsData.filter(product => storedProductIds.includes(product.id));
        setCartItems(filteredProducts);

        async function initWeb3() {
            if (window.ethereum) {
                const web3Instance = new Web3(window.ethereum);
                setWeb3(web3Instance);
                try {
                    await window.ethereum.enable();
                    const accounts = await web3Instance.eth.getAccounts();
                    console.log(accounts)
                    setAccount(accounts[0]);
                    const contractInstance = new web3Instance.eth.Contract(
                        orderABI,
                        OrderContractAddress
                    );
                    setContract(contractInstance);
                } catch (error) {
                    console.error('User denied account access');
                }
            } else {
                console.error('No wallet detected. Please install MetaMask.');            }
        }

        async function fetchEthPrice() {
            const price = localStorage.getItem('ethusd');
            setEthPrice(price);
        }

        initWeb3();
        fetchEthPrice();
    }, []);

    const decrementQuantity = (productId) => {
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

    const removeItem = (id) => {
        const updatedCart = cartItems.filter(item => item.id !== id);
        setCartItems(updatedCart);
        let temp = JSON.parse(localStorage.getItem('cartItems'));
        localStorage.setItem('cartItems', JSON.stringify(temp.filter(item => item !== id)));
    }

    const handleOrder = async () => {
        const orderId = generateOrderId();
        const productIds = cartItems.map(item => item.id);
        const quantities = cartItems.map(item => item.qty);
        try {
            const transaction = await contract.methods.placeOrder(orderId, productIds, quantities).send({
                from: account,
                value: web3.utils.toWei((totalPrice / ethPrice).toFixed(6) , 'ether') 
            });
            console.log('Order placed:', transaction);
            const temp=localStorage.getItem('tokenBalance');
            localStorage.setItem((parseInt(temp)+1).toString());
            window.location.href = '/orders';
        } catch (error) {
            console.error('Error placing order:', error);
        }
    };
     const generateOrderId=()=> {
        const min = 100000; 
        const max = 999999; 
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-6 image-container'>
                    <h2 className='d-flex allign-items-center custom-font-cart'>Shopping Cart</h2>
                </div>
                <div className='col-6 d-flex justify-content-end'>
                    <img className='gif' src='images/cart-gif.gif' alt='' />
                </div>
            </div>
            <div className='d-flex justify-content-between'>
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
                                <p>Price: ETH {(product.price / ethPrice).toFixed(6)} (${product.price}) </p>
                                <div className='buttons'>
                                    <div className="quantity-controls">
                                        <button className='quantity-button' onClick={() => decrementQuantity(product.id)}>-</button>
                                        <span className='quantity'>{product.qty}</span>
                                        <button className='quantity-button' onClick={() => incrementQuantity(product.id)}>+</button>
                                    </div>
                                    <button className="remove-button" onClick={() => removeItem(product.id)}>Remove</button>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
            <p>Total Price: ETH {(totalPrice / ethPrice).toFixed(6)}  (${totalPrice})</p>
            <button className="btn btn-success " onClick={handleOrder}>Proceed to Buy</button>
        </div>
    );
}

export default Cart;


import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import './home.css';

const Home = () => {
  return (
    <div className="home-container">
      <div className="banner">
        <Carousel>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="images/1.webp"
              alt="First slide"
            />
          
          </Carousel.Item>
          <Carousel.Item>
          <img
              className="d-block w-100"
              src="images/2.webp"
              alt="First slide"
            />
         
          </Carousel.Item>
          <Carousel.Item>
          <img
              className="d-block w-100"
              src="images/3.webp"
              alt="First slide"
            />
         
          </Carousel.Item>
        </Carousel>
        <h1 className='welcome'>Welcome to<span className='mx-2'>
          <img class="logo-img-heading" src="/images/logo.png" alt=""/>  
          </span> Meta Store</h1>
        <p className='subHeading'>Discover amazing products at great prices!</p>
      </div>
      <div className="featured-products p-4">
        <img src='/images/home.png'></img>
      </div>
    </div>
  );
};

export default Home;


import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

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
        <h1>Welcome to Our E-Commerce Store</h1>
        <p>Discover amazing products at great prices!</p>
      </div>
      <div className="featured-products">
      </div>
    </div>
  );
};

export default Home;

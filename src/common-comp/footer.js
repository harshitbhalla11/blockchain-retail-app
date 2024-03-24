import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="footer">
        <div className='footer-row'>
      <div className="footer-column">
        <h3>OFFLINE STORE</h3>
        <p>Find Stores Near Me</p>
      </div>
      <div className="footer-column">
        <h3>GET TO KNOW US</h3>
        <ul>
          <li>Contact Us</li>
          <li>FAQ's</li>
          <li>Blogs</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>TRACK OR RETURN/EXCHANGE ORDER</h3>
        <ul>
          <li>Track Order</li>
          <li>Place Return Request</li>
          <li>Return/ Exchange Policy</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>CUSTOMER CARE</h3>
        <p>Timings: 10 AM - 7 PM (Mon - Sat)</p>
        <p>Whatsapp: +91 6366966283</p>
        <p>Instagram: @smeta.ie</p>
      </div>
      </div>
      <div className="footer-column mt-4 mb-4">
         <h3>SIGN UP AND SAVE</h3>
        <p>Sign up now and be the first to know about exclusive offers, latest fashion trends & style tips!</p>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
      {/* <div className="footer-social mt-4">
        <a href="https://www.instagram.com/snitch.co.in/">Instagram</a>
        <a href="https://www.facebook.com/">Facebook</a>
        <a href="https://www.youtube.com/">YouTube</a>
        <a href="https://twitter.com/">Twitter</a>
        <a href="https://www.pinterest.com/">Pinterest</a>
        <a href="https://www.linkedin.com/">LinkedIn</a>
      </div> */}
      <div className="footer-copyright">
        <p>&copy; 2024 META</p>
        <p>Made in Ireland, for the World 🌍</p>
      </div>
    </footer>
    );
}

export default Footer;

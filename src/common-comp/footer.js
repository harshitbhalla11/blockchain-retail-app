import './footer.css';
import 'bootstrap/dist/css/bootstrap.min.css';

function Footer() {
    return (
        <footer className="footer">
        <div className='footer-row'>
     
      <div className="footer-column">
        <h3>GET TO KNOW US</h3>
        <ul>
          <li>Contact Us</li>
          <li>Terms & Conditions</li>
        </ul>
      </div>
      <div className="footer-column">
        <h3>TRACK OR RETURN/EXCHANGE ORDER</h3>
        <ul>
          <li>Track Order</li>
        
        </ul>
      </div>
      <div className="footer-column">
        <h3>CUSTOMER CARE</h3>
        <p>Timings: 10 AM - 7 PM (Mon - Sat)</p>
        <p>Whatsapp: +91 6366966283</p>
      </div>
      </div>
      <div className="footer-column mt-4 mb-4">
         <h3>SIGN UP AND SAVE</h3>
        <form className="subscribe-form">
          <input type="email" placeholder="Enter your email" />
          <button type="submit">SUBSCRIBE</button>
        </form>
      </div>
    
      <div className="footer-copyright">
        <p>&copy; 2024 META</p>
        <p>Made in Ireland, for the World 🌍</p>
      </div>
    </footer>
    );
}

export default Footer;

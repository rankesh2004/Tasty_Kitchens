import {
  FaPinterestSquare,
  FaInstagramSquare,
  FaFacebookSquare,
  FaTwitter,
} from 'react-icons/fa'
import './index.css'

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-text">
      <img
        src="https://res-console.cloudinary.com/dnncpaqsn/media_explorer_thumbnails/9106c536d7ab039f394806a8f996e31f/detailed"
        alt="footer-logo"
        className="footer-logo"
      />
      <h1 className="footer-text">Tasty Kitchens</h1>
    </div>
    <p className="footer-para">
      The only thing we are serious about is food. Contact us on
    </p>
    <div>
      <FaPinterestSquare className="contact-us" />
      <FaInstagramSquare className="contact-us" />
      <FaTwitter className="contact-us" />
      <FaFacebookSquare className="contact-us" />
    </div>
  </div>
)

export default Footer
